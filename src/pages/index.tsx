import Link from 'next/link';
import Image from 'next/image';
import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/react';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import useSocket from '@/hooks/useSocket';

import { useAuthContext } from '@/contexts/useAuth.context';

import { setUser, setRoomID } from '@/slices/userSlice';
import { setRoom } from '@/slices/roomSlice';
import getAvatar from '@/utils/generateAvatar';

import {
  FaRegUserCircle as UserIcon,
  FaGithub as GithubIcon,
} from 'react-icons/fa';
import { GrFormNextLink as LinkIcon } from 'react-icons/gr';
import {
  MdAlternateEmail as EmailIcon,
  MdDone as DoneIcon,
} from 'react-icons/md';
import {
  BiLock as IconLock,
  BiLockOpen as IconLockOpen,
  BiUser as userIconInput,
} from 'react-icons/bi';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

import PageHead from '@/components/PageHead';
import Logo from '@/components/Logo';
import Container from '@/components/Container';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ModalLoad from '@/components/ModalLoad';

import User from '@/types/user.types';

import styles from '@/styles/Home.module.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [isEmptyUsername, setIsEmptyUsername] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  // const user = useAppSelector(state => state.user);

  const socket = useSocket({ enable: true });

  const router = useRouter();

  const { user, login } = useAuthContext();

  const submitSiginForm: FormEventHandler = e => {
    e && e.preventDefault();
    setIsEmptyEmail(false);
    setIsEmptyPassword(false);

    !email && setIsEmptyEmail(true);
    !password && setIsEmptyPassword(true);

    // TODO user sign in with email and password
  };

  const submitCreateRoom: FormEventHandler = async e => {
    e && e.preventDefault();
    setIsEmptyUsername(false);

    if (username) {
      const id = crypto.randomUUID().split('-').join('');
      const name = username;
      const image = await getAvatar();

      const newUser: User = { anonymous: true, id, name, image };

      login(newUser);
      // dispatch(setUser(newUser));
      setLoading(true);

      socket.createRoom(newUser);
    } else {
      setIsEmptyUsername(true);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  /* useEffect(() => {
    if (socket.room) {
      dispatch(setRoom(socket.room));
      dispatch(setRoomID(socket.room.id));
      router.push({
        pathname: '/room',
        query: {
          id: socket.room.id,
        },
      });
    }
  }, [socket.room]); */

  return (
    <>
      <PageHead title="Watching" />
      <Container>
        {loading ? (
          <ModalLoad>
            <div className={styles.modalAvatar}>
              <Image width={128} height={128} src={user?.image} alt="Avatar" />
            </div>
            <span className={styles.modalTitle}>{user?.name}</span>
            <h2 className={styles.modalText}>Creating room</h2>
          </ModalLoad>
        ) : (
          <>
            <Logo />

            <div className={styles.container__login__createRoom}>
              <div className={styles.container__login}>
                <UserIcon className={styles.userIcon} />

                <div className={[styles.title, styles.item].join(' ')}>
                  <span className={styles.line} />
                  <span className={styles.text}>SIGN IN</span>
                  <span className={styles.line} />
                </div>

                <Link href="/user/signup" className={styles.link}>
                  Create account <LinkIcon className={styles.link_icon} />
                </Link>

                <form className={styles.form} onSubmit={submitSiginForm}>
                  <Input
                    Icon={EmailIcon}
                    type="email"
                    placeHolder="Email"
                    value={email}
                    setValue={setEmail}
                    isError={isEmptyEmail}
                  />

                  <Input
                    className={styles.item}
                    type={showPassword ? 'text' : 'password'}
                    placeHolder="Password"
                    value={password}
                    setValue={setPassword}
                    isError={isEmptyPassword}
                  >
                    {showPassword ? (
                      <Button
                        title="Hidden password"
                        type="button"
                        onClick={() => setShowPassword(false)}
                      >
                        <IconLockOpen />
                      </Button>
                    ) : (
                      <Button
                        title="Show password"
                        type="button"
                        onClick={() => setShowPassword(true)}
                      >
                        <IconLock />
                      </Button>
                    )}
                  </Input>

                  <Button
                    title="Sign in"
                    className={[styles.item, styles.btn].join(' ')}
                    type="submit"
                    onClick={() => submitSiginForm}
                  >
                    Sign In
                  </Button>

                  <div className={[styles.socialSignin, styles.item].join(' ')}>
                    <Button
                      title="Sign in with Google"
                      className={styles.btnSocial}
                      type="button"
                      onClick={() => signIn('google', { callbackUrl: '/room' })}
                    >
                      <GoogleIcon /> Sign in with Google
                    </Button>

                    <Button
                      title="Sign in with Github"
                      className={styles.btnSocial}
                      type="button"
                      onClick={() => signIn('github', { callbackUrl: '/room' })}
                    >
                      <GithubIcon /> Sign in with Github
                    </Button>
                  </div>
                </form>
              </div>

              <div className={styles.container__createRoom}>
                <div className={styles.createRoom}>
                  <h1 className={styles.title}>
                    Create a room without account
                  </h1>

                  <form className={styles.form} onSubmit={submitCreateRoom}>
                    <Input
                      className={styles.item}
                      Icon={userIconInput}
                      type="text"
                      placeHolder="Username"
                      value={username}
                      setValue={setUsername}
                      isError={isEmptyUsername}
                    />

                    <Button
                      title="Create Room"
                      className={[styles.item, styles.btn].join(' ')}
                      type="submit"
                      onClick={() => submitCreateRoom}
                    >
                      Create Room
                    </Button>
                  </form>
                </div>

                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <DoneIcon className={styles.doneIcon} color="#4ECB71" />
                    Watch youtube with your friends
                  </li>

                  <li className={styles.listItem}>
                    <DoneIcon className={styles.doneIcon} color="#4ECB71" />
                    Watch twitch with your friends
                  </li>

                  <li className={styles.listItem}>
                    <DoneIcon className={styles.doneIcon} color="#4ECB71" />
                    Talk to your friends in the integrated chat room
                  </li>

                  <li className={styles.listItem}>
                    <DoneIcon className={styles.doneIcon} color="#4ECB71" />
                    Create and organize contents into playlists
                  </li>

                  <li className={styles.listItem}>
                    <DoneIcon className={styles.doneIcon} color="#4ECB71" />
                    Synchronized player for video
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
