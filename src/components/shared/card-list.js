import { useEffect, useRef, useState } from 'react';
import CardItem from './card-item';

export default function CardList({
  current,
  name,
  dropItem,
  setCurrent,
  items,
  remove,
}) {
  const [dragging, setDragging] = useState(false);
  const [index, setIndex] = useState(undefined);
  const [addTodo, setAddTodo] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // we want to close the new todo if we escape or click outside
    const handleClose = (e) => {
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
        onDrop={() => {
          dropItem(current, name);
          setCurrent(undefined);
        }}
      >
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="text-xl text-orange-700 font-bold uppercase">
            {name}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {items?.map((item, i) => (
              <CardItem
                key={item.id}
                item={item}
                i={i}
                dragging={dragging}
                setDragging={setDragging}
                setIndex={setIndex}
                items={items}
                remove={remove}
                index={index}
                setCurrent={setCurrent}
              />
            ))}
          </div>
          {name === 'todo' && !addTodo && (
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
              className="border shadow-md border-gray-300 rounded-lg min-h-[60px] min-w-[150px] p-3 mt-4 bg-white hover:bg-gray-200 cursor-pointer"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
