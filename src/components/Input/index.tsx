import { useState, ReactNode, ComponentProps, Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

import styles from './style.module.css';

type Props = {
  className?: string,
  type: ComponentProps<'input'>['type'],
  Icon?: IconType,
  children?: ReactNode,
  placeHolder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}


const Input = ({
  className,
  type,
  Icon,
  children,
  placeHolder = 'Type something',
  value = '',
  setValue
}: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={[styles.container__input, isHover ? styles.container__input_focus : '', className].join(' ')}>
      <label className={
        [isHover || value ? styles.label_up : styles.label, value && !isHover ? styles.label_white : ''].join(' ')}
        htmlFor="userInput">{placeHolder}</label>
      <input
        title={placeHolder}
        type={type}
        className={styles.input}
        id="userInput"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
      />
      {Icon ? <Icon className={[styles.icon, isHover ? styles.icon_focus : ''].join(' ')} /> : children}
    </div>
  );
};

export default Input;
