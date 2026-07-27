import FormSelect2 from "@/Components/forms/FormSelect2";
import { Periode } from "@/types/periode";

type Props = {
    periode: Periode[];
    value: number;
    onChange: (value: number) => void;
};

export default function DashboardFilter({
    periode,
    value,
    onChange,
}: Props) {
    return (
        <div className="flex justify-end">
            <div className="w-64">
                <FormSelect2
                    label="Periode"
                    value={value}
                    options={periode.map((item) => ({
                        value: item.id,
                        label: item.tahun.toString(),
                    }))}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}