import { useRef, useState } from 'react';
import { Maybe } from 'yup';
import { Todo } from '../todos/todos';
import TodosForm from '../todos/todos-form';
import CardItem from './card-item';
import { useOutsideClick } from './useOutsideClick';

interface CardListProps {
  current: Maybe<Todo>;
  listCategory: string;
  dropItem: (list: string, position: number) => void;
  setCurrent: (current: Todo) => void;
  items: Array<Todo>;
  remove: (id: string) => void;
  add: (v: Todo) => void;
}

export default function CardList({
  current,
  listCategory,
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
            {listCategory}
          </div>
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
                    name={listCategory}
                  />
                ))
              ) : (
                <CardItem
                  key="empty"
                  i={0}
                  dropItem={dropItem}
                  name={listCategory}
                />
              )}
            </div>
          </div>
          {listCategory === 'todo' && !addTodo && (
            <div
              className="cursor-pointer p-2"
              onClick={() => setAddTodo(true)}
            >
              Add something todo
            </div>
          )}
          {addTodo && (
            <div
              ref={ref}
              className="mt-4 min-h-[60px] min-w-[150px] cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md"
            >
              <TodosForm done={() => setAddTodo(false)} add={add} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
