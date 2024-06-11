import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Maybe } from 'yup';
import { useAuthContext } from './auth-context';
import { Button, useOutsideClick } from './components';

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
  noCancelButton?: boolean;
}

const ModalContext = createContext<any>(undefined);

export const ModalProvider = ({ children }: ModalContextProps) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<React.ReactNode | string>('');
  const [actions, setActions] = useState<Array<Action>>([]);
  const [cancel, showCancel] = useState<Maybe<Boolean>>(false);
  const { session } = useAuthContext();
  const outer = useRef<any>();
  useOutsideClick(outer, () => setShow(false));

  useEffect(() => {
    if (!session) {
      setShow(false);
    }
  }, [session]);
  const setModal = useCallback(
    ({ message, actions, noCancelButton }: SetModalProps) => {
      setActions(actions);
      setShow(true);
      setMessage(message);
      showCancel(!noCancelButton);
    },
    [],
  );
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
            className="flex min-h-full flex-col items-center justify-center"
          >
            {/* container */}
            <div className="bg-white p-6 text-lg">
              {/* main dialog */}
              {message}
              <div className="flex justify-end gap-x-4 pt-4">
                {/* action buttons */}
                {actions?.map((action: Action, i: number) => (
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
                {cancel && (
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Cancel
                  </Button>
                )}
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
