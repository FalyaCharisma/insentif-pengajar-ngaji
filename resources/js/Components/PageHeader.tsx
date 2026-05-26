type Props = {
    title: string;
    subtitle?: string;
};

export default function PageHeader({
    title,
    subtitle,
}: Props) {

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-2xl font-semibold text-slate-800">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-sm text-slate-500 mt-1">
                        {subtitle}
                    </p>
                )}

            </div>

        </div>
    );
}