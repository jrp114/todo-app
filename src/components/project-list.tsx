import classNames from 'classnames';
import { Todo } from '../feature-main/main';

interface ProjectListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  projects: Array<Todo>;
}

export function ProjectList(props: ProjectListProps) {
  return (
    <div className="flex flex-row">
      {props.projects.map((p) => (
        <div
          key={p.projectId}
          className={classNames('m-1 cursor-pointer border p-1', {
            'bg-primary': props.selected.includes(p.projectId),
          })}
          onClick={() => {
            if (props.selected.includes(p.projectId)) {
              props.setSelected(
                props.selected.filter((s) => s !== p.projectId),
              );
            } else {
              props.setSelected([...props.selected, p.projectId]);
            }
          }}
        >
          {p.projectName}
        </div>
      ))}
    </div>
  );
}
