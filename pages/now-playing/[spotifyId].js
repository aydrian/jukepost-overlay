import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

import SongCard from "@components/song-card";

const prisma = new PrismaClient();

export default function CurrentlyPlayingOverlay({ refreshToken }) {
  const [song, setSong] = useState({
    duration: 0,
    isPlaying: true,
    progress: 0
  });

  useEffect(() => {
    if (!song.isPlaying) {
      return;
    }
    const delay = song.duration - song.progress;
    console.log(
      `Current song: ${
        song.title || "No current song"
      }\nSetting timeout for ${delay}`
    );
    const timer = setTimeout(() => {
      console.log("Fetching current song.");
      fetch(`/api/now-playing?refreshToken=${refreshToken}`)
        .then((res) => res.json())
        .then((song) => setSong(song));
    }, delay);
    return () => clearTimeout(timer);
  }, [song, refreshToken]);

  return (
    <>
      {song.isPlaying ? (
        <SongCard song={song} />
      ) : (
        <div>
          No song playing. Please start Spotify and refresh the browser source.
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { spotifyId } = context.query;
  const account = await prisma.account.findUnique({
    select: {
      refresh_token: true
    },
    where: {
      provider_providerAccountId: {
        provider: "spotify",
        providerAccountId: spotifyId
      }
    }
  });

  return { props: { spotifyId, refreshToken: account?.refresh_token } };
}
