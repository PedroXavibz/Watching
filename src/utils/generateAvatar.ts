import { createAvatar } from '@dicebear/core';
import { funEmoji, identicon, botttsNeutral, bottts } from '@dicebear/collection';

// Get user img
const avatars = [{
  img: funEmoji,
}, {
  img: identicon,
}, {
  img: botttsNeutral,
}, {
  img: bottts,
}];

const getRandom = (list: any) => list[Math.floor((Math.random() * list.length))];

const getAvatar = async () => {
  const avatar = getRandom(avatars);
  const seed = getRandom(['Felix', 'Aneka']);

  const img = await createAvatar(avatar.img, {
    size: 128,
    seed,
  }).toDataUri();

  return img;
};

export default getAvatar;
