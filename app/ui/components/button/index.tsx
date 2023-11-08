import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import { Url } from 'next/dist/shared/lib/router/router';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: boolean;
  href?: Url;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asLink = false, className, href, type, ...props }, ref) => {
    return asLink && href ? (
      <Link href={href} className={[styles.button, className].join(' ')}>
        {props.children}
      </Link>
    ) : (
      <button
        type={type}
        className={[styles.button, className].join(' ')}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
