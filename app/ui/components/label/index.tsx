import React from 'react';
import styles from './styles.module.css';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label className={styles.label} ref={ref} {...props} />
  )
);

Label.displayName = 'Label';

export default Label;
