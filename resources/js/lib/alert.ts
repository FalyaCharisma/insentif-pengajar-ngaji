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
    confirmButtonText: string = "Ya",
    icon: "question" | "info" | "warning" = "question",
) => {
    return Swal.fire({
        title,

        text,

        icon,

        showCancelButton: true,

        confirmButtonColor: "#4f46e5",

        cancelButtonColor: "#64748b",

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