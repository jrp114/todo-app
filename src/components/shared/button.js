export function Button({
  type = 'button',
  onClick,
  variant = 'primary',
  children,
}) {
  let classes = 'text-white p-1 rounded-md';
  if (variant === 'primary') classes += ' bg-primary';
  else if (variant === 'secondary') classes += ' bg-secondary';
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
