type Video = {
  id: string;
  url: string;
  host: string;
  load: boolean,
  info?: {
    title: string;
    channel: string;
  };
};

export default Video;
