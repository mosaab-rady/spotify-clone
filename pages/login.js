import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center bg-black min-h-screen w-full'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'
        className='w-52 mb-5'
        alt=''
      />

      <div>
        <button
          className='bg-green-500 text-white p-5 rounded-full capitalize'
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
        >
          login with spotify
        </button>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   console.log(providers);

//   return {
//     props: {
//       providers,
//     },
//   };
// }
