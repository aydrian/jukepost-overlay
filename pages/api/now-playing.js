import { getUsersNowPlaying } from "@lib/spotify";

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
    images: response.item.album.images,
    isPlaying: response.is_playing
  };

  return res.status(200).json(song);
};

export default handler;

/**
 {
  timestamp: 1640725985176,
  context: {
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/4kAqBBEZQsBIXMIJl6u8tO'
    },
    href: 'https://api.spotify.com/v1/playlists/4kAqBBEZQsBIXMIJl6u8tO',
    type: 'playlist',
    uri: 'spotify:playlist:4kAqBBEZQsBIXMIJl6u8tO'
  },
  progress_ms: 68220,
  item: {
    album: {
      album_type: 'album',
      artists: [Array],
      available_markets: [],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/0rBFpBCAd3bdxlum9vxZbF',
      id: '0rBFpBCAd3bdxlum9vxZbF',
      images: [Array],
      name: 'White',
      release_date: '2020-06-27',
      release_date_precision: 'day',
      total_tracks: 31,
      type: 'album',
      uri: 'spotify:album:0rBFpBCAd3bdxlum9vxZbF'
    },
    artists: [ [Object] ],
    available_markets: [],
    disc_number: 1,
    duration_ms: 139500,
    explicit: false,
    external_ids: { isrc: 'QZHN72090867' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/7kwchQm24BpoqArez7z365'
    },
    href: 'https://api.spotify.com/v1/tracks/7kwchQm24BpoqArez7z365',
    id: '7kwchQm24BpoqArez7z365',
    is_local: false,
    name: 'Beauty for Sale',
    popularity: 30,
    preview_url: null,
    track_number: 20,
    type: 'track',
    uri: 'spotify:track:7kwchQm24BpoqArez7z365'
  },
  currently_playing_type: 'track',
  actions: { disallows: { resuming: true } },
  is_playing: true
}
 */
