import { useState } from 'react';
import Card from './card';

export default function CardList(props) {
  // const { todos, removeTodo, dropItem } = useTodoContext();
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
          props.dropItem(props.current, props.name);
          props.setCurrent(undefined);
        }}
      >
        <div className="text-xl text-orange-700 font-bold uppercase">
          {props.name}
        </div>
        {props.items?.map((item, i) => (
          <Card
            item={item}
            i={i}
            dragging={dragging}
            setDragging={setDragging}
            setIndex={setIndex}
            items={props.items}
            remove={props.remove}
            index={index}
            setCurrent={props.setCurrent}
          />
        ))}
      </div>
    </div>
  );
}
