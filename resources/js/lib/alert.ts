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