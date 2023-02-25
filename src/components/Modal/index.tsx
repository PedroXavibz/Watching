import { Dispatch, SetStateAction } from 'react';

import {
  AiOutlineClose as CloseIcon,
} from 'react-icons/ai';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

import Button from '../Button';

import styles from './style.module.css';

type Props = {
  url: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  copyUrl: () => void;
};

const Modal = ({ url, setShowModal, copyUrl }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h1>Share</h1>
          <Button
            title="Close"
            onClick={() => setShowModal(false)}
            className={styles.btn}
            type="button"
          >
            <CloseIcon />
          </Button>
        </header>

        <ul className={styles.list}>
          <li title="Whatsapp" className={styles.item}>
            <WhatsappShareButton url={url}>
              <WhatsappIcon round={true} />
              <span>Whatsapp</span>
            </WhatsappShareButton>
          </li>

          <li title="Facebook" className={styles.item}>
            <FacebookShareButton url={url}>
              <FacebookIcon round={true} />
              <span>Facebook</span>
            </FacebookShareButton>
          </li>

          <li title="Telegram" className={styles.item}>
            <TelegramShareButton url={url}>
              <TelegramIcon round={true} />
              <span>Telegram</span>
            </TelegramShareButton>
          </li>

          <li title="Twitter" className={styles.item}>
            <TwitterShareButton url={url}>
              <TwitterIcon round={true} />
              <span>Twitter</span>
            </TwitterShareButton>
          </li>

          <li title="Email" className={styles.item}>
            <EmailShareButton url={url}>
              <EmailIcon round={true} />
              <span>Email</span>
            </EmailShareButton>
          </li>
        </ul>

        <div className={styles.url}>
          <input value={url}/>
          <Button
            onClick={() => copyUrl()}
            title="Copy URL"
            className={styles.btnCopy}
            type="button"
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
