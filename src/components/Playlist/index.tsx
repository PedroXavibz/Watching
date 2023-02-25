import Image from 'next/image';
import { useEffect, useState } from 'react';

import { BsFillPlayFill as PlayIcon } from 'react-icons/bs';

import styles from './style.module.css';

import generateAvatar from '@/utils/generateAvatar';

type Props = {
  hidden: boolean;
};

const Playlist = ({ hidden }: Props) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    (async () => {
      const image = await generateAvatar();

      setUrl(image);
    })();
  }, []);

  return (
    <div className={styles.playlist} hidden={hidden}>
      <ul className={styles.playlistList}>
        <li className={[styles.playlistItem, styles.active].join(' ')}>
          <Image width={120} height={90} src={url} alt="Thumbnail" />
          <div className={styles.videoDescription}>
            <h1 className={styles.videoTitle}>
              LKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            </h1>
            <div className={styles.videoDescriptionBottom}>
              <span className={styles.videoChannel}>Channel</span>
              <PlayIcon className={styles.playIcon} />
            </div>
          </div>
          <div className={styles.line} />
        </li>

        <li className={styles.playlistItem}>
          <Image width={120} height={90} src={url} alt="Thumbnail" />
          <div className={styles.videoDescription}>
            <h1 className={styles.videoTitle}>
              LKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            </h1>
            <div className={styles.videoDescriptionBottom}>
              <span className={styles.videoChannel}>Channel</span>
              <PlayIcon className={styles.playIcon} />
            </div>
          </div>
          <div className={styles.line} />
        </li>
      </ul>
    </div>
  );
};

export default Playlist;
