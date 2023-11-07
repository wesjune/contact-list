import React from 'react';
import styles from './styles.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={styles.input} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
