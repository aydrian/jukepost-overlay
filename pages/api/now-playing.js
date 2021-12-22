import { getUsersNowPlaying } from "../../lib/spotify";

const handler = async (req, res) => {
  const { refreshToken } = req.query;
  const response = await getUsersNowPlaying(refreshToken).then((res) =>
    res.json()
  );

  const song = {
    title: response.item.name,
    artist: response.item.artists[0].name,
    album: response.item.album.name,
    duration: response.item.duration_ms,
    progress: response.progress_ms,
    images: response.item.album.images
  };

  return res.status(200).json(song);
};

export default handler;
