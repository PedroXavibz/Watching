import { ReactNode } from 'react';
import styles from './style.module.css';

type Props = {
  children: ReactNode
}

const Container = ({ children }: Props) => <main className={styles.main}>{children}</main>;


export default Container;
