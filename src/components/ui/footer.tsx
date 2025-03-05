//import Image from 'next/image';
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full overflow-hidden'>
      <div className='relative w-full flex flex-col items-center'>
        {/* <Image
          src='/assets/images/ECEVer Pie Guinda.png'
          alt='Footer'
          width={1920}
          height={150}
          className='w-full h-auto max-h-[40px] object-cover'
          priority
        /> */}
        <div className='absolute bottom-2 text-center text-white text-xs'>
          © {currentYear} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
