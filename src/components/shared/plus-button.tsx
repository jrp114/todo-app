interface PlusButtonProps {
  onClick: () => void;
  label: string;
}

export function PlusButton(props: PlusButtonProps) {
  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => props.onClick()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        {props.label && <span>{props.label}</span>}
      </div>
    </div>
  );
}
