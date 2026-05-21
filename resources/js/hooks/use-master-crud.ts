import { router, useForm } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { MySwalTheme } from "@/layouts/app-layout";

interface UseMasterCrudOptions<TForm, TModel> {
    controller: any;
    initialFormData: TForm;
    prepareSubmitData?: (data: TForm) => TForm;
    mapItemToFormData?: (item: TModel) => TForm;
    successMessage: {
        create: string;
        update: string;
        delete: string;
    };
    reloadKeys?: string[];
    getItemName?: (item: TModel) => string;
}

export function useMasterCrud<TForm extends Record<string, any>, TModel extends { id: number }>({
    controller,
    initialFormData,
    prepareSubmitData,
    mapItemToFormData,
    successMessage,
    reloadKeys = ['resource'],
    getItemName,
}: UseMasterCrudOptions<TForm, TModel>) {
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<TModel | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm<TForm>(initialFormData);

    const handleCreateOpen = useCallback(() => {
        setSelected(null);
        setData(initialFormData);
        setShowModal(true);
    }, [initialFormData, setData]);

    const handleEditOpen = useCallback((item: TModel) => {
        setSelected(item);
        if (mapItemToFormData) {
            setData(mapItemToFormData(item));
        } else {
            setData(item as any);
        }
        setShowModal(true);
    }, [setData, mapItemToFormData]);

    const handleSubmit = useCallback(() => {
        const submitData = prepareSubmitData ? prepareSubmitData(data) : data;
        setData(submitData);

        if (selected) {
            put(controller.update.url(selected.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    router.reload({ only: reloadKeys });
                },
            });
        } else {
            post(controller.store.url(), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    router.reload({ only: reloadKeys });
                },
            });
        }
    }, [selected, data, setData, put, post, reset, controller, successMessage, reloadKeys, prepareSubmitData]);

    const handleDelete = useCallback((item: TModel) => {
        const itemName = getItemName ? getItemName(item) : (item as any).nama_uraian || (item as any).nama_kegiatan || (item as any).nama_ruang_lingkup || 'item';
        
        MySwalTheme.fire({
            title: "Are you sure?",
            html: `Data <b>"${itemName}"</b> akan dihapus secara permanen.<br/><small class="text-danger">Tindakan ini tidak dapat dibatalkan.</small>`,
            icon: "question",
            confirmButtonText: "Delete",
            showCancelButton: true,
        }).then((val) => {
            if (val.isConfirmed) {
                return router.delete(controller.destroy.url(item.id), {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        router.reload({ only: reloadKeys });
                    },
                });
            }
        });
    }, [controller, successMessage, reloadKeys, getItemName]);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
        reset();
    }, [reset]);

    return {
        showModal,
        selected,
        data,
        setData,
        errors,
        processing,
        handleCreateOpen,
        handleEditOpen,
        handleSubmit,
        handleDelete,
        handleModalClose,
        reset,
    };
}

