import { useState } from 'react';
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
    </div>
  );
}
