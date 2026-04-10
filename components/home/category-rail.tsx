"use client";

type CategoryRailProps = {
  categories: ReadonlyArray<string>;
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryRail({
  categories,
  activeCategory,
  onChange,
}: CategoryRailProps) {
  return (
    <div className="no-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
              active
                ? "bg-[#EAF0FF] text-[#4F7CFF]"
                : "border border-[#E5E9F2] bg-white text-[#111827]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}