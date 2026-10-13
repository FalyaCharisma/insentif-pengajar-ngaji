<?php

namespace Tests\Feature;

use App\Exports\ForumAccountsExport;
use App\Exports\LembagaAccountsExport;
use App\Models\Forum;
use App\Models\KategoriLembaga;
use App\Models\Lembaga;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;

class LembagaImportTest extends TestCase
{
    use RefreshDatabase;

    public function test_csv_import_creates_lembaga_and_generated_account(): void
    {
        $this->seed(RoleSeeder::class);
        $admin = User::factory()->create();
        $admin->assignRole('superadmin');
        $forum = $this->createForum();
        $file = UploadedFile::fake()->createWithContent(
            'lembaga.csv',
            "nama forum,nama lembaga\n{$forum->nama},TPQ Al Ikhlas\n",
        );

        $response = $this->actingAs($admin)->post(route('lembaga.import'), [
            'file' => $file,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('lembaga', [
            'nama' => 'TPQ Al Ikhlas',
            'forum_id' => $forum->id,
            'kategori_id' => $forum->kategori_id,
        ]);

        $lembaga = Lembaga::where('nama', 'TPQ Al Ikhlas')->firstOrFail();
        $this->assertSame(strtolower($lembaga->kode).'@mail.com', $lembaga->user->email);
        $this->assertTrue($lembaga->user->hasRole('lembaga'));
        $this->assertDatabaseHas('profil_lembaga', [
            'lembaga_id' => $lembaga->id,
            'status_verifikasi' => 'pending',
        ]);
    }

    public function test_csv_import_rejects_unknown_forum_without_partial_records(): void
    {
        $this->seed(RoleSeeder::class);
        $admin = User::factory()->create();
        $admin->assignRole('superadmin');
        $file = UploadedFile::fake()->createWithContent(
            'lembaga.csv',
            "nama forum,nama lembaga\nForum Tidak Ada,TPQ Al Ikhlas\n",
        );

        $response = $this->actingAs($admin)->from('/lembaga')->post(route('lembaga.import'), [
            'file' => $file,
        ]);

        $response->assertRedirect('/lembaga');
        $response->assertSessionHasErrors('file');
        $this->assertSame(0, Lembaga::count());
    }

    public function test_admin_can_download_import_template(): void
    {
        $this->seed(RoleSeeder::class);
        $admin = User::factory()->create();
        $admin->assignRole('superadmin');

        $response = $this->actingAs($admin)->get(route('lembaga.import-template'));

        $response->assertDownload('template_import_lembaga.xlsx');
    }

    public function test_forum_export_includes_login_and_initial_password(): void
    {
        $this->seed(RoleSeeder::class);
        $admin = User::factory()->create();
        $admin->assignRole('superadmin');
        $forum = $this->createForum();
        Excel::fake();

        $this->actingAs($admin)->get(route('forum.export'));

        Excel::assertDownloaded('akun_forum.xlsx', function (ForumAccountsExport $export) use ($forum): bool {
            return $export->collection()->first() === [
                $forum->nama,
                $forum->user->email,
                $forum->kode.'@kdr',
            ];
        });
    }

    public function test_lembaga_export_is_limited_to_the_selected_forum(): void
    {
        $this->seed(RoleSeeder::class);
        $admin = User::factory()->create();
        $admin->assignRole('dindik');
        $selectedForum = $this->createForum();
        $otherForum = $this->createForum('FRM00002', 'Forum TPQ Kota');
        $selectedLembaga = $this->createLembaga($selectedForum, 'TPQ Al Ikhlas', 'LMB00001');
        $this->createLembaga($otherForum, 'TPQ Al Huda', 'LMB00002');
        Excel::fake();

        $this->actingAs($admin)->get(route('lembaga.export', [
            'forum_id' => $selectedForum->id,
        ]));

        Excel::assertDownloaded('akun_lembaga.xlsx', function (LembagaAccountsExport $export) use ($selectedForum, $selectedLembaga): bool {
            return $export->collection()->all() === [[
                $selectedForum->nama,
                $selectedLembaga->nama,
                $selectedLembaga->user->email,
                $selectedLembaga->kode.'@kdr',
            ]];
        });
    }

    private function createForum(string $code = 'FRM00001', string $name = 'Forum TPQ Kediri'): Forum
    {
        $category = KategoriLembaga::create(['nama' => 'TPQ']);
        $owner = User::factory()->create();

        return Forum::create([
            'user_id' => $owner->id,
            'kategori_id' => $category->id,
            'kode' => $code,
            'nama' => $name,
            'status' => 'aktif',
        ]);
    }

    private function createLembaga(Forum $forum, string $name, string $code): Lembaga
    {
        $user = User::factory()->create();

        return Lembaga::create([
            'user_id' => $user->id,
            'kategori_id' => $forum->kategori_id,
            'forum_id' => $forum->id,
            'kode' => $code,
            'nama' => $name,
        ]);
    }
}
