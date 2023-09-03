import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export default function Card(props) {
  const {
    item,
    i,
    dragging,
    index,
    setDragging,
    setIndex,
    items,
    remove,
    setCurrent,
  } = props;
  const [clicked, setClicked] = useState(false);
  const ref = useRef();
  useEffect(() => {
    window.addEventListener('click', (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setClicked(false);
      }
    });
  }, []);
  return (
    <div
      ref={ref}
      key={item.id}
      className={classNames('', {
        'text-green-500 font-bold': dragging && index === i,
        'border h-52 bg-green-200': clicked,
      })}
      draggable
      onDragStart={() => {
        setDragging(true);
        setIndex(i);
        setCurrent(items[i]);
      }}
      onDragEnd={() => {
        setDragging(false);
        setIndex(undefined);
      }}
      onClick={() => setClicked(true)}
    >
      {item.name}
      {clicked && (
        <div className="flex flex-col justify-between gap-y-24 h-fit items-end max-w-xs">
          <div className="italic text-sm text-red-500 mr-1 flex-wrap">
            {item.description}
          </div>
          <button
            className="bg-red-500 text-white h-fit w-fit p-1 mr-1"
            onClick={() => remove(item.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
