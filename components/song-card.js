export default function SongCard({ song }) {
  return (
    <div class="bg-white p-2 rounded-xl shadow-xl flex items-center justify-between m-2">
      <div class="flex space-x-6 items-center">
        <img src={song.images[1].url} class="w-auto h-16 rounded-lg" />
        <div>
          <p class="font-semibold text-base">{song.title}</p>
          <p class="font-semibold text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      <div class="flex space-x-2 items-center"></div>
    </div>
  );
}
