export const extractRoomID = (url: string) => {
  const regExp = /\?id=([a-z0-9\-]+)\&?/i;
  const match = url.match(regExp);

  if (match) {
    return match[match.length - 1];
  }

  return null;
};

export const extractID = (url: string): string | null => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    return null;
  }
};

export const extractHost = (url: string): string => {
  let result = '';
  let match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
  );
  if (match) {
    result = match[1];
    match = result.match(/^[^\.]+\.(.+\..+)$/);
    if (match) {
      result = match[1];
    }
  }

  return result;
};
