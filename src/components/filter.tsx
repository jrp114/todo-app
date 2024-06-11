import { useCallback } from 'react';
import { InputField } from './input-field';
import useAbortController from './useAbortController';

interface FilterProps {
  // abortControllerRef: MutableRefObject<AbortController>;
  setFilterText: (filterText: string) => void;
}

export function Filter(props: FilterProps) {
  const debounce = useCallback((fn: () => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(), delay);
    };
  }, []);

  const { ref } = useAbortController();

  return (
    <div>
      <InputField
        label="Filter"
        onChange={(e) => {
          // in case the previous network request is ongoing
          // when the next one fires we want to abort
          if (ref?.current) {
            ref.current.abort();
          }
          debounce(async () => {
            props.setFilterText(e.target.value);
          }, 2000)();
        }}
        classes="bg-green-200 p-1"
      />
    </div>
  );
}
