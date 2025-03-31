import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full overflow-hidden'>
      <div className='relative w-full flex flex-col items-center'>
        <div className='absolute bottom-2 text-center text-white text-xs'>
          © {currentYear} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
