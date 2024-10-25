

import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ type = 'button', variant = 'primary', size = 'md', children, onClick }) => {
    const baseStyles = 'inline-flex items-center justify-center border font-medium rounded focus:outline-none';

    const variantStyles = {
        primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white border-transparent hover:bg-gray-600',
        outline: 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white',
    };

    const sizeStyles = {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const buttonClasses = classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size]
    );

    return (
        <button type={type} className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
