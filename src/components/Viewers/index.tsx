import { useEffect, useState } from 'react';

import { RiRadioButtonLine as OnlineIcon } from 'react-icons/ri';

import generateAvatar from '@/utils/generateAvatar';

import User from '@/types/user.types';

import styles from './style.module.css';
import Image from 'next/image';

type Props = {
  hidden: boolean;
};

const Viewers = ({ hidden }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const image = await generateAvatar();

      setUsers([
        { name: 'user1', id: '1', image: image },
        { name: 'user2', id: '2', image: image },
        { name: 'user3', id: '3', image: image },
        { name: 'user4', id: '4', image: image },
        { name: 'user5', id: '5', image: image },
        { name: 'user6', id: '6', image: image },
        { name: 'user7', id: '7', image: image },
      ]);
    })();
  }, []);

  return (
    <div className={styles.viewers} hidden={hidden}>
      <header className={styles.viewersHeader}>
        <h1>Viewers</h1>
        <div className={styles.viewersHeaderInfo}>
          {users.length} <OnlineIcon />
        </div>
      </header>
      <ul className={styles.viewersList}>
        {users.map(user => (
          <li key={user.id} className={styles.viewersItem}>
            <div className={styles.viewerAvatar}>
              <Image
                width={18}
                height={18}
                src={user.image}
                alt={`Avatar ${user.name}`}
              />
            </div>
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Viewers;
