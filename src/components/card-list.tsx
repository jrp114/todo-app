import { useRef, useState } from 'react';
import { Maybe } from 'yup';
import { Todo } from '../feature-main/main';
import CardItem from './card-item';
import { PlusButton } from './plus-button';
import TodosForm from './todos-form';
import { useOutsideClick } from './useOutsideClick';

interface CardListProps {
  current: Maybe<Todo>;
  dropItem: (projectId: number, position: number) => void;
  setCurrent: (current: Todo) => void;
  items: Array<Todo>;
  remove: (id: string) => void;
  add: (v: Todo) => void;
}

export default function CardList({
  current,
  dropItem,
  setCurrent,
  items,
  remove,
  add,
}: CardListProps) {
  const [dragging, setDragging] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const ref = useRef<any>();
  useOutsideClick(ref, () => setAddTodo(false));

  return (
    <div className="p-5">
      <div
        draggable
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <div className="rounded-lg bg-gray-100 p-3">
          <div className="text-xl font-bold uppercase text-orange-700">
            {items[0].projectName}
          </div>
          {!addTodo && (
            <PlusButton onClick={() => setAddTodo(true)} label="Add New Task" />
          )}
          {addTodo && (
            <div
              ref={ref}
              className="mt-4 min-h-[60px] min-w-[150px] cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md"
            >
              <TodosForm
                done={() => setAddTodo(false)}
                add={add}
                listId={items[0].projectId}
              />
            </div>
          )}
          <div className="max-h-screen overflow-y-auto">
            <div className="flex flex-col gap-2 pt-2">
              {items?.length > 0 ? (
                items?.map((item: Todo, i: number) => (
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
                    listId={items[0].projectId}
                  />
                ))
              ) : (
                // TODO: Handle the case where a current project ID has no todos
                <CardItem key="empty" i={0} dropItem={dropItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
