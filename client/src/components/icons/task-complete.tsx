export default function TaskCompleteIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="28" height="28" fill="#99ADFF" />

      <rect
        x="5"
        y="5"
        width="18"
        height="18"
        rx="3"
        stroke="#1C3082"
        strokeWidth="1.5"
      />

      <path
        d="M9 15L13 18L19 10"
        stroke="#1C3082"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
