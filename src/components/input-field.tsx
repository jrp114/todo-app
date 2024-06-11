interface InputFieldProps {
  label?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
  type?: string;
  error?: string;
  textarea?: boolean;
}

function InputField(props: InputFieldProps) {
  return (
    <span className="flex w-full flex-col">
      {!props.textarea ? (
        <input
          {...props.register}
          className={`border ${props.classes ? props.classes : ''}`}
          placeholder={props.label}
          onChange={props.onChange}
          type={props.type || 'text'}
        />
      ) : (
        <textarea
          {...props.register}
          className={`border ${props.classes ? props.classes : ''}`}
          placeholder={props.label}
        />
      )}
      {props.error && <p className="text-red-500">{props.error}</p>}
    </span>
  );
}

export default InputField;
