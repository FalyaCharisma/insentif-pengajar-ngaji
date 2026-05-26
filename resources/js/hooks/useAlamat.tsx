import { useEffect, useState } from "react";
import axios from "axios";

export function useAlamat() {
    const [provinsi, setProvinsi] = useState([]);
    const [kabkota, setKabkota] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);

    const [kodeProvinsi, setKodeProvinsi] = useState("");
    const [kodeKabkota, setKodeKabkota] = useState("");
    const [kodeKecamatan, setKodeKecamatan] = useState("");

    // PROVINSI
    useEffect(() => {
        axios.get("http://103.78.106.192/api/provinsi")
            .then(res => setProvinsi(res.data));
    }, []);

    // KABKOTA
    useEffect(() => {
        if (!kodeProvinsi) return;

        axios.get(`http://103.78.106.192/api/kabko?kode_provinsi=${kodeProvinsi}`)
            .then(res => setKabkota(res.data));

        setKabkota([]);
        setKecamatan([]);
        setKelurahan([]);
    }, [kodeProvinsi]);

    // KECAMATAN
    useEffect(() => {
        if (!kodeKabkota) return;

        axios.get(`http://103.78.106.192/api/kecamatan?kode_kabkota=${kodeKabkota}`)
            .then(res => setKecamatan(res.data));

        setKecamatan([]);
        setKelurahan([]);
    }, [kodeKabkota]);

    // KELURAHAN
    useEffect(() => {
        if (!kodeKecamatan) return;

        axios.get(`http://103.78.106.192/api/kelurahan?kode_kecamatan=${kodeKecamatan}`)
            .then(res => setKelurahan(res.data));

        setKelurahan([]);
    }, [kodeKecamatan]);

    return {
        provinsi,
        kabkota,
        kecamatan,
        kelurahan,

        setKodeProvinsi,
        setKodeKabkota,
        setKodeKecamatan,
    };
}