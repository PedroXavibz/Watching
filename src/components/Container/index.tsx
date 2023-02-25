import { ReactNode } from 'react';
import styles from './style.module.css';

type Props = {
  children: ReactNode
}

const Container = ({ children }: Props) => <div className={styles.main}>{children}</div>;


export default Container;
