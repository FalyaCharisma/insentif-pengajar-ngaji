import axios from "axios";

export function useAlamat() {

    // ================= PROVINSI =================
    const searchProvinsi = async (
        inputValue: string,
    ) => {

        const res = await axios.get(
            `http://103.78.106.192/api/provinsi?q=${inputValue}`
        );

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    };

    // ================= KABKOTA =================
    const searchKabkota = async (
        kodeProvinsi: string,
        inputValue: string,
    ) => {

        if (!kodeProvinsi) return [];

        const res = await axios.get(
            `http://103.78.106.192/api/kabko?kode_provinsi=${kodeProvinsi}&q=${inputValue}`
        );

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    };

    // ================= KECAMATAN =================
    const searchKecamatan = async (
        kodeKabkota: string,
        inputValue: string,
    ) => {

        if (!kodeKabkota) return [];

        const res = await axios.get(
            `http://103.78.106.192/api/kecamatan?kode_kabkota=${kodeKabkota}&q=${inputValue}`
        );

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    };

    // ================= KELURAHAN =================
    const searchKelurahan = async (
        kodeKecamatan: string,
        inputValue: string,
    ) => {

        if (!kodeKecamatan) return [];

        const res = await axios.get(
            `http://103.78.106.192/api/kelurahan?kode_kecamatan=${kodeKecamatan}&q=${inputValue}`
        );

        console.log("kodeKecamatan:", kodeKecamatan);
        console.log("response:", res.data);

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    };

    // ================= KELURAHAN =================
    const searchAllKabkota = async (
        inputValue: string,
    ) => {

        const res = await axios.get(
            `http://103.78.106.192/api/kabko?q=${inputValue}`
        );

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    }; 

    const searchKecamatanKotaKediri = async (
        inputValue: string,
    ) => {

        const res = await axios.get(
            `http://103.78.106.192/api/kecamatan?kode_kabkota=35.71&q=${inputValue}`
        );

        return res.data.map((item: any) => ({
            label: item.text,
            value: item.id,
        }));
    };

    return {
        searchProvinsi,
        searchKabkota,
        searchKecamatan,
        searchKelurahan,
        searchAllKabkota,
        searchKecamatanKotaKediri
    };
}