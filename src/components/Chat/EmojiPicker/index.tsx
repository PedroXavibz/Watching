import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import styles from './style.module.css';

type Props = {
  showEmojiPicker: boolean;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowPlacholder: Dispatch<SetStateAction<boolean>>;
  inputRef: MutableRefObject<HTMLDivElement | null>;
};

const EmojiPicker = ({
  showEmojiPicker,
  message,
  setMessage,
  setShowPlacholder,
  inputRef,
}: Props) => {
  const selectEmoji = (data: any) => {
    // Create emoji
    const emoji = document.createElement('em-emoji');
    emoji.setAttribute('id', data.id);

    // Add emoji to message / input text
    const text = message + ' ' + data.native + ' ';
    setMessage(text);
    inputRef.current?.insertAdjacentText('beforeend', ' ');
    inputRef.current?.insertAdjacentElement('beforeend', emoji);

    setShowPlacholder(false);
  };

  return (
    <>
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <Picker
            data={data}
            previewPosition="none"
            skinTonePosition="none"
            theme="dark"
            dynamicWidth={true}
            onEmojiSelect={selectEmoji}
          />
        </div>
      )}
    </>
  );
};

export default EmojiPicker;
