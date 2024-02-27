import classNames from 'classnames';

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
  return (
    <button
      className={classNames(
        'flex items-center justify-center rounded-md p-1 text-white',
        {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'h-6 text-[12px]': size === 'sm',
          'text-lg': size === 'lg',
          'text-base': size === 'md',
        },
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
