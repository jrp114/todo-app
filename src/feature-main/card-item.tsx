import { Task } from '@types';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useModalContext } from '../modal-context';
import { CardDetail } from './card-data';
import { Tag } from './tag';

interface CardItemProps {
  item: Task;
  i: number;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  items: Array<Task>;
  remove: (id: string) => void;
  setCurrent: (current: Task) => void;
  dropItem: (taskListId: number, position: number) => void;
  listId: number;
}

export default function CardItem({
  item,
  i,
  dragging,
  setDragging,
  items,
  remove,
  setCurrent,
  dropItem,
  listId,
}: CardItemProps) {
  const { setModal, setShowModal } = useModalContext();
  const [index, setIndex] = useState<number | null>(null);
  const [over, setOver] = useState(false);
  const [dropArea, setDropArea] = useState<number>(0);
  const ref = useRef<any>();
  return (
    item?.id && (
      <div
        ref={ref}
        id={item.position.toString()}
        key={item.id}
        className={classNames(
          'min-h-32 cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md hover:bg-gray-200',
          {
            'font-bold text-green-500': dragging && index === i,
            'border border-dashed border-red-500 bg-green-100': over,
          },
        )}
        draggable
        onDragStart={() => {
          setDragging && setDragging(true);
          setIndex(i);
          setCurrent && items && setCurrent(items[i]);
        }}
        onDragOver={(e: any) => {
          setOver(true);
          if (e.target.id && e.target.id !== '') {
            setDropArea(e.target.id);
          }
        }}
        onDragLeave={() => setOver(false)}
        onDragEnd={() => {
          setDragging && setDragging(false);
          setIndex(null);
        }}
        onDrop={(e) => {
          listId && dropItem(listId, dropArea);
          setOver(false);
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
                          item.id && remove(item.id.toString());
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
            {item.tags.map((tag: string, i: number) => (
              <Tag key={`tag-${i}`} tag={tag} />
            ))}
          </div>
          {item?.name}
        </div>
      </div>
    )
  );
}
