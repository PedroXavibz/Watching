import { useSnackBar } from '@/contexts/useSnackbar.context';

import styles from './style.module.css';

const SnackBar = () => {
  const { show, message, onClose } = useSnackBar();

  return (
    <>
      {show ? (
        <div className={styles.snackbar} onClick={() => onClose()}>
          <h1>{message}</h1>
        </div>
      ) : null}
    </>
  );
};

export default SnackBar;
