interface InputFieldProps {
  label?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
  type?: string;
}

export function InputField(props: InputFieldProps) {
  return (
    <input
      {...props.register}
      className={`border ${props.classes ? props.classes : ''}`}
      placeholder={props.label}
      onChange={props.onChange}
      type={props.type || 'text'}
    />
  );
}
