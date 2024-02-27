import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Maybe } from 'yup';
import {
  useAddCommentMutation,
  useCommentsQuery,
  useUpdateCommentMutation,
} from '../api';
import { Todo } from '../feature-main/main';
import { Button } from './button';

interface CardDetailProps {
  item: Todo;
}

interface Comment {
  id: number;
  text: string;
}

export function CardDetail(props: CardDetailProps) {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [edit, setEdit] = useState<Maybe<number>>(undefined);
  const { register, handleSubmit, resetField } = useForm();
  const { data, refetch } = useCommentsQuery(props.item.id);
  const { mutate: addComment } = useAddCommentMutation(refetch);
  const { mutate: updateComment } = useUpdateCommentMutation(refetch);

  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <div className="flex h-fit max-w-xs flex-col items-end justify-between">
      <div className="flex w-full flex-row justify-center text-2xl">
        {props.item?.name}
      </div>
      <div className="flex w-full flex-col items-end justify-between gap-16">
        <div>
          <div className="flex-wrap text-sm italic text-red-500">
            {props.item?.description}
          </div>
          <div className="mt-3 text-sm">
            <label>Comments</label>
            <form
              onSubmit={handleSubmit((v) => {
                addComment({ id: props.item.id, text: v.comment });
                resetField('comment');
              })}
              className="flex flex-row justify-end gap-2 pb-3"
            >
              <input {...register('comment')} className="w-full border" />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </form>
            {comments?.map((comment) => (
              <div key={comment.id} className=" flex justify-end p-1">
                <div
                  contentEditable={edit === comment.id}
                  onBlur={(e) => {
                    if (e.target.innerHTML !== comment.text) {
                      updateComment({
                        id: comment.id,
                        text: e.target.innerHTML,
                      });
                    }
                  }}
                  className={classNames('p-.25 w-full text-sm text-blue-400', {
                    border: edit === comment.id,
                  })}
                  suppressContentEditableWarning={true}
                >
                  {comment.text}
                </div>
                <Button
                  onClick={() => setEdit(comment.id)}
                  size="sm"
                  variant="secondary"
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
        {props.item.tags && (
          <div className="flex flex-row flex-wrap">
            {props.item.tags?.map((tag: string, i: number) => (
              <div
                key={`tag-${i}`}
                className="m-0.5 mr-1 flex-wrap border bg-white p-0.5  text-xs text-blue-500"
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
