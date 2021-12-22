import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

import SongCard from "../../components/song-card";

const prisma = new PrismaClient();

export default function CurrentlyPlayingOverlay({ refreshToken }) {
  const [song, setSong] = useState();

  const fetchSong = async () => {
    const song = await fetch(
      `/api/now-playing?refreshToken=${refreshToken}`
    ).then((res) => res.json());

    setSong(song);
  };

  useEffect(() => {
    fetchSong();
  }, []);

  useEffect(() => {
    if (song) {
      const timer = setTimeout(() => {
        fetchSong();
      }, song.duration - song.progress);
      return () => clearTimeout(timer);
    }
  }, [song]);

  return <>{song && <SongCard song={song} />}</>;
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

  return { props: { spotifyId, refreshToken: account.refresh_token } };
}
