import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const ModalContext = createContext(undefined);

export const ModalProvider = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [actions, setActions] = useState(undefined);
  const outer = useRef();
  useEffect(() => {
    window.addEventListener('click', (event) => {
      if (outer.current === event.target) {
        setShow(false);
      }
    });
  }, []);
  const setModal = useCallback(({ message, actions }) => {
    setActions(actions);
    setShow(true);
    setMessage(message);
  }, []);
  const state = useMemo(() => {
    return {
      setModal,
    };
  }, []);
  return (
    <ModalContext.Provider value={state}>
      {show && (
        <div
          ref={outer}
          className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded-md">
            <div className="text-lg">{message}</div>
            <div className="flex justify-end pt-4 gap-x-4">
              {actions.map((action) => (
                <button
                  key={action.name}
                  className="bg-green-500 text-white p-1 rounded-md"
                  onClick={() => {
                    action.handle();
                    setShow(false);
                  }}
                >
                  {action.name}
                </button>
              ))}
              <button
                className="bg-red-500 text-white p-1 rounded-md"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
