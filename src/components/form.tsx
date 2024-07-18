import Button from './button';

interface FormProps {
  classNames?: string;
  submitText?: string;
  handleSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

function Form({
  classNames = 'flex flex-col gap-4',
  submitText = 'Submit',
  handleSubmit,
  children,
}: FormProps) {
  return (
    <form className={classNames} onSubmit={handleSubmit}>
      {children}
      <Button size="sm" type="submit">
        {submitText}
      </Button>
    </form>
  );
}

export default Form;
