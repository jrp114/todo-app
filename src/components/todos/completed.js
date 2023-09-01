import { useState } from 'react';
import { useTodoContext } from './todos';

export default function Completed(props) {
  const { completed, removeCompleted, dropItem } = useTodoContext();
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
          dropItem(props.current, 'complete');
          props.setCurrent(undefined);
        }}
      >
        <div className="text-xl text-orange-700 font-bold uppercase">
          complete
        </div>
        {completed.map((t, i) => (
          <div
            key={t.id}
            className={
              dragging && index === i ? 'text-green-500 font-bold' : ''
            }
            draggable
            onDragStart={() => {
              setDragging(true);
              setIndex(i);
              props.setCurrent(completed[i]);
            }}
            onDragEnd={() => {
              setDragging(false);
              setIndex(undefined);
            }}
            onClick={() => removeCompleted(t.id)}
          >
            {t.name} ({t.description})
          </div>
        ))}
      </div>
    </div>
  );
}
