import { useEffect, useRef, useState } from 'react';

import { useScrollDirection } from 'react-use-scroll-direction';

import useSocket from '@/hooks/useSocket';
import useOnScreen from '@/hooks/useOnScreen';

import Message from '@/types/message.types';
import User from '@/types/user.types';

import generateAvatar from '@/utils/generateAvatar';

import EmojiPicker from './EmojiPicker';
import MessageChat from './MessageChat';
import ButtonAutoScroll from './ButtonAutoScroll';
import MessageForm from './MessageForm';

import styles from './style.module.css';

type Props = {
  hidden: boolean;
};

const Chat = ({ hidden }: Props) => {
  const { scrollDirection, scrollTargetRef } = useScrollDirection();

  const inputRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socket = useSocket({ enable: false });
  const isIntersecting = useOnScreen(messagesEndRef);

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [showPlaceholder, setShowPlacholder] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Pedro',
    image: 'https://api.dicebear.com/4.4/bottts/svg',
  });

  const scrollToBottom = (syncScroll?: boolean) => {
    if (autoScroll || syncScroll) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    (async () => {
      const img = await generateAvatar();

      const user = {
        id: '1',
        name: 'Pedro',
        image: img,
      };

      setUser(user);
    })();
  }, []);

  return (
    <div hidden={hidden} className={styles.chat}>
      <ButtonAutoScroll
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        scrollToBottom={scrollToBottom}
      />

      <EmojiPicker
        inputRef={inputRef}
        showEmojiPicker={showEmojiPicker}
        message={message}
        setMessage={setMessage}
        setShowPlacholder={setShowPlacholder}
      />

      <MessageChat
        messages={messages}
        userID={user.id}
        messagesEndRef={messagesEndRef}
        scrollTargetRef={scrollTargetRef}
      />

      <MessageForm
        user={user}
        message={message}
        setMessage={setMessage}
        setMessages={setMessages}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        setShowPlacholder={setShowPlacholder}
        setAutoScroll={setAutoScroll}
        inputRef={inputRef}
        showPlaceholder={showPlaceholder}
        scrollDirection={scrollDirection}
        isIntersecting={isIntersecting}
      />
    </div>
  );
};

export default Chat;
