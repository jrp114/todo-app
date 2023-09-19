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
        // full screen
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
          {/* outer layer */}
          <div
            ref={outer}
            className="flex flex-col min-h-full items-center justify-center"
          >
            {/* container */}
            <div className="bg-white p-6 text-lg">
              {/* main dialog */}
              {message}
              <div className="flex justify-end pt-4 gap-x-4">
                {/* action buttons */}
                {actions.map((action, i) => (
                  <Button
                    key={`action-${i}`}
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
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
