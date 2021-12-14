import { ChevronDownIcon } from '@heroicons/react/solid';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
  'from-red-500',
  'from-blue-500',
  'from-green-500',
  'from-yellow-500',
  'from-orange-500',
  'from-amber-500',
  'from-emerald-500',
];

export default function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (playlistId !== null) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.log('Something went wrong' + err);
        });
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide '>
      <header className='absolute top-5 right-8'>
        {session ? (
          <div
            onClick={signOut}
            className='flex items-center text-white
          bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'
          >
            <img
              className='rounded-full w-10 h-10'
              src={session?.user.image}
              alt=''
            />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className='w-5 h-5 ' />
          </div>
        ) : (
          <div
            className='flex items-center text-white
          bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 px-4 capitalize'
          >
            <Link href={'/login'}>
              <h2>log in to your account</h2>
            </Link>
          </div>
        )}
      </header>

      {playlist ? (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white w-full p-8 `}
        >
          <img
            className='h-44 w-44 shadow-2xl'
            src={playlist?.images?.[0]?.url}
            alt=''
          />
          <div>
            <p className='uppercase'>playlist</p>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
              {playlist?.name}
            </h1>
          </div>
        </section>
      ) : (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white w-full p-8 `}
        ></section>
      )}

      <Songs />
    </div>
  );
}
