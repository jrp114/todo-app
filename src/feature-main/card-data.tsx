import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Maybe } from 'yup';
import {
  useAddCommentMutation,
  useCommentsQuery,
  useUpdateCommentMutation,
} from '../api';
import { Button, InputField } from '../components';
import { Task } from '../types';
import { Comment } from './comment';
import { Tag } from './tag';

interface CardDetailProps {
  item: Task;
}

export interface CommentType {
  id: number;
  text: string;
}

export function CardDetail(props: CardDetailProps) {
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [edit, setEdit] = useState<Maybe<number>>(undefined);
  const [hover, setHover] = useState<Maybe<number>>(undefined);
  const { register, handleSubmit, resetField } = useForm();
  const { data, refetch } = useCommentsQuery(props.item.id);
  const { mutate: addComment } = useAddCommentMutation(refetch);
  const { mutate: updateComment } = useUpdateCommentMutation(refetch);

  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <div className="flex h-[600px] w-[800px] flex-col gap-6">
      <div className="">{props.item?.name}</div>
      <div className="flex w-full flex-col">
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
              <InputField register={register('comment')} classes="w-full" />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </form>
            {comments?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                edit={edit}
                setEdit={setEdit}
                hover={hover}
                setHover={setHover}
                updateComment={updateComment}
              />
            ))}
          </div>
        </div>
        {props.item.tags && (
          <div className="flex flex-row flex-wrap pt-9">
            {props.item.tags?.map((tag: string, i: number) => (
              <Tag key={`tag-${i}`} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
