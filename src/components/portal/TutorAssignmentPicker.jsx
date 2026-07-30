export default function TutorAssignmentPicker({
  copy,
  assignments = [],
  selectedAssignmentId = "",
  onSelect,
}) {
  if (!assignments.length) return null

  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold text-white/84">{copy.bookingTutorAndSubjects}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {assignments.map((assignment) => {
          const selected = assignment.assignment_id === selectedAssignmentId
          return (
            <button
              key={assignment.assignment_id || `legacy-${assignment.tutor_id}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect?.(assignment.assignment_id)}
              className={selected
                ? "rounded-[18px] border border-[#f5c977]/60 bg-[#f5c977]/12 p-4 text-left text-white"
                : "rounded-[18px] border border-white/15 bg-white/5 p-4 text-left text-white transition hover:bg-white/10"}
            >
              <span className="block font-semibold">{assignment.tutor_name || copy.bookingTutorAssignmentRequired}</span>
              <span className="mt-1 block text-sm leading-6 text-white/65">{assignment.subjects || copy.bookingTutorAssignmentRequired}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
