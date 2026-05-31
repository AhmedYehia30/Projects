interface SectionLabelProps {
  text: string;
  centered?: boolean;
}

export default function SectionLabel({ text, centered = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${centered ? "justify-center" : ""}`}>
      <span className="w-2 h-2 rounded-full bg-[#D4A853]" />
      <span className="text-sm font-semibold uppercase tracking-[2px] text-[#D4A853]">
        {text}
      </span>
    </div>
  );
}
