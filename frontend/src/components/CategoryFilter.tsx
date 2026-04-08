interface Props {
  categories: string[];
  selected: string;
  onChange: (c: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <div className="mb-3">
      {categories.map((c) => (
        <button
          key={c}
          className={`btn btn-sm me-2 mb-2 ${
            selected === c ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
