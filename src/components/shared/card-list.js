import { useEffect, useState } from 'react';
import { useTodoContext } from '../../todos-context';
import Card from './card';

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
  const { todos } = useTodoContext();

  useEffect(() => console.log(todos));
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
        <div className="text-xl text-orange-700 font-bold uppercase">
          {name}
        </div>
        {items?.map((item, i) => (
          <Card
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
    </div>
  );
}
