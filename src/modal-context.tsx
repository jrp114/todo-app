import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { useAuthContext } from './auth-context';
import { Button, useOutsideClick } from './components';

interface ModalContextProps {
  setModal: (args: SetModalProps) => void;
}

interface ModalContextProviderProps {
  children: React.ReactNode;
}

interface Action {
  name: string;
  handle: () => void;
}

interface SetModalProps {
  show?: boolean;
  header?: string;
  message?: React.ReactNode | string;
  actions?: Array<Action>;
  noCancelButton?: boolean;
}

interface ModalState {
  show: boolean;
  header: string;
  message: React.ReactNode | string;
  actions: Array<Action>;
  cancel: boolean;
}

const initialState: ModalState = {
  show: false,
  header: '',
  message: '',
  actions: [],
  cancel: false,
};

const reducer = (
  state: ModalState,
  action: {
    type: string;
    value: boolean | string | React.ReactNode | Array<Action>;
  },
) => {
  switch (action.type) {
    case 'show':
      return Object.assign({}, state, { show: action.value });
    case 'header':
      return Object.assign({}, state, { header: action.value });
    case 'message':
      return Object.assign({}, state, { message: action.value });
    case 'actions':
      return Object.assign({}, state, { actions: action.value });
    case 'cancel':
      return Object.assign({}, state, { cancel: action.value });
    default:
      return state;
  }
};

const ModalContext = createContext<ModalContextProps>(undefined);

export const ModalProvider = ({ children }: ModalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { session } = useAuthContext();
  const outer = useRef<any>();
  useOutsideClick(outer, () => dispatch({ type: 'show', value: false }));

  useEffect(() => {
    if (!session) {
      dispatch({ type: 'show', value: false });
    }
  }, [session]);
  const setModal = useCallback((args: SetModalProps) => {
    if (args.show === false) {
      dispatch({ type: 'show', value: args.show });
      return;
    }
    dispatch({ type: 'header', value: args.header });
    dispatch({ type: 'message', value: args.message });
    dispatch({ type: 'actions', value: args.actions });
    dispatch({ type: 'cancel', value: !args.noCancelButton });
    dispatch({ type: 'show', value: true });
  }, []);
  const value = useMemo(() => {
    return {
      setModal,
    };
  }, []);
  return (
    <ModalContext.Provider value={value}>
      {state.show && (
        // full screen
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
          {/* outer layer */}
          <div
            ref={outer}
            className="flex min-h-full flex-col items-center justify-center"
          >
            {/* container */}
            <div className="bg-white p-6 text-lg">
              {state.header !== '' ? (
                <div className="text-xl font-bold uppercase text-orange-700">
                  {state.header}
                </div>
              ) : (
                ''
              )}
              {/* main dialog */}
              {state.message}
              <div className="flex justify-end gap-x-4 pt-4">
                {/* action buttons */}
                {state.actions?.map((action: Action, i: number) => (
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
                {state.cancel && (
                  <Button
                    variant="secondary"
                    onClick={() => dispatch({ type: 'show', value: false })}
                  >
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
