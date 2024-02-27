import { useRef, useState } from 'react';
import { Maybe } from 'yup';
import { Todo } from '../todos/todos';
import TodosForm from '../todos/todos-form';
import CardItem from './card-item';
import { useOutsideClick } from './useOutsideClick';

interface CardListProps {
  current: Maybe<Todo>;
  listCategory: string;
  dropItem: (projectId: number, position: number) => void;
  setCurrent: (current: Todo) => void;
  items: Array<Todo>;
  remove: (id: string) => void;
  add: (v: Todo) => void;
  listId: string;
}

export default function CardList({
  current,
  listCategory,
  dropItem,
  setCurrent,
  items,
  remove,
  add,
  listId,
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
            {listCategory}
          </div>
          {!addTodo && (
            <div className="p-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setAddTodo(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
          )}
          {addTodo && (
            <div
              ref={ref}
              className="mt-4 min-h-[60px] min-w-[150px] cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md"
            >
              <TodosForm
                done={() => setAddTodo(false)}
                add={add}
                listId={listId}
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
                    current={current}
                    dropItem={dropItem}
                    listId={listId}
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
