import { useState } from 'react';
import { useTodoContext } from './todos';

export default function Todo(props) {
  const { todos, removeTodo, dropItem } = useTodoContext();
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
          dropItem(props.current, 'todo');
          props.setCurrent(undefined);
        }}
      >
        <div className="text-xl text-orange-700 font-bold uppercase">todos</div>
        {todos?.map((t, i) => (
          <div
            key={t.id}
            className={
              dragging && index === i ? 'text-green-500 font-bold' : ''
            }
            draggable
            onDragStart={() => {
              setDragging(true);
              setIndex(i);
              props.setCurrent(todos[i]);
            }}
            onDragEnd={() => {
              setDragging(false);
              setIndex(undefined);
            }}
            onClick={() => removeTodo(t.id)}
          >
            {t.name} ({t.description})
          </div>
        ))}
      </div>
    </div>
  );
}
