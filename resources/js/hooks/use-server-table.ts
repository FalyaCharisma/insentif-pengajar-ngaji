import { useState } from "react";

export function useServerTable() {

    const [search, setSearch] = useState("");

    return {
        search,
        setSearch,
    };
}