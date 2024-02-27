import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Maybe } from 'yup';
import { useModalContext } from '../../modal-context';
import { Todo } from '../todos/todos';
import { CardDetail } from './card-data';
import { Tag } from './tag';

interface CardItemProps {
  item?: Maybe<Todo>;
  i: number;
  dragging?: boolean;
  setDragging?: (dragging: boolean) => void;
  items?: Array<Todo>;
  remove?: (id: string) => void;
  setCurrent?: (current: Todo) => void;
  dropItem: (projectId: number, position: number) => void;
  listId?: number;
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
    <div
      ref={ref}
      id={item?.position.toString()}
      key={item?.id || 'empty'}
      className={classNames(
        'min-h-[60px] min-w-[150px] cursor-pointer rounded-lg border border-gray-300 bg-white p-3 shadow-md hover:bg-gray-200',
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
                        remove && item?.id && remove(item.id.toString());
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
          {item?.tags?.map((tag: string, i: number) => <Tag tag={tag} i={i} />)}
        </div>
        {item?.name}
      </div>
    </div>
  );
}
