import { Dispatch, SetStateAction } from 'react';

import { HiOutlineChevronDoubleDown as ArrowDownIcon } from 'react-icons/hi';

import Button from '@/components/Button';

import styles from './style.module.css';

type Props = {
  autoScroll: boolean;
  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  scrollToBottom: (scroll: boolean) => void;
};

const ButtonAutoScroll = ({
  autoScroll,
  setAutoScroll,
  scrollToBottom,
}: Props) => {
  const onClick = () => {
    setAutoScroll(true);
    scrollToBottom(true);
  };

  return (
    <>
      {!autoScroll && (
        <Button
          type="button"
          className={styles.btn}
          title="Resume Scroll"
          onClick={() => onClick()}
        >
          <ArrowDownIcon />
        </Button>
      )}
    </>
  );
};

export default ButtonAutoScroll;
