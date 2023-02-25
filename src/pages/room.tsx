import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import useSocket from '@/hooks/useSocket';

import {extractRoomID} from '@/utils/handleUrl';

import { BsChat as ChatIcon } from 'react-icons/bs';
import { HiOutlineUserGroup as ViewersIcon } from 'react-icons/hi';
import { MdOutlinePlaylistPlay as PlaylistIcon } from 'react-icons/md';

import PageHead from '@/components/PageHead';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import VideoPlayer from '@/components/VideoPlayer';
import Chat from '@/components/Chat';
import Viewers from '@/components/Viewers';
import Playlist from '@/components/Playlist';
import VideoInfo from '@/components/VideoInfo';

import User from '@/types/user.types';

import styles from '@/styles/Room.module.css';

const Room = () => {
  const router = useRouter();
  const socket = useSocket({ enable: false });

  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const anonymousUser = useAppSelector(state => state.user);
  const room = useAppSelector(state => state.room);

  type ActiveTab = 'chat' | 'viewers' | 'playlist';
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (!session) {
      setCurrentUser(anonymousUser);
    } else {
      const roomID = extractRoomID(router.asPath);

      const name = session.user?.name || '';
      const image = session.user?.image || '';

      const user: User = {
        roomID,
        id: crypto.randomUUID().split('-').join(''),
        name,
        image,
      };

      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <PageHead title="Watching Room" />
      <Container>
        <Header />
        <Script
          src="https://www.youtube.com/player_api"
          strategy="beforeInteractive"
        />

        <main>
          <section className={styles.section__info}>
            <Logo />

            <div className={styles.section__info__btns}>
              <Button
                className={activeTab === 'chat' ? styles.activeTab : ''}
                type="button"
                title="Chat"
                onClick={() => setActiveTab('chat')}
              >
                Chat <ChatIcon />
              </Button>

              <Button
                className={activeTab === 'viewers' ? styles.activeTab : ''}
                type="button"
                title="Viewers"
                onClick={() => setActiveTab('viewers')}
              >
                Viewers <ViewersIcon />
              </Button>

              <Button
                className={activeTab === 'playlist' ? styles.activeTab : ''}
                type="button"
                title="Playlist"
                onClick={() => setActiveTab('playlist')}
              >
                Playlist <PlaylistIcon />
              </Button>
            </div>
          </section>

          <section
            className={styles.section__video_player__chat_viewers_playlist}
          >
            <div className={styles.video_player}>
              <VideoPlayer />
              <VideoInfo />
            </div>

            <div className={styles.chat_viewers_playlist}>
              <Chat hidden={activeTab !== 'chat'} />
              <Viewers hidden={activeTab !== 'viewers'} />
              <Playlist hidden={activeTab !== 'playlist'} />
            </div>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Room;
