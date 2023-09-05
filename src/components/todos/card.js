import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../modal-context';

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
  const { setModal } = useModalContext();
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
        'border p-2 bg-green-200': clicked,
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
        <div className="flex flex-col justify-between h-fit items-end max-w-xs">
          <div className="italic text-sm text-red-500 mr-1 flex-wrap">
            {item.description}
          </div>
          {item.tags && (
            <div className="flex flex-row flex-wrap">
              {item.tags?.map((tag, i) => (
                <div
                  key={(tag, i)}
                  className="text-xs text-blue-500 bg-white mr-1 flex-wrap border  p-0.5 m-0.5"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-red-500 text-white h-fit w-fit p-1 mr-1 mt-16"
            onClick={() =>
              setModal({
                message: 'Are you sure you want to delete this?',
                actions: [{ name: 'Delete', handle: () => remove(item.id) }],
              })
            }
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
