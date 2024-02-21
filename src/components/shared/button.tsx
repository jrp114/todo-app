interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'md',
  children,
}: ButtonProps) {
  let classes = 'text-white p-1 rounded-md flex items-center justify-center';
  if (variant === 'primary') classes += ' bg-primary';
  else if (variant === 'secondary') classes += ' bg-secondary';
  if (size === 'sm') classes += ' text-[12px] h-6';
  else if (size === 'lg') classes += ' text-lg';
  else classes += ' text-base';
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
