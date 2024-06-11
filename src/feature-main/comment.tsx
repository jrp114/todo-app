import classNames from 'classnames';
import { useRef } from 'react';
import { Maybe } from 'yup';
import { CommentType } from './card-data';

interface CommentProps {
  comment: CommentType;
  edit: Maybe<number>;
  setEdit: (edit: Maybe<number>) => void;
  hover: Maybe<number>;
  setHover: (hover: Maybe<number>) => void;
  updateComment: (comment: CommentType) => void;
}

export function Comment(props: CommentProps) {
  const editRef = useRef<any>();
  return (
    <div key={props.comment.id} className=" flex justify-end p-1">
      <div
        contentEditable={props.edit === props.comment.id}
        onMouseOver={() => {
          props.setHover(props.comment.id);
        }}
        onMouseDown={() => props.setEdit(props.comment.id)}
        onMouseLeave={() => {
          if (
            props.edit === props.comment.id &&
            editRef.current.innerHTML !== props.comment.text
          ) {
            props.updateComment({
              id: props.comment.id,
              text: editRef.current.innerHTML,
            });
          }
          props.setEdit(null);
          props.setHover(null);
        }}
        className={classNames(
          'p-.25 flex w-full flex-row justify-between text-sm text-blue-400 outline-none',
          {
            'border border-dashed': props.hover === props.comment.id,
          },
        )}
        suppressContentEditableWarning={true}
      >
        <span ref={editRef}>{props.comment.text}</span>
        {props.hover === props.comment.id && (
          <img height={15} width={15} src="/pencil.svg" />
        )}
      </div>
    </div>
  );
}
