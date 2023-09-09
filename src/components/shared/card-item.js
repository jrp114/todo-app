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
      {item.name}
    </div>
  );
}
