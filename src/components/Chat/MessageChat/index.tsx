import Image from 'next/image';

import Linkify from 'react-linkify';
import { AiOutlineClockCircle as ClockIcon } from 'react-icons/ai';

import Message from '@/types/message.types';
import styles from './style.module.css';
import { MutableRefObject } from 'react';

type Props = {
  messages: Message[];
  userID: string;
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
  scrollTargetRef: (Node: HTMLElement) => void;
};

const MessageChat = ({
  messages,
  userID,
  messagesEndRef,
  scrollTargetRef,
}: Props) => (
  <ul ref={scrollTargetRef} className={styles.messageList}>
    {messages.map(message => (
      <li
        key={message.id}
        className={
          message.user.id === userID ? styles.userMessage : styles.message
        }
      >
        {message.user.id === userID ? (
          <div className={styles.userMessageText}>
            <div className={styles.userMessagePolygon}></div>
            <span className={styles.text}>
              <Linkify>{message.text}</Linkify>
            </span>
            <span className={styles.userMessageDate}>
              {message.date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <ClockIcon />
            </span>
          </div>
        ) : (
          <>
            <div className={styles.messageAvatar}>
              <div className={styles.avatar}>
                <Image
                  width={18}
                  height={18}
                  src={message.user.image}
                  alt={`Avatar ${message.user.name}`}
                />
              </div>
              <span className={styles.messageUsername}>
                @{message.user.name}
              </span>
            </div>

            <div className={styles.messageText}>
              <div className={styles.MessagePolygon}></div>
              <span className={styles.text}>{message.text}</span>
              <div className={styles.messageDate}>
                {message.date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                <ClockIcon />
              </div>
            </div>
          </>
        )}
      </li>
    ))}
    <div style={{ width: '2rem', height: '4rem' }} ref={messagesEndRef} />
  </ul>
);

export default MessageChat;
