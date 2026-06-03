import axios from "axios";

export function useLembaga() {

    const dataLembaga = async (
        inputValue: string,
    ) => {

        const res = await axios.get(
            route("lembaga.data"),
            {
                params: {
                    q: inputValue,
                },
            }
        );

        return res.data.data.map((item: any) => ({
            label: item.nama,
            value: item.id,
        }));
    };

    return {
        dataLembaga,
    };
}