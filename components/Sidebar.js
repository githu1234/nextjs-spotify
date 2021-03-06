import React from 'react';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import spotifyApi from '../lib/spotify';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession;
  const [playlists, setplaylists] = useState([]);
  const [playlistId, setplaylistId] = useState(null);

  console.log(session);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setplaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlists);

  return (
    <div className=" text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white"
        >
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => {
          <p
            key={playlist.id}
            onClick={() => setplaylistId(playlistId)}
            className="cursor-pointer"
          >
            {playlist.name}
          </p>;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
