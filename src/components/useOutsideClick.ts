import { RefObject, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClose = (e: any) => {
      if (
        (ref.current && !ref.current.contains(e.target)) ||
        e.key === 'Escape' ||
        ref.current === e.target
      ) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
  }, [ref]);
  return;
};

export default useOutsideClick;
