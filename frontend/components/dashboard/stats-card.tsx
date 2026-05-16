interface Props {
    title: string;
    value: string;
    subtitle: string;
}

export default function StatsCard({
    title,
    value,
    subtitle,
}: Props) {
    return (
        <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-7">
            <p className="text-sm text-gray-400">
                {title}
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
                {value}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
                {subtitle}
            </p>
        </div>
    );
}