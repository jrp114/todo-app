import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Todo } from '../feature-main/main';
import { PlusButton } from './plus-button';
import ProjectsForm from './projects-form';
import { useOutsideClick } from './useOutsideClick';

interface ProjectListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  projects: Array<Todo>;
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
          key={p.projectId || 0}
          className={classNames('m-1 cursor-pointer border p-1', {
            'line-through': props.selected.includes(p.projectId),
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
      <PlusButton label="Add Project" onClick={() => setProjectForm(true)} />
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
