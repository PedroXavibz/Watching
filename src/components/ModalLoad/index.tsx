import { ReactNode } from 'react';

import styles from './style.module.css';

type Props = {
  children: ReactNode
}

const ModalLoad = ({ children }: Props) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      {children}
    </div>
  </div >
);

export default ModalLoad;
