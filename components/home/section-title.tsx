type SectionTitleProps = {
  title: string;
  actionLabel?: string;
};

export default function SectionTitle({
  title,
  actionLabel = "See all",
}: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-bold">{title}</h3>
      <button className="text-sm font-medium text-[#4F7CFF]">
        {actionLabel}
      </button>
    </div>
  );
}