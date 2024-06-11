import classNames from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  icon?: 'plus' | 'minus';
}

function Button({
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  icon,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-2 rounded-md p-1',
        {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'bg-transparent text-black': variant === 'transparent',
          'h-6 text-[12px]': size === 'sm',
          'text-lg': size === 'lg',
          'text-base': size === 'md',
        },
      )}
      type={type}
      onClick={onClick}
    >
      {icon === 'plus' && (
        <img src="/plus.svg" alt="plus" className="h-4 w-4" />
      )}
      {icon === 'minus' && (
        <img src="/minus.svg" alt="minus" className="h-4 w-4" />
      )}
      {children}
    </button>
  );
}

export default Button;
