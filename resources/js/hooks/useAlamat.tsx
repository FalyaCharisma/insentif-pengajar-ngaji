import axios from "axios";

export function useAlamat() {
    const toTitleCase = (text: string) =>
        text
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const searchProvinsi = async (inputValue: string) => {
        const res = await axios.get("/api/alamat/provinsi", {
            params: {
                q: inputValue,
            },
        });

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    const searchKabkota = async (
        kodeProvinsi: string,
        inputValue: string,
    ) => {
        if (!kodeProvinsi) return [];

        const res = await axios.get("/api/alamat/kabko", {
            params: {
                kode_provinsi: kodeProvinsi,
                q: inputValue,
            },
        });

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    const searchKecamatan = async (
        kodeKabkota: string,
        inputValue: string,
    ) => {
        if (!kodeKabkota) return [];

        const res = await axios.get("/api/alamat/kecamatan", {
            params: {
                kode_kabkota: kodeKabkota,
                q: inputValue,
            },
        });

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    const searchKelurahan = async (
        kodeKecamatan: string,
        inputValue: string,
    ) => {
        if (!kodeKecamatan) return [];

        const res = await axios.get("/api/alamat/kelurahan", {
            params: {
                kode_kecamatan: kodeKecamatan,
                q: inputValue,
            },
        });

        console.log("kodeKecamatan:", kodeKecamatan);
        console.log("response:", res.data);

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    const searchAllKabkota = async (inputValue: string) => {
        const res = await axios.get("/api/alamat/kabko", {
            params: {
                q: inputValue,
            },
        });

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    const searchKecamatanKotaKediri = async (
        inputValue: string,
    ) => {
        const res = await axios.get("/api/alamat/kecamatan", {
            params: {
                kode_kabkota: "35.71",
                q: inputValue,
            },
        });

        return res.data.map((item: any) => ({
            label: toTitleCase(item.text),
            value: item.id,
        }));
    };

    return {
        searchProvinsi,
        searchKabkota,
        searchKecamatan,
        searchKelurahan,
        searchAllKabkota,
        searchKecamatanKotaKediri,
    };
}