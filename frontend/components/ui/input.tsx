interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
                {label}
            </label>

            <input
                {...props}
                className="h-12 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:bg-[#0F172A] focus:ring-4 focus:ring-blue-500/10"
            />
        </div>
    );
}