import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    item: any;
};

export default function PreviewModal({
    open,
    onClose,
    item,
}: Props) {

    if (!open || !item) return null;

    const file = item;

    const extension =
        file.path.split(".").pop()?.toLowerCase();

    const isImage = [
        "jpg",
        "jpeg",
        "png",
        "webp",
    ].includes(extension ?? "");

    const isPdf = extension === "pdf";

    return (
        <Modal
            show={open}
            onClose={onClose}
            maxWidth="2xl"
        >
            <div className="space-y-5 p-6">

                <div>

                    <h2 className="text-xl font-semibold text-slate-800">
                        Preview Dokumen
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {item.jenis_dokumen?.nama}
                    </p>

                </div>

                <div className="overflow-hidden rounded-xl border bg-slate-50">

                    {isPdf && (
                        <iframe
                            src={file.url}
                            className="h-[700px] w-full"
                            title="Preview PDF"
                        />
                    )}

                    {isImage && (
                        <img
                            src={file.url}
                            alt={item.nama_file}
                            className="mx-auto max-h-[700px]"
                        />
                    )}

                    {!isPdf && !isImage && (
                        <div className="flex h-64 items-center justify-center">

                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
                            >
                                Download Dokumen
                            </a>

                        </div>
                    )}

                </div>

                <div className="flex justify-end">

                    <SecondaryButton
                        onClick={onClose}
                    >
                        Tutup
                    </SecondaryButton>

                </div>

            </div>
        </Modal>
    );
}