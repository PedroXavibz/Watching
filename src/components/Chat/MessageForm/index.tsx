import {
  Dispatch,
  SetStateAction,
  ClipboardEventHandler,
  FormEvent,
  KeyboardEventHandler,
  MutableRefObject,
  useEffect,
} from 'react';

import { MdSend as SendIcon } from 'react-icons/md';
import { BsEmojiLaughing as EmojiIcon } from 'react-icons/bs';
import { FaTimes as CloseIcon } from 'react-icons/fa';

import Message from '@/types/message.types';
import User from '@/types/user.types';

import Button from '@/components/Button';

import styles from './style.module.css';
import { ScrollDirection } from 'react-use-scroll-direction';

type Props = {
  user: User;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;

  setMessages: Dispatch<SetStateAction<Message[]>>;

  showEmojiPicker: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;

  showPlaceholder: boolean;
  setShowPlacholder: Dispatch<SetStateAction<boolean>>;

  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  inputRef: MutableRefObject<HTMLDivElement | null>;

  scrollDirection: ScrollDirection;
  isIntersecting: boolean;
};

const MessageForm = ({
  user,
  message,
  setMessage,
  setMessages,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowPlacholder,
  setAutoScroll,
  inputRef,
  showPlaceholder,
  scrollDirection,
  isIntersecting,
}: Props) => {
  const sendMessage = (e?: FormEvent) => {
    e?.preventDefault();

    if (!message) return;
    const id = crypto.randomUUID().split('-').join('');
    const text = message;
    const date = new Date();

    const newMessage: Message = {
      id,
      user,
      text,
      date,
    };
    setMessages(prevState => [...prevState, newMessage]);
    setMessage('');

    // remove nodes from input content editable
    const node = inputRef.current;
    while (node?.hasChildNodes()) {
      if (node.lastChild) {
        node.removeChild(node.lastChild);
      }
    }

    if (showEmojiPicker) setShowEmojiPicker(false);

    setShowPlacholder(true);
    setAutoScroll(true);
  };

  const handlePlaceholder = () => {
    if (message === '') {
      setShowPlacholder(true);
    } else {
      setShowPlacholder(false);
    }
  };

  const onChange = ({ target }: any) => {
    setMessage(target.textContent);
  };

  const keyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }

    handlePlaceholder();
  };

  const onPaste: ClipboardEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(text));
      setMessage(
        e.currentTarget.textContent ? e.currentTarget.textContent : ''
      );

      selection.setPosition(e.currentTarget, selection.getRangeAt(0).endOffset);
    }

    handlePlaceholder();
  };

  useEffect(() => {
    if (scrollDirection === 'UP') {
      setAutoScroll(false);
    } else if (scrollDirection === 'DOWN' && isIntersecting) {
      setAutoScroll(true);
    }
  }, [scrollDirection, isIntersecting]);

  return (
    <form onSubmit={sendMessage} className={styles.messageForm}>
      <div className={styles.messageInput}>
        <div
          tabIndex={0}
          role="textbox"
          ref={inputRef}
          className={[
            styles.input,
            showPlaceholder ? '' : styles.hiddenBreakLine,
          ].join(' ')}
          contentEditable={true}
          onInput={onChange}
          onKeyDown={keyDown}
          onKeyUp={handlePlaceholder}
          onPaste={onPaste}
          onFocus={handlePlaceholder}
          onBlur={handlePlaceholder}
          suppressContentEditableWarning={true}
        />

        {showPlaceholder && (
          <div className={styles.placeHolder}>Type something...</div>
        )}
        <div className={styles.containerBtns}>
        <Button
          title="Emoji"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={styles.btnEmoji}
          type="button"
        >
          {showEmojiPicker ? <CloseIcon /> : <EmojiIcon />}
        </Button>

        <Button title="Send" className={styles.btn} type="submit">
          <SendIcon />
        </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
