import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Task } from '../feature-main/main';
import { Button } from './button';
import { TaskListsForm } from './task-lists-form';
import { useOutsideClick } from './useOutsideClick';

interface TaskListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  taskLists: Array<Task>;
  add: (v: any) => void;
}

export function TaskList(props: TaskListProps) {
  const [projectForm, setProjectForm] = useState(false);
  const ref = useRef<any>();
  useOutsideClick(ref, () => setProjectForm(false));

  return (
    <div>
      <div className="text-lg font-bold uppercase text-orange-700">
        Task Lists
      </div>
      <div className="flex flex-row items-center gap-2">
        {props.taskLists.map((tl) => (
          <div
            key={tl.taskListId || 0}
            className={classNames('cursor-pointer border p-2', {
              'bg-black text-white': props.selected.includes(tl.taskListId),
            })}
            onClick={() => {
              if (props.selected.includes(tl.taskListId)) {
                props.setSelected(
                  props.selected.filter((s) => s !== tl.taskListId),
                );
              } else {
                props.setSelected([...props.selected, tl.taskListId]);
              }
            }}
          >
            {tl.taskListName}
          </div>
        ))}
        <Button
          onClick={() => setProjectForm(!projectForm)}
          icon={projectForm ? 'minus' : 'plus'}
          variant="transparent"
        />
        {projectForm && (
          <div ref={ref}>
            <TaskListsForm
              add={(v) => {
                props.add(v);
                setProjectForm(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
