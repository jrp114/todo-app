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

interface ModalContextProps {
  children: React.ReactNode;
}

interface Action {
  name: string;
  handle: () => void;
}

interface SetModalProps {
  message: React.ReactNode | string;
  actions: Array<Action>;
}

const ModalContext = createContext<any>(undefined);

export const ModalProvider = ({ children }: ModalContextProps) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<React.ReactNode | string>('');
  const [actions, setActions] = useState<Array<Action>>([]);
  const outer = useRef<any>();
  useEffect(() => {
    window.addEventListener('click', (event) => {
      if (outer.current === event.target) {
        setShow(false);
      }
    });
  }, []);
  const setModal = useCallback(({ message, actions }: SetModalProps) => {
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
                {actions.map((action: Action, i: number) => (
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