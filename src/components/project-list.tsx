import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Task } from '../feature-main/main';
import { PlusButton } from './plus-button';
import ProjectsForm from './projects-form';
import { useOutsideClick } from './useOutsideClick';

interface ProjectListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  projects: Array<Task>;
  add: (v: any) => void;
}

export function ProjectList(props: ProjectListProps) {
  const [projectForm, setProjectForm] = useState(false);
  const ref = useRef<any>();
  useOutsideClick(ref, () => setProjectForm(false));

  return (
    <div className="flex flex-row">
      {props.projects.map((p) => (
        <div
          key={p.taskListId || 0}
          className={classNames('m-1 cursor-pointer border p-1', {
            'text-gray-400': props.selected.includes(p.taskListId),
          })}
          onClick={() => {
            if (props.selected.includes(p.taskListId)) {
              props.setSelected(
                props.selected.filter((s) => s !== p.taskListId),
              );
            } else {
              props.setSelected([...props.selected, p.taskListId]);
            }
          }}
        >
          {p.taskListName}
        </div>
      ))}
      <PlusButton label="Add Task List" onClick={() => setProjectForm(true)} />
      {projectForm && (
        <div ref={ref}>
          <ProjectsForm
            add={(v) => {
              props.add(v);
              setProjectForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
