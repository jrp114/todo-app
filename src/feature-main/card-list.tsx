import { Button, useOutsideClick } from '@components';
import { Task } from '@types';
import { useRef, useState } from 'react';
import CardItem from './card-item';
import TasksForm from './tasks-form';

interface CardListProps {
  dropItem: (taskListId: number, position: number) => void;
  setCurrent: (current: Task) => void;
  items: Array<Task>;
  remove: (id: string) => void;
  add: (v: Task) => void;
  showList: boolean;
}

export default function CardList({
  dropItem,
  setCurrent,
  items,
  remove,
  add,
  showList,
}: CardListProps) {
  const [dragging, setDragging] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const ref = useRef<any>();
  useOutsideClick(ref, () => setAddTask(false));

  return (
    showList && (
      <div className="min-h-full min-w-[350px] rounded-xl bg-gray-100">
        <div
          draggable
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <div className="rounded-lg p-6">
            <div className="text-xl font-bold uppercase text-orange-700">
              {items[0].taskListName}
            </div>
            {!addTask && (
              <Button
                onClick={() => setAddTask(!addTask)}
                icon="plus"
                variant="transparent"
              >
                Add New Task
              </Button>
            )}
            {addTask && (
              <div
                ref={ref}
                className="mt-4 min-h-[60px] min-w-[150px] cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md"
              >
                <TasksForm
                  done={() => setAddTask(false)}
                  add={add}
                  listId={items[0].taskListId}
                />
              </div>
            )}
            <div className="flex flex-col gap-2 pt-2">
              {items.map((item: Task, i: number) => (
                <CardItem
                  key={item.id}
                  item={item}
                  i={i}
                  dragging={dragging}
                  setDragging={setDragging}
                  items={items}
                  remove={remove}
                  setCurrent={setCurrent}
                  dropItem={dropItem}
                  listId={items[0].taskListId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
