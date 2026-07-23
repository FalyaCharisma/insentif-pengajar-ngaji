import Swal from "sweetalert2";

export const successAlert = (message: string) => {
    Swal.fire({
        icon: "success",

        title: "Berhasil",

        text: message,

        timer: 2000,

        showConfirmButton: false,
    });
};

export const deleteConfirm = async (message: string) => {
    return await Swal.fire({
        title: "Hapus Data?",

        text: message,

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc2626",

        cancelButtonColor: "#64748b",

        confirmButtonText: "Ya, Hapus",

        cancelButtonText: "Batal",
    });
};

export const verifyConfirm = (
    title: string,
    text: string,
    confirmButtonText = "Ya",
    icon: "question" | "warning" | "info" = "question",
) => {
    return Swal.fire({
        title,

        text,

        icon,

        showCancelButton: true,

        confirmButtonText,

        cancelButtonText: "Batal",
    });
};

export const warningAlert = (message: string) => {
    return Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: message,
        confirmButtonText: "OK",
    });
};
export const inputConfirm = (
    title: string,
    label: string,
) => {
    return Swal.fire({
        title,
        input: "textarea",
        inputLabel: label,
        inputPlaceholder: "Masukkan catatan revisi...",
        inputAttributes: {
            maxlength: "500",
        },
        showCancelButton: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal",
        inputValidator: (value) => {
            if (!value) {
                return "Catatan revisi wajib diisi.";
            }
        },
    });
};

export const toggleStatusConfirm = async (
    status: "aktif" | "nonaktif",
    nama: string,
) => {
    const isAktif = status === "aktif";

    return await Swal.fire({
        title: isAktif
            ? "Nonaktifkan Pengajar?"
            : "Aktifkan Pengajar?",

        text: isAktif
            ? `Pengajar "${nama}" akan dinonaktifkan.`
            : `Pengajar "${nama}" akan diaktifkan kembali.`,

        icon: "question",

        showCancelButton: true,

        confirmButtonColor: isAktif ? "#f59e0b" : "#16a34a",

        cancelButtonColor: "#64748b",

        confirmButtonText: isAktif
            ? "Ya, Nonaktifkan"
            : "Ya, Aktifkan",

        cancelButtonText: "Batal",
    });
};

export const errorAlert = (message: string) => {
    return Swal.fire({
        icon: "error",

        title: "Gagal",

        text: message,

        confirmButtonText: "OK",

        confirmButtonColor: "#dc2626",
    });
};