import { Button } from '@components';
import { useModalContext } from '@modal-context';
import { Task } from '@types';
import classNames from 'classnames';
import { TaskListsForm } from './task-lists-form';

interface TaskListProps {
  selected: Array<number>;
  setSelected: (selected: Array<number>) => void;
  taskLists: Array<Task>;
  add: (v: any) => void;
}

export function TaskList(props: TaskListProps) {
  const { setModal } = useModalContext();

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
          onClick={() =>
            setModal({
              header: 'Add New Task List',
              message: (
                <TaskListsForm
                  add={(v) => {
                    props.add(v);
                  }}
                />
              ),
              noCancelButton: true,
            })
          }
          icon="plus"
          variant="transparent"
        />
      </div>
    </div>
  );
}
