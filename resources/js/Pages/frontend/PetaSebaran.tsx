import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import {
    Building2,
    ChevronDown,
    Mail,
    MapPin,
    MapPinIcon,
    Phone,
    Search,
    Users,
    X,
} from "lucide-react";
import Highcharts from "highcharts/highmaps";
import HighchartsReactImport from "highcharts-react-official";
import PortalLayout from "@/layouts/layout";
import SectionBadge from "@/Components/SectionBadge";

const HighchartsReact = ((HighchartsReactImport as any).default ??
    HighchartsReactImport) as React.ComponentType<any>;

const kediriMapGeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                "hc-key": "mojoroto",
                name: "Mojoroto",
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [112.0086074, -7.7801585],
                        [112.0150604, -7.7641403],
                        [112.0125518, -7.7618201],
                        [112.0126925, -7.7601926],
                        [112.0136824, -7.7568645],
                        [112.0085066, -7.7583904],
                        [112.0065468, -7.7599883],
                        [112.0006081, -7.7607968],
                        [111.9948233, -7.7623299],
                        [111.9909669, -7.7677511],
                        [111.9897917, -7.7740747],
                        [111.9861428, -7.7764556],
                        [111.9836585, -7.7723119],
                        [111.9769801, -7.7719146],
                        [111.9750259, -7.7743807],
                        [111.9699022, -7.7811606],
                        [111.968227, -7.7863139],
                        [111.965008, -7.7919176],
                        [111.953268, -7.7925617],
                        [111.9470795, -7.800816],
                        [111.9425712, -7.8042152],
                        [111.9423167, -7.8135692],
                        [111.9404976, -7.8200681],
                        [111.9427187, -7.8264621],
                        [111.9464597, -7.83069],
                        [111.9536807, -7.8319455],
                        [111.9600091, -7.8315346],
                        [111.9668703, -7.8306117],
                        [111.9730944, -7.832265],
                        [111.9732234, -7.8376673],
                        [111.9750628, -7.8432506],
                        [111.9872168, -7.8444882],
                        [111.9926587, -7.8398802],
                        [112.0061477, -7.8432296],
                        [112.0073591, -7.8416002],
                        [112.0078782, -7.8391991],
                        [112.0064921, -7.8339627],
                        [112.0072722, -7.8303665],
                        [112.0083974, -7.8270223],
                        [112.0083109, -7.8228206],
                        [112.0070125, -7.8175039],
                        [112.0070495, -7.8096641],
                        [112.0056316, -7.7991345],
                        [112.0035549, -7.7915924],
                        [112.0013922, -7.7883726],
                        [112.0016067, -7.7849943],
                        [112.0038094, -7.7821564],
                        [112.008429, -7.7799793],
                        [112.0085697, -7.7798408],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            properties: {
                "hc-key": "kota",
                name: "Kota",
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [112.0031363, -7.7886751],
                        [112.0118185, -7.7910374],
                        [112.0164193, -7.7920812],
                        [112.0167942, -7.7969169],
                        [112.0186169, -7.7997848],
                        [112.0261955, -7.8022577],
                        [112.0278743, -7.7978467],
                        [112.0332037, -7.7999847],
                        [112.0316731, -7.8042051],
                        [112.0388259, -7.8069263],
                        [112.0339884, -7.819158],
                        [112.0294504, -7.817376],
                        [112.0268875, -7.824371],
                        [112.0218206, -7.8228477],
                        [112.0219913, -7.8201402],
                        [112.0190875, -7.8192374],
                        [112.0188028, -7.8222272],
                        [112.0179487, -7.826063],
                        [112.0168814, -7.8309186],
                        [112.0157898, -7.8351669],
                        [112.0174107, -7.835907],
                        [112.0195242, -7.836764],
                        [112.0198118, -7.8399049],
                        [112.0229812, -7.840571],
                        [112.0303483, -7.8428011],
                        [112.0298613, -7.8459982],
                        [112.034397, -7.8477551],
                        [112.0309893, -7.8536729],
                        [112.0292148, -7.8533546],
                        [112.0287295, -7.8571917],
                        [112.0248575, -7.8568756],
                        [112.0219498, -7.8640702],
                        [112.0130717, -7.8613564],
                        [112.0122649, -7.8623179],
                        [112.0072599, -7.8608833],
                        [112.005645, -7.8661638],
                        [111.9912011, -7.8630895],
                        [111.9941789, -7.859375],
                        [111.995307, -7.8546545],
                        [111.9972558, -7.8516616],
                        [111.9999919, -7.850174],
                        [112.0062924, -7.844732],
                        [112.008311, -7.8424247],
                        [112.0087916, -7.8389008],
                        [112.0078302, -7.8337576],
                        [112.0089916, -7.8290103],
                        [112.0096131, -7.8248247],
                        [112.0098472, -7.8226464],
                        [112.0080195, -7.8173618],
                        [112.0080882, -7.8108991],
                        [112.0073221, -7.8041574],
                        [112.0063075, -7.7980461],
                        [112.0037082, -7.7888654],
                        [112.003385, -7.7887054],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            properties: {
                "hc-key": "pesantren",
                name: "Pesantren",
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [112.0172268, -7.862692],
                        [112.0150036, -7.868931],
                        [112.0215519, -7.8713738],
                        [112.0257502, -7.8712506],
                        [112.0316765, -7.8744276],
                        [112.0433849, -7.8781126],
                        [112.046344, -7.8772886],
                        [112.0512816, -7.8691897],
                        [112.0546129, -7.8688229],
                        [112.0560734, -7.8681216],
                        [112.0580261, -7.8679271],
                        [112.0612303, -7.8690248],
                        [112.0644331, -7.8704884],
                        [112.0662797, -7.8789154],
                        [112.0699693, -7.881106],
                        [112.0723107, -7.8781743],
                        [112.0712095, -7.8725613],
                        [112.0718301, -7.8643786],
                        [112.0712313, -7.8618009],
                        [112.069634, -7.8594563],
                        [112.0668843, -7.8583787],
                        [112.0680215, -7.8553401],
                        [112.0717201, -7.8486181],
                        [112.0743212, -7.8451946],
                        [112.074939, -7.8433609],
                        [112.0738295, -7.8411603],
                        [112.0764187, -7.8351716],
                        [112.0787626, -7.8360275],
                        [112.0793792, -7.8371277],
                        [112.0793796, -7.8407944],
                        [112.0841879, -7.8434838],
                        [112.0878886, -7.8352957],
                        [112.0881355, -7.833218],
                        [112.0824652, -7.8302818],
                        [112.0847193, -7.8238267],
                        [112.0785583, -7.8203355],
                        [112.0750044, -7.8173929],
                        [112.0700048, -7.8263083],
                        [112.0671474, -7.8249348],
                        [112.0648096, -7.8272522],
                        [112.0528479, -7.8220766],
                        [112.0491432, -7.8230534],
                        [112.0371411, -7.817401],
                        [112.0352866, -7.816543],
                        [112.0341286, -7.8191378],
                        [112.0294815, -7.8174899],
                        [112.02684, -7.8244202],
                        [112.0218503, -7.8229662],
                        [112.0219971, -7.8201554],
                        [112.0190619, -7.8194768],
                        [112.0187684, -7.8230631],
                        [112.0157839, -7.835082],
                        [112.0194042, -7.836778],
                        [112.0198936, -7.8398793],
                        [112.0304597, -7.8428345],
                        [112.0297869, -7.8457925],
                        [112.0341892, -7.847634],
                        [112.030912, -7.8535942],
                        [112.0291999, -7.8533519],
                        [112.0286618, -7.8570346],
                        [112.0248463, -7.8568408],
                        [112.0219114, -7.8639154],
                        [112.0172155, -7.8626555],
                    ],
                ],
            },
        },
    ],
};

function PetaSebaran() {
    const [kecamatanData, setKecamatanData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState("kota");
    const [query, setQuery] = useState("");
    const [selectedLembaga, setSelectedLembaga] = useState<any>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    const selected =
        kecamatanData.find((item) => item.id === selectedId) ||
        kecamatanData[0];

    const filteredLembaga = useMemo(() => {
        if (!selected || !selected.lembaga) return [];

        const keyword = query.toLowerCase().trim();

        if (!keyword) return selected.lembaga;

        return selected.lembaga.filter((item: any) =>
            [item.nama, item.jenis, item.kelurahan, item.status]
                .join(" ")
                .toLowerCase()
                .includes(keyword),
        );
    }, [query, selected]);

    useEffect(() => {
        setLoading(true);
        fetch("/api/kecamatan")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setKecamatanData(data.data);
                    setError(null);
                } else {
                    setError("Gagal memuat data lembaga");
                }
            })
            .catch((err) => {
                setError("Error: " + err.message);
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTop = 0;
        }

        setQuery("");
        setSelectedLembaga(null);
    }, [selectedId]);

    const baseColors: Record<string, string> = {
        mojoroto: "#ced4d4",
        kota: "#ced4d4",
        pesantren: "#ced4d4",
    };

    const mapSeriesData = useMemo(() => {
        return kecamatanData.map((item) => ({
            id: item.id,
            "hc-key": item.id,
            name: item.name,
            value: item.stats.pendidik,
            lembaga: item.stats.lembaga,
            pendidik: item.stats.pendidik,
            tervalidasi: item.stats.tervalidasi,
          tidak_tervalidasi: item.stats.tidak_tervalidasi,
            color: selectedId === item.id ? "#16895a" : baseColors[item.id],
            borderColor: "#ffffff",
        }));
    }, [selectedId, kecamatanData]);

    const lembagaMarkers = useMemo(() => {
        if (!selected || !selected.lembaga) return [];

        return selected.lembaga
            .filter((item: any) => item.latitude && item.longitude)
            .map((item: any) => ({
                id: item.id,
                name: item.nama,
                x: Number(item.longitude),
                y: Number(item.latitude),
                lembaga: item,
                marker: {
                    radius: selectedLembaga?.id === item.id ? 9 : 6,
                    fillColor:
                        selectedLembaga?.id === item.id ? "#f4a62a" : "#ef4444",
                    lineColor: "#ffffff",
                    lineWidth: 2,
                },
            }));
    }, [selected?.lembaga, selectedLembaga]);

    const mapOptions = useMemo<Highcharts.Options>(() => {
        return {
            chart: {
                map: kediriMapGeoJSON as any,
                backgroundColor: "transparent",
                height: 390,
                spacing: [8, 8, 8, 8],
            },
            title: {
                text: undefined,
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: true,
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    alignTo: "spacingBox",
                    verticalAlign: "top",
                    align: "left",
                    theme: {
                        fill: "#ffffff",
                        stroke: "#e2e8f0",
                        r: 8,
                        states: {
                            hover: {
                                fill: "#f8fafc",
                            },
                            select: {
                                fill: "#e8f7ef",
                            },
                        },
                    },
                },
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                useHTML: true,
                borderWidth: 0,
                borderRadius: 12,
                shadow: true,
                backgroundColor: "#ffffff",
                formatter: function () {
                    const point = this.point as any;

                    if (point.lembaga) {
                        return `
                            <div style="min-width:180px">
                                <strong>${point.name}</strong><br/>
                                <span style="color:#64748b">Klik untuk melihat detail lembaga</span>
                            </div>
                        `;
                    }

                    return `
                        <div style="min-width:210px">
                            <strong>Kecamatan ${point.name}</strong><br/>
                            <span>Lembaga: <b>${point.options.lembaga}</b></span><br/>
                            <span>Pendidik: <b>${point.options.pendidik}</b></span><br/>
                            <span>Tervalidasi: <b>${point.options.tervalidasi}</b></span><br/>
                            <span>Tidak Tervalidasi: <b>${point.options.tidak_tervalidasi}</b></span>
                        </div>
                    `;
                },
            },
            plotOptions: {
                map: {
                    allAreas: true,
                    joinBy: "hc-key",
                    borderColor: "#ffffff",
                    borderWidth: 3,
                    cursor: "pointer",
                    states: {
                        hover: {
                            color: "#22a06b",
                            borderColor: "#ffffff",
                        },
                        inactive: {
                            opacity: 1,
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return (this.point as any).name;
                        },
                        style: {
                            color: "#ffffff",
                            fontWeight: "800",
                            fontSize: "12px",
                            textOutline: "2px rgba(15, 23, 42, 0.35)",
                        },
                    },
                    point: {
                        events: {
                            click: function () {
                                const point = this as any;
                                const id = point.options?.id;

                                if (id) {
                                    setSelectedId(id);
                                }
                            },
                        },
                    },
                },
                mappoint: {
                    cursor: "pointer",
                    point: {
                        events: {
                            click: function () {
                                const point = this as any;

                                if (point.lembaga) {
                                    setSelectedLembaga(point.lembaga);
                                }
                            },
                        },
                    },
                },
            },
            series: [
                {
                    type: "map",
                    name: "Kecamatan",
                    mapData: kediriMapGeoJSON as any,
                    data: mapSeriesData,
                    keys: ["hc-key", "value"],
                    joinBy: "hc-key",
                    nullColor: "#f1f5f9",
                },
                {
                    type: "mappoint",
                    name: "Lembaga",
                    data: lembagaMarkers,
                    color: "#ef4444",
                    tooltip: {
                        pointFormat: "{point.name}",
                    },
                },
            ] as any,
        };
    }, [mapSeriesData, lembagaMarkers]);

    return (
        <>
            <Head title="Peta Sebaran" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4">
                    <SectionBadge variant="info">
                        <MapPin size={14} className="me-2" /> Detail Peta
                        Sebaran
                    </SectionBadge>

                    <h1 className="display-5 fw-black mt-3 mb-3">
                        Sebaran Lembaga Pendidikan Non Formal
                    </h1>

                    <p className="lead text-muted mb-0 col-lg-8">
                        Monitoring persebaran lembaga, jumlah pendidik, status
                        validasi, dan estimasi insentif berdasarkan kecamatan di
                        Kota Kediri.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-5">
                            <div className="card border-0 portal-card sticky-lg-top portal-sticky-map">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">
                                                Peta Administratif
                                            </div>
                                            <h2 className="h4 fw-black mb-0">
                                                Kota Kediri
                                            </h2>
                                        </div>

                                        <button className="btn btn-light rounded-pill fw-bold small d-flex align-items-center">
                                            3 Kecamatan{" "}
                                            <ChevronDown size={16} />
                                        </button>
                                    </div>

                                    <div className="portal-highcharts-map-wrapper">
                                        {loading ? (
                                            <div className="text-center py-5">
                                                <div
                                                    className="spinner-border text-success"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        ) : error ? (
                                            <div className="alert alert-warning mb-0">
                                                {error}
                                            </div>
                                        ) : mapSeriesData.length > 0 ? (
                                            <HighchartsReact
                                                highcharts={Highcharts}
                                                constructorType="mapChart"
                                                options={mapOptions}
                                            />
                                        ) : (
                                            <div className="text-center text-muted py-5">
                                                Tidak ada data peta
                                            </div>
                                        )}
                                    </div>

                                    <div className="row g-2 mt-3">
                                        {kecamatanData.length > 0 ? (
                                            kecamatanData.map((item) => (
                                                <div
                                                    className="col-4"
                                                    key={item.id}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setSelectedId(
                                                                item.id,
                                                            )
                                                        }
                                                        className={`btn w-100 rounded-pill fw-bold small ${
                                                            selectedId ===
                                                            item.id
                                                                ? "btn-success"
                                                                : "btn-light"
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-muted small">
                                                Loading kecamatan...
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3 small text-muted">
                                        <span className="d-inline-flex align-items-center gap-2 me-3">
                                            <span className="portal-map-dot bg-success" />
                                            Kecamatan aktif
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div
                                        className="spinner-border text-success"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : selected && selected.stats ? (
                                <div className="card border-0 portal-card mb-4">
                                    <div className="card-body p-4">
                                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                                            <div>
                                                <div className="text-muted small fw-semibold">
                                                    Kecamatan Terpilih
                                                </div>
                                                <h2 className="h1 fw-black mb-0">
                                                    {selected.name}
                                                </h2>
                                            </div>

                                            <div>
                                                <span className="badge rounded-pill text-bg-success px-3 py-2">
                                                    Data Dummy
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-6 col-xl-3">
                                                <div className="portal-mini-stat">
                                                    <b>
                                                        {selected.stats.lembaga}
                                                    </b>
                                                    <span>Lembaga</span>
                                                </div>
                                            </div>

                                            <div className="col-6 col-xl-3">
                                                <div className="portal-mini-stat">
                                                    <b>
                                                        {
                                                            selected.stats
                                                                .pendidik
                                                        }
                                                    </b>
                                                    <span>Pendidik</span>
                                                </div>
                                            </div>

                                            <div className="col-6 col-xl-3">
                                                <div className="portal-mini-stat">
                                                    <b>
                                                        {
                                                            selected.stats
                                                                .tervalidasi
                                                        }
                                                    </b>
                                                    <span>Menerima Insentif</span>
                                                </div>
                                            </div>

                                            <div className="col-6 col-xl-3">
                                                <div className="portal-mini-stat">
                                                    <b>
                                                        {
                                                            selected.stats
                                                                .tidak_tervalidasi
                                                        }
                                                    </b>
                                                    <span>Tidak Menerima Insentif</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className="card border-0 portal-card">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
                                        <div>
                                            <h3 className="h4 fw-black mb-1">
                                                Daftar Lembaga
                                            </h3>
                                            <p className="text-muted mb-0 small">
                                                Klik untuk melihat detail dan
                                                lokasi.
                                            </p>
                                        </div>

                                        <div className="input-group portal-search-box portal-search-box-sm">
                                            <span className="input-group-text bg-white border-0">
                                                <Search
                                                    size={16}
                                                    className="text-muted"
                                                />
                                            </span>
                                            <input
                                                value={query}
                                                onChange={(event) =>
                                                    setQuery(event.target.value)
                                                }
                                                className="form-control border-0 shadow-none"
                                                placeholder="Cari lembaga"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="table-responsive portal-table-wrapper"
                                        ref={tableRef}
                                        style={{
                                            maxHeight: "250px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        <table className="table table-hover align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <Building2 size={16} />{" "}
                                                        Lembaga
                                                    </th>
                                                    <th>Jenis</th>
                                                    <th>Kelurahan</th>
                                                    <th>Pendidik</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredLembaga.map(
                                                    (item: any) => (
                                                        <tr
                                                            key={
                                                                item.id ||
                                                                item.nama
                                                            }
                                                            onClick={() =>
                                                                setSelectedLembaga(
                                                                    item,
                                                                )
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                                backgroundColor:
                                                                    selectedLembaga?.id ===
                                                                    item.id
                                                                        ? "#f0fdf4"
                                                                        : "",
                                                            }}
                                                            className={
                                                                selectedLembaga?.id ===
                                                                item.id
                                                                    ? "border-start border-success border-3"
                                                                    : ""
                                                            }
                                                        >
                                                            <td className="fw-bold text-dark">
                                                                {item.nama}
                                                            </td>
                                                            <td>
                                                                {item.kategori.nama}
                                                            </td>
                                                            <td>
                                                                {item.kelurahan}
                                                            </td>
                                                            <td className="fw-bold">
                                                                {item.jumlah_guru}
                                                            </td>
                                                            <td className="fw-bold">
                                                                {item.jumlah_siswa}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedLembaga && (
                        <div className="mt-4">
                            <div className="card border-0 portal-card shadow-lg">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div>
                                            <span className="badge rounded-pill bg-success px-3 py-2 mb-3">
                                                {selectedLembaga.kategori.nama}
                                            </span>

                                            <h3 className="h3 fw-black mb-2">
                                                {selectedLembaga.nama}
                                            </h3>

                                        </div>

                                        <button
                                            onClick={() =>
                                                setSelectedLembaga(null)
                                            }
                                            className="btn btn-sm btn-light"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="row g-4 mb-4">
                                        <div className="col-lg-7">
                                            <div className="mb-4">
                                                <div className="d-flex gap-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="bg-light p-3 rounded">
                                                            <MapPinIcon
                                                                size={24}
                                                                className="text-success"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-muted small mb-1">
                                                            Alamat Lembaga
                                                        </p>
                                                        <p className="fw-bold mb-0">
                                                            {selectedLembaga.alamat},{" "}
                                                            {
                                                                selectedLembaga.kelurahan
                                                            },{" "}
                                                            {selectedLembaga.kecamatan},{" Kota Kediri"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-3 mb-4">
                                                <div className="col-6">
                                                    <div className="d-flex gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-light p-3 rounded">
                                                                <Phone
                                                                    size={24}
                                                                    className="text-success"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted small mb-1">
                                                                Telp
                                                            </p>
                                                            <p className="fw-black mb-0">
                                                                {
                                                                    selectedLembaga.telp
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-6">
                                                    <div className="d-flex gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-light p-3 rounded">
                                                                <Mail
                                                                    size={24}
                                                                    className="text-success"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted small mb-1">
                                                                Email
                                                            </p>
                                                            <p className="fw-black mb-0">
                                                                {selectedLembaga.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="d-flex gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-light p-3 rounded">
                                                                <Users
                                                                    size={24}
                                                                    className="text-success"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted small mb-1">
                                                                Total Pendidik
                                                            </p>
                                                            <p className="h5 fw-black mb-0">
                                                                {
                                                                    selectedLembaga.jumlah_guru
                                                                }{" "}
                                                                Orang
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-6">
                                                    <div className="d-flex gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-light p-3 rounded">
                                                                <Users
                                                                    size={24}
                                                                    className="text-success"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted small mb-1">
                                                                Estimasi Siswa
                                                            </p>
                                                            <p className="h5 fw-black mb-0">
                                                                {selectedLembaga.jumlah_siswa}{" "}
                                                                Orang
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-5">
                                            <h5 className="fw-semibold mb-3">
                                                Lokasi di Peta
                                            </h5>

                                            <div style={{ height: "180px" }}>
                                                {selectedLembaga.latitude &&
                                                selectedLembaga.longitude ? (
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        style={{
                                                            border: "none",
                                                            borderRadius:
                                                                "0.75rem",
                                                        }}
                                                        loading="lazy"
                                                        allowFullScreen
                                                        src={`https://www.google.com/maps?q=${selectedLembaga.latitude},${selectedLembaga.longitude}&z=15&output=embed`}
                                                    />
                                                ) : (
                                                    <div className="h-100 rounded-3 bg-light d-flex align-items-center justify-content-center text-muted small">
                                                        Koordinat belum tersedia
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedLembaga.pengurus?.length >
                                        0 && (
                                        <>
                                            <hr className="my-4" />

                                            <div>
                                                <h5 className="fw-black mb-3">
                                                    Tim Pendidik
                                                </h5>

                                                <div className="row g-3">
                                                    {selectedLembaga.pengurus.map(
                                                        (pengurus: any) => (
                                                            <div
                                                                key={
                                                                    pengurus.id
                                                                }
                                                                className="col-6 col-md-4 col-lg-3"
                                                            >
                                                                <div className="text-center p-3 bg-light rounded-3">
                                                                    <div className="d-flex justify-content-center">
                                                                        <img
                                                                            src={
                                                                                pengurus.foto
                                                                            }
                                                                            alt={
                                                                                pengurus.nama
                                                                            }
                                                                            className="rounded-circle mb-3"
                                                                            style={{
                                                                                width: "90px",
                                                                                height: "90px",
                                                                                objectFit:
                                                                                    "cover",
                                                                                border: "3px solid #10b981",
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <h6 className="fw-bold small mb-1">
                                                                        {
                                                                            pengurus.nama
                                                                        }
                                                                    </h6>
                                                                    <p className="text-muted small mb-0">
                                                                        {
                                                                            pengurus.jabatan
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

(PetaSebaran as any).layout = (page: React.ReactNode) => (
    <PortalLayout>{page}</PortalLayout>
);

export default PetaSebaran;
