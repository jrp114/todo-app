interface InputFieldProps {
  label?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
}

export function InputField(props: InputFieldProps) {
  return (
    <input
      {...props.register}
      className={`border ${props.classes ? props.classes : ''}`}
      placeholder={props.label}
      onChange={props.onChange}
    />
  );
}
