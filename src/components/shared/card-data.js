import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddCommentMutation,
  useCommentsQuery,
  useUpdateCommentMutation,
} from '../../api';
import { Button } from './button';

export function CardDetail(props) {
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(undefined);
  const { register, handleSubmit, resetField } = useForm();
  const { data, loading, refetch } = useCommentsQuery(props.item.id);
  const { mutate: addComment } = useAddCommentMutation(refetch);
  const { mutate: updateComment } = useUpdateCommentMutation(refetch);

  useEffect(() => {
    if (!loading) {
      setComments(data);
    }
  }, [data, loading]);

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
                addComment({ id: props.item.id, text: v.comment });
                resetField('comment');
              })}
              className="flex flex-row justify-end gap-2 pb-3"
            >
              <input {...register('comment')} className="border w-full" />
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
                  className={classNames('text-sm text-blue-400 w-full p-.25', {
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
            {props.item.tags?.map((tag, i) => (
              <div
                key={`tag-${i}`}
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
