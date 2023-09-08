import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from './components/shared/button';

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
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
      setShowModal: setShow,
    };
  }, []);
  return (
    <ModalContext.Provider value={state}>
      {show && (
        <div
          ref={outer}
          className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto"
        >
          <div className="bg-white p-4 rounded-md">
            <div className="text-lg">{message}</div>
            <div className="flex justify-end pt-4 gap-x-4">
              {actions.map((action) => (
                <Button
                  variant="primary"
                  onClick={() => {
                    action.handle();
                  }}
                >
                  {action.name}
                </Button>
              ))}
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
