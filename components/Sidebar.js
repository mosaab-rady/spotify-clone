import {
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  SearchIcon,
  LibraryIcon,
  RssIcon,
} from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
// import Image from 'next/image';

export default function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        setPlaylistId(data.body.items[0].id);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div
      className='text-gray-500 p-5 text-xs lg:text-sm
    sm:min-w-[12rem] lg:min-w-[15rem] hidden md:inline-flex  border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen pb-36'
    >
      {/* <Image src={'/Spotify_logo.png'} width={200} height={80}></Image> */}
      <div className='space-y-4'>
        <button className='flex items-center space-x-2  hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p className='capitalize'>home</p>
        </button>
        <button className='flex items-center space-x-2  hover:text-white'>
          <SearchIcon className='w-5 h-5' />
          <p className='capitalize'>search</p>
        </button>
        <button className='flex items-center space-x-2  hover:text-white'>
          <LibraryIcon className='w-5 h-5' />
          <p className='capitalize'>your library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2  hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p className='capitalize'>creat playlist</p>
        </button>
        <button className='flex items-center space-x-2  hover:text-white'>
          <HeartIcon className='w-5 h-5 text-blue-500' />
          <p className='capitalize'>liked songs</p>
        </button>
        <button className='flex items-center space-x-2  hover:text-white'>
          <RssIcon className='w-5 h-5 text-green-500' />
          <p className='capitalize'>your eposides</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        {/* {playlists} */}
        {playlists?.map((playlist) => {
          return (
            <p
              key={playlist.id}
              className='cursor-pointer hover:text-white'
              onClick={() => {
                setPlaylistId(playlist.id);
              }}
            >
              {playlist.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}
