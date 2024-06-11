import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Button, useOutsideClick } from '../components';
import { Task } from '../types';
import { TaskListsForm } from './task-lists-form';

interface TaskListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  taskLists: Array<Task>;
  add: (v: any) => void;
}

export function TaskList(props: TaskListProps) {
  const [taskListForm, setTaskListForm] = useState(false);
  const ref = useRef<any>();
  useOutsideClick(ref, () => setTaskListForm(false));

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
          onClick={() => setTaskListForm(!taskListForm)}
          icon={taskListForm ? 'minus' : 'plus'}
          variant="transparent"
        />
        {taskListForm && (
          <div ref={ref}>
            <TaskListsForm
              add={(v) => {
                props.add(v);
                setTaskListForm(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
