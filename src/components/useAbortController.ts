import { useRef } from 'react';

export default function useAbortController() {
  const ref = useRef<any>();
  ref.current = new AbortController();
  const signal = ref.current.signal;
  const abort = () => {
    ref.current.abort();
  };
  return { ref, abort, signal };
}
