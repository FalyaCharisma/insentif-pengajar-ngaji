export const validateNik = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 16);
    return numeric;
};

export const validatePhone = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 13);
    return numeric;
};

export const validateYear = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 4);
    return numeric;
};