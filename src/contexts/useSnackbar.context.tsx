import { ReactNode, createContext, useState, useContext } from 'react';

const SnackbarContext = createContext({
  message: '',
  show: false,
  display: (message: string) => {},
  onClose: () => {},
});

type Props = {
  children: ReactNode;
};

const SnackbarProvider = ({ children }: Props) => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  let intervalID: any;

  const displayHandler = (message: string) => {
    setMessage(message);
    setShow(true);

    intervalID = setTimeout(() => {
      closeHandle();
    }, 3000);
  };

  const closeHandle = () => {
    clearTimeout(intervalID);
    setShow(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        message,
        show,
        display: displayHandler,
        onClose: closeHandle,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackBar = () => {
  return useContext(SnackbarContext);
};

export default SnackbarProvider;
