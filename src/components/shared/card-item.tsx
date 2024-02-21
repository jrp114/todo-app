import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Maybe } from 'yup';
import { useModalContext } from '../../modal-context';
import { Todo } from '../todos/todos';
import { CardDetail } from './card-data';

interface CardItemProps {
  item: Maybe<Todo>;
  i: number;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  items: Array<Todo>;
  remove: (id: string) => void;
  setCurrent: (current: Todo) => void;
  current: Maybe<Todo>;
  dropItem: (current: Maybe<Todo>, list: string, position: number) => void;
  name: string;
  key: number | string;
}

export default function CardItem({
  item,
  i,
  dragging,
  setDragging,
  items,
  remove,
  setCurrent,
  current,
  dropItem,
  name,
  key,
}: CardItemProps) {
  const { setModal, setShowModal } = useModalContext();
  const [index, setIndex] = useState<number | null>(null);
  const [over, setOver] = useState(false);
  const [dropArea, setDropArea] = useState<number>();
  const ref = useRef<any>();
  return (
    <div
      ref={ref}
      id={item?.position.toString()}
      key={item?.id || 'empty'}
      className={classNames(
        'border shadow-md border-gray-300 rounded-lg min-h-[60px] min-w-[150px] p-3 bg-white hover:bg-gray-200 cursor-pointer',
        {
          'text-green-500 font-bold': dragging && index === i,
          'border border-dashed border-red-500 bg-green-100': over,
        },
      )}
      draggable
      onDragStart={() => {
        setDragging(true);
        setIndex(i);
        setCurrent(items[i]);
      }}
      onDragOver={(e: any) => {
        setOver(true);
        if (e.target.id && e.target.id !== '') {
          setDropArea(e.target.id);
        }
      }}
      onDragLeave={() => setOver(false)}
      onDragEnd={() => {
        setDragging(false);
        setIndex(null);
      }}
      onDrop={(e) => {
        if (dropArea) {
          dropItem(current, name, dropArea);
        }
        setOver(false);
      }}
      onClick={() =>
        setModal({
          message: item && <CardDetail item={item} />,
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
                        remove(item?.id?.toString() || '');
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
          {item?.tags?.map((tag: string, i: number) => (
            <div
              key={`tag-${i}`}
              className="text-xs text-blue-500 bg-white mr-1 flex-wrap border  p-0.5 m-0.5"
            >
              {tag}
            </div>
          ))}
        </div>
        {item?.name}
      </div>
    </div>
  );
}
