import classNames from 'classnames';
import { useRef } from 'react';
import { useModalContext } from '../../modal-context';
import { CardDetail } from './card-data';

export default function CardItem({
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
      className={classNames(
        'border shadow-md border-gray-300 rounded-lg min-h-[60px] min-w-[150px] p-3 bg-white hover:bg-gray-200 cursor-pointer',
        {
          'text-green-500 font-bold': dragging && index === i,
        },
      )}
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
          message: <CardDetail item={item} />,
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
      <div className="flex flex-col items-start">
        <div className="flex flex-row flex-wrap">
          {item.tags?.map((tag, i) => (
            <div
              key={`tag-${i}`}
              className="text-xs text-blue-500 bg-white mr-1 flex-wrap border  p-0.5 m-0.5"
            >
              {tag}
            </div>
          ))}
        </div>
        {item.name}
      </div>
    </div>
  );
}
