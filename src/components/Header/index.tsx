import { FormEventHandler, useState } from 'react';

import { FaRegUserCircle as UserIcon } from 'react-icons/fa';
import { BiSearch as SearchIcon } from 'react-icons/bi';
import { MdVideoLibrary as VideoIcon } from 'react-icons/md';

import { setCurrentVideo } from '@/slices/videoSlice';
import { useAppDispatch } from '@/hooks/useApp';

import {extractID, extractHost} from '@/utils/handleUrl';

import Button from '../Button';

import Video from '@/types/video.type';

import styles from './style.module.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    const id = extractID(search);

    if (!id) setIsError(true);
    else {
      isError && setIsError(false);

      const host = extractHost(search);

      const video: Video = {
        id,
        url: search,
        host,
        load: true
      };

      dispatch(setCurrentVideo(video));

      setSearch('');
    }
  };

  const onFocus = () => {
    !isFocus && setIsFocus(true);
    isError && setIsError(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__nav_list}>
          <li className={styles.header__nav_item}>
            <Button title="User" type="button">
              <UserIcon className={styles.header__nav_icon} />
            </Button>
          </li>
          <li className={styles.header__nav_item}>
            <Button title="Favorite videos" type="button">
              <VideoIcon className={styles.header__nav_icon} />
            </Button>
          </li>
        </ul>
      </nav>

      <form
        onSubmit={onSubmit}
        className={[
          styles.header__search,
          isFocus ? styles.header__search_focus : '',
          isError ? styles.header__search_error : '',
        ].join(' ')}
      >
        <input
          onFocus={() => onFocus()}
          onBlur={() => setIsFocus(false)}
          placeholder={
            isError ? 'Check your URL' : 'Paste a link to a youtube video'
          }
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          className={[styles.input, isError ? styles.inputError : ''].join(' ')}
        />

        <Button title="Search" type="submit">
          <SearchIcon className={styles.header__search_btn} />
        </Button>
      </form>
    </header>
  );
};

export default Header;
