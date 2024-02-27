interface TagProps {
  tag: string;
  i: number;
}

export function Tag(props: TagProps) {
  return (
    <div
      key={`tag-${props.i}`}
      className="m-0.5 mr-1 flex-wrap border bg-white p-0.5 text-xs text-blue-500"
    >
      {props.tag}
    </div>
  );
}
