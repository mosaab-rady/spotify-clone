import Head from 'next/head';
import Center from '../components/Center';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
// import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-black h-screen  overflow-hidden'>
      <Head>
        <title>Spotify</title>
        <link
          rel='icon'
          href='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'
        />
      </Head>
      <main className='flex w-full'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0 '>
        <Player />
      </div>
    </div>
  );
}
