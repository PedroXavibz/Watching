import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  BsFillShareFill as ShareIcon,
  BsDoorOpenFill as RoomIcon,
} from 'react-icons/bs';
import { MdContentCopy as CopyIcon } from 'react-icons/md';

import { useAppSelector } from '@/hooks/useApp';
import { useSnackBar } from '@/contexts/useSnackbar.context';

import Button from '../Button';
import Modal from '../Modal';
import SnackBar from '../SnackBar';

import styles from './style.module.css';

const VideoInfo = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { display } = useSnackBar();

  const video = useAppSelector(state => state.video);

  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    display('Link copied to clipboard');
  };

  useEffect(() => {
    const { href } = window.location;
    setRoomUrl(href);
  }, []);

  return (
    <div className={styles.videoInfo}>
      {showModal && (
        <Modal copyUrl={copyUrl} url={roomUrl} setShowModal={setShowModal} />
      )}

      <div className={styles.info}>
        <h2 className={styles.title}>
          <span>{video.current.info?.title}</span>
        </h2>
        <ul className={styles.infoList}>
          <li>
            URL: <Link href={video.current.url}>{video.current.url}</Link>
          </li>
          <li>Channel: {video.current.info?.channel}</li>
        </ul>
      </div>

      <div className={styles.room}>
        <h1>
          <RoomIcon /> Room: {roomUrl}
        </h1>
        <div className={styles.btns}>
          <Button
            onClick={() => setShowModal(true)}
            type="button"
            title="Share Room Url"
          >
            <ShareIcon />
          </Button>

          <Button type="button" title="Copy Room Url" onClick={() => copyUrl()}>
            <CopyIcon />
          </Button>
        </div>
      </div>
      <SnackBar />
    </div>
  );
};

export default VideoInfo;
