interface Props {
    title: string;
    value: string;
    subtitle: string;
}

export default function DashboardCard({title, value,subtitle,}: Props) {
    return (
        <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">

            <p className="text-sm text-gray-400">
                {title}
            </p>

            <h3 className="mt-4 text-3xl font-bold text-white">
                {value}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                {subtitle}
            </p>

        </div>
    );
}