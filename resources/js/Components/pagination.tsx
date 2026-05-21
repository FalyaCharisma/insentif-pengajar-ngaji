type Props = {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

export default function Pagination({ links }: Props) {
    return (
        <div className="flex justify-end mt-6">
            <div className="flex items-center gap-2">
                {links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        className={`px-4 py-2 rounded-xl text-sm border

                        ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-slate-700"
                        }
                    `}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        onClick={() => {
                            if (link.url) {
                                window.location.href = link.url;
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
