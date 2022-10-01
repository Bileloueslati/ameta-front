import { ComponentType, useState, Dispatch, SetStateAction } from "react";
import { useBooleanState } from "webrix/hooks";

export type InjectedModalProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const WithModal =
  <T,>(Component: ComponentType<T>) =>
  (props: T) => {
    const { value: isOpen, setTrue: open, setFalse: close } = useBooleanState();

    const allProps = { isOpen, open, close, ...props };

    return <Component {...allProps} />;
  };

export default WithModal;
