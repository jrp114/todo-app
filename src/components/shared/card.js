import classNames from 'classnames';
import { useRef } from 'react';
import { useModalContext } from '../../modal-context';

export default function Card({
  item,
  i,
  dragging,
  index,
  setDragging,
  setIndex,
  items,
  remove,
  setCurrent,
}) {
  const { setModal, setShowModal } = useModalContext();
  const ref = useRef();
  return (
    <div
      ref={ref}
      key={item.id}
      className={classNames('', {
        'text-green-500 font-bold': dragging && index === i,
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
      onClick={() =>
        setModal({
          message: (
            <div className="flex flex-col justify-between h-fit items-end max-w-xs">
              <div className="w-full flex flex-row justify-center text-2xl">
                {item.name}
              </div>
              <div className="w-full flex flex-col justify-between items-end gap-16">
                <div className="italic text-sm text-red-500 flex-wrap">
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
              </div>
            </div>
          ),
          actions: [
            {
              name: 'Delete',
              handle: () =>
                setModal({
                  message: 'Are you sure you want to delete this?',
                  actions: [
                    {
                      name: 'Delete',
                      handle: () => {
                        remove(item.id);
                        setShowModal(false);
                      },
                    },
                  ],
                }),
            },
          ],
        })
      }
    >
      {item.name}
    </div>
  );
}
