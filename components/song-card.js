export default function SongCard({ song }) {
  return (
    <div className="bg-white p-2 rounded-xl shadow-xl flex items-center justify-between m-2">
      <div className="flex space-x-6 items-center">
        <img src={song.images[1].url} className="w-auto h-16 rounded-lg" />
        <div>
          <p className="font-semibold text-base">{song.title}</p>
          <p className="font-semibold text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      <div className="flex space-x-2 items-center"></div>
    </div>
  );
}
