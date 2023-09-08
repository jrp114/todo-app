import axios from 'axios';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalContext } from '../../modal-context';
import { Button } from './button';

function Message(props) {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, resetField } = useForm();

  const refetch = useCallback(() => {
    axios
      .get(`http://localhost:8501/comments?todoId=${props.item.id}`)
      .then((result) => {
        setComments(result.data);
      });
  }, []);

  const addComment = useCallback((id, text) => {
    axios
      .post('http://localhost:8501/comments', { todo_id: id, text })
      .then((result) => {
        refetch();
      });
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col justify-between h-fit items-end max-w-xs">
      <div className="w-full flex flex-row justify-center text-2xl">
        {props.item.name}
      </div>
      <div className="w-full flex flex-col justify-between items-end gap-16">
        <div>
          <div className="italic text-sm text-red-500 flex-wrap">
            {props.item.description}
          </div>
          <div className="mt-3 text-sm">
            <label>Comments</label>
            <form
              onSubmit={handleSubmit((v) => {
                addComment(props.item.id, v.comment);
                resetField('comment');
              })}
            >
              <input {...register('comment')} className="border w-full" />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </form>
            {comments?.map((comment) => (
              <div className="text-sm text-blue-400 w-full p-.25">
                {comment.text}
              </div>
            ))}
          </div>
        </div>
        {props.item.tags && (
          <div className="flex flex-row flex-wrap">
            {props.item.tags?.map((tag, i) => (
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
  );
}

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
          message: <Message item={item} />,
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
