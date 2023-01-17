import { ReactNode, ComponentProps } from 'react';
import styles from './style.module.css';

type Props = {
  className?: string,
  type: ComponentProps<'button'>['type'],
  title?: string,
  onClick?: () => void,
  children: ReactNode,
};

const Button = ({ className, type = 'button', title = 'Button', onClick, children }: Props) => {
  if (onClick) {
    return <button title={title} className={[styles.btn, className].join(' ')} onClick={() => onClick()} type={type}>{children}</button>;
  }
  return <button title={title} className={[styles.btn, className].join(' ')} type={type}>{children}</button>;
};

export default Button;
