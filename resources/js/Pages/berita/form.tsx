import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Undo2,
    Redo2,
    Image as ImageIcon,
    X,
} from "lucide-react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import type { Berita } from "@/types/berita";

type Props = {
    berita?: Berita;
};

export default function Form({ berita }: Props) {
    const isEdit = !!berita;

    const [imagePreview, setImagePreview] = useState<string | null>(
        berita?.gambar ? `/storage/${berita.gambar}` : null,
    );

    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        judul: berita?.judul ?? "",
        kategori: berita?.kategori ?? "Informasi",
        excerpt: berita?.excerpt ?? "",
        isi: berita?.isi ?? "",
        gambar: null as File | null,
        published_at: berita?.published_at
            ? berita.published_at.substring(0, 16)
            : "",
        is_published: berita?.is_published ?? false,
        _method: isEdit ? "put" : "",
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({
                placeholder: "Tulis isi berita di sini...",
            }),
        ],
        content: data.isi,
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none min-h-[400px] px-5 py-4 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            setData("isi", editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        if (editor.getHTML() !== data.isi) {
            editor.commands.setContent(data.isi || "");
        }
    }, [berita?.id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setData("gambar", file);

        const url = URL.createObjectURL(file);
        setImagePreview(url);
    };

    const removeImage = () => {
        setData("gambar", null);
        setImagePreview(null);

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const addLink = () => {
        if (!editor) return;

        const previousUrl = editor.getAttributes("link").href;

        const url = window.prompt("Masukkan URL:", previousUrl || "https://");

        if (url === null) return;

        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    const addImageFromUrl = () => {
        if (!editor) return;

        const url = window.prompt("Masukkan URL gambar:");

        if (!url) return;

        editor.chain().focus().setImage({ src: url }).run();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            post(route("berita.update", berita!.id), {
                forceFormData: true,
            });
        } else {
            post(route("berita.store"), {
                forceFormData: true,
            });
        }
    };

    return (
        <>
            <Head title={isEdit ? "Edit Berita" : "Tambah Berita"} />

            <AdminLayout>
                <div className="w-full space-y-5">
                    <PageHeader
                        title={isEdit ? "Edit Berita" : "Tambah Berita"}
                        subtitle={
                            isEdit
                                ? "Perbarui informasi berita"
                                : "Buat berita atau informasi baru"
                        }
                    />

                    <form onSubmit={submit} className="space-y-6">
                        {/* INFORMASI UTAMA */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Informasi Berita
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Masukkan informasi dasar berita.
                                </p>
                            </div>

                            <div className="space-y-5">
                                {/* JUDUL */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Judul Berita
                                    </label>

                                    <input
                                        type="text"
                                        value={data.judul}
                                        onChange={(e) =>
                                            setData("judul", e.target.value)
                                        }
                                        placeholder="Masukkan judul berita"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    />

                                    {errors.judul && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.judul}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {/* KATEGORI */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Kategori
                                        </label>

                                        <select
                                            value={data.kategori}
                                            onChange={(e) =>
                                                setData(
                                                    "kategori",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        >
                                            <option value="Informasi">
                                                Informasi
                                            </option>

                                            <option value="Pengumuman">
                                                Pengumuman
                                            </option>

                                            <option value="Berita">
                                                Berita
                                            </option>
                                        </select>

                                        {errors.kategori && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.kategori}
                                            </p>
                                        )}
                                    </div>

                                    {/* TANGGAL */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Tanggal Publikasi
                                        </label>

                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) =>
                                                setData(
                                                    "published_at",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />

                                        {errors.published_at && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.published_at}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* EXCERPT */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Ringkasan Berita
                                    </label>

                                    <textarea
                                        value={data.excerpt}
                                        onChange={(e) =>
                                            setData("excerpt", e.target.value)
                                        }
                                        rows={3}
                                        placeholder="Masukkan ringkasan singkat berita..."
                                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    />

                                    <p className="mt-1 text-xs text-slate-400">
                                        Ringkasan akan ditampilkan pada daftar
                                        berita.
                                    </p>

                                    {errors.excerpt && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* GAMBAR */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Gambar Utama
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Gambar yang ditampilkan sebagai thumbnail
                                    berita.
                                </p>
                            </div>

                            {imagePreview ? (
                                <div className="relative overflow-hidden rounded-xl border border-slate-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-[350px] w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        imageInputRef.current?.click()
                                    }
                                    className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-6 py-12 text-center transition hover:border-sky-300 hover:bg-sky-50/50"
                                >
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>

                                    <p className="text-sm font-medium text-slate-700">
                                        Klik untuk memilih gambar
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        JPG, JPEG, PNG, WEBP • Maksimal 2 MB
                                    </p>
                                </button>
                            )}

                            <input
                                ref={imageInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {errors.gambar && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors.gambar}
                                </p>
                            )}
                        </div>

                        {/* EDITOR */}

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 p-6 pb-4">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Isi Berita
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Tulis isi berita menggunakan editor.
                                </p>
                            </div>

                            {editor && (
                                <div className="border-b border-slate-200 bg-slate-50 p-2">
                                    <div className="flex flex-wrap items-center gap-1">
                                        <ToolbarButton
                                            active={editor.isActive("bold")}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleBold()
                                                    .run()
                                            }
                                        >
                                            <Bold className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive("italic")}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleItalic()
                                                    .run()
                                            }
                                        >
                                            <Italic className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive(
                                                "underline",
                                            )}
                                            onClick={() => {}}
                                        >
                                            <Underline className="h-4 w-4" />
                                        </ToolbarButton>

                                        <div className="mx-1 h-6 w-px bg-slate-200" />

                                        <ToolbarButton
                                            active={editor.isActive("heading", {
                                                level: 1,
                                            })}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleHeading({
                                                        level: 1,
                                                    })
                                                    .run()
                                            }
                                        >
                                            <Heading1 className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive("heading", {
                                                level: 2,
                                            })}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleHeading({
                                                        level: 2,
                                                    })
                                                    .run()
                                            }
                                        >
                                            <Heading2 className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive("heading", {
                                                level: 3,
                                            })}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleHeading({
                                                        level: 3,
                                                    })
                                                    .run()
                                            }
                                        >
                                            <Heading3 className="h-4 w-4" />
                                        </ToolbarButton>

                                        <div className="mx-1 h-6 w-px bg-slate-200" />

                                        <ToolbarButton
                                            active={editor.isActive(
                                                "bulletList",
                                            )}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleBulletList()
                                                    .run()
                                            }
                                        >
                                            <List className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive(
                                                "orderedList",
                                            )}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleOrderedList()
                                                    .run()
                                            }
                                        >
                                            <ListOrdered className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={editor.isActive(
                                                "blockquote",
                                            )}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .toggleBlockquote()
                                                    .run()
                                            }
                                        >
                                            <Quote className="h-4 w-4" />
                                        </ToolbarButton>

                                        <div className="mx-1 h-6 w-px bg-slate-200" />

                                        <ToolbarButton
                                            active={editor.isActive("link")}
                                            onClick={addLink}
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={false}
                                            onClick={addImageFromUrl}
                                        >
                                            <ImageIcon className="h-4 w-4" />
                                        </ToolbarButton>

                                        <div className="mx-1 h-6 w-px bg-slate-200" />

                                        <ToolbarButton
                                            active={false}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .undo()
                                                    .run()
                                            }
                                        >
                                            <Undo2 className="h-4 w-4" />
                                        </ToolbarButton>

                                        <ToolbarButton
                                            active={false}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .redo()
                                                    .run()
                                            }
                                        >
                                            <Redo2 className="h-4 w-4" />
                                        </ToolbarButton>
                                    </div>
                                </div>
                            )}

                            <EditorContent editor={editor} />

                            {errors.isi && (
                                <div className="px-5 pb-4">
                                    <p className="text-xs text-red-500">
                                        {errors.isi}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* PUBLIKASI */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        Publikasi
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tentukan apakah berita dapat dilihat
                                        oleh pengguna.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setData(
                                            "is_published",
                                            !data.is_published,
                                        )
                                    }
                                    className={`relative h-7 w-12 rounded-full transition ${
                                        data.is_published
                                            ? "bg-emerald-500"
                                            : "bg-slate-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                                            data.is_published
                                                ? "left-6"
                                                : "left-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-700">
                                    {data.is_published
                                        ? "Berita dipublikasikan"
                                        : "Berita sebagai draft"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {data.is_published
                                        ? "Berita akan ditampilkan pada dashboard lembaga."
                                        : "Berita hanya dapat dilihat dari halaman admin."}
                                </p>
                            </div>
                        </div>

                        {/* ACTION */}

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <Link href={route("berita.index")}>
                                <SecondaryButton type="button">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton type="submit" disabled={processing}>
                                {processing
                                    ? "Menyimpan..."
                                    : isEdit
                                      ? "Update Berita"
                                      : "Simpan Berita"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}

function ToolbarButton({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                active
                    ? "bg-sky-100 text-sky-600"
                    : "text-slate-500 hover:bg-white hover:text-slate-700"
            }`}
        >
            {children}
        </button>
    );
}
