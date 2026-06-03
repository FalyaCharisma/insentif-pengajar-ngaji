import Swal from "sweetalert2";

export const successAlert = (
    message: string
) => {

    Swal.fire({
        icon: "success",

        title: "Berhasil",

        text: message,

        timer: 2000,

        showConfirmButton: false,
    });
};

export const deleteConfirm = async (
    message: string
) => {

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
    text: string
) => {
    return Swal.fire({
        title: "Konfirmasi",
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
    });
};