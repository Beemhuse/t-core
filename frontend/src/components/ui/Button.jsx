import clsx from 'clsx';

export const Button = ({ children, variant = 'default', size = 'md', className, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none';

  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100',
    ghost: 'text-gray-500 hover:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-5 py-3 text-lg',
  };

  const combinedStyles = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className);

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};
