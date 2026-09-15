<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class AlamatController extends Controller
{
    private function requestApi(
        string $endpoint,
        array $query = []
    ): JsonResponse {
        try {
            $baseUrl = rtrim(
                config('services.alamat_api.url'),
                '/'
            );

            $response = Http::timeout(15)
                ->acceptJson()
                ->get($baseUrl . $endpoint, $query);

            if ($response->failed()) {
                return response()->json([
                    'message' => 'API alamat gagal diakses.',
                    'status' => $response->status(),
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data alamat.',
            ], 500);
        }
    }

    public function provinsi(Request $request): JsonResponse
    {
        return $this->requestApi('/provinsi', [
            'q' => $request->input('q', ''),
        ]);
    }

    public function kabko(Request $request): JsonResponse
    {
        return $this->requestApi('/kabko', [
            'kode_provinsi' => $request->input('kode_provinsi'),
            'q' => $request->input('q', ''),
        ]);
    }

    public function kecamatan(Request $request): JsonResponse
    {
        return $this->requestApi('/kecamatan', [
            'kode_kabkota' => $request->input('kode_kabkota'),
            'q' => $request->input('q', ''),
        ]);
    }

    public function kelurahan(Request $request): JsonResponse
    {
        return $this->requestApi('/kelurahan', [
            'kode_kecamatan' => $request->input('kode_kecamatan'),
            'q' => $request->input('q', ''),
        ]);
    }
}