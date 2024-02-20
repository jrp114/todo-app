import { useEffect, useRef, useState } from 'react';
import TodosForm from '../todos/todos-form';
import CardItem from './card-item';

interface CardListProps {
  current: any;
  listCategory: string;
  dropItem: (current: any, list: string, position: number | null) => void;
  setCurrent: (current: any) => void;
  items: any;
  remove: (id: any) => void;
  add: (v: any) => void;
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

  useEffect(() => {
    // we want to close the new todo if we escape or click outside
    const handleClose = (e: any) => {
      if (
        (ref.current && !ref.current.contains(e.target)) ||
        e.key === 'Escape'
      ) {
        setAddTodo(false);
      }
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
  }, [ref]);

  return (
    <div className="p-5">
      <div
        draggable
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="text-xl text-orange-700 font-bold uppercase">
            {listCategory}
          </div>
          <div className="overflow-y-auto max-h-screen">
            <div className="flex flex-col gap-2 pt-2">
              {items?.length > 0 ? (
                items?.map((item: any, i: number) => (
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
                  item={null}
                  i={0}
                  dragging={dragging}
                  setDragging={setDragging}
                  items={items}
                  remove={remove}
                  setCurrent={setCurrent}
                  current={current}
                  dropItem={dropItem}
                  name={listCategory}
                />
              )}
            </div>
          </div>
          {listCategory === 'todo' && !addTodo && (
            <div
              className="p-2 cursor-pointer"
              onClick={() => setAddTodo(true)}
            >
              Add something todo
            </div>
          )}
          {addTodo && (
            <div
              ref={ref}
              className="border shadow-md border-gray-300 rounded-lg min-h-[60px] min-w-[150px] p-3 mt-4 bg-white cursor-pointer"
            >
              <TodosForm done={() => setAddTodo(false)} add={add} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
