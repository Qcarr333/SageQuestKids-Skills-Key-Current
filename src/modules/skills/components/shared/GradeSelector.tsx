'use client';

type GradeSelectorProps = {
  selectedGrade: string;
  onChange: (grade: string) => void;
  getGradeLabel?: (grade: string) => string;
};

const GRADES = ['Kindergarten', '1st', '2nd', '3rd', '4th', '5th'];

export function GradeSelector({
  selectedGrade,
  onChange,
  getGradeLabel,
}: GradeSelectorProps) {
  return (
    <section aria-label="Select grade" className="rounded-2xl bg-white/90 p-4 shadow ring-1 ring-sky-100">
      <p className="mb-3 text-sm font-semibold text-slate-700">Choose your grade focus</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {GRADES.map((grade) => {
          const selected = grade === selectedGrade;
          return (
            <button
              key={grade}
              type="button"
              aria-label={grade}
              onClick={() => onChange(grade)}
              className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                selected
                  ? 'bg-sky-600 text-white'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
              }`}
            >
              {getGradeLabel?.(grade) ?? grade}
            </button>
          );
        })}
      </div>
    </section>
  );
}
