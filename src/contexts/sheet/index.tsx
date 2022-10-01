import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";
import { Sheet } from "../../__typescript/sheet";

type SheetContextProviderProps = PropsWithChildren & {
  sheet: Sheet;
};

const SheetContext = createContext<Sheet | null>(null);

export const SheetContextProvider: FunctionComponent<
  SheetContextProviderProps
> = ({ sheet, children }) => (
  <SheetContext.Provider value={sheet}>{children}</SheetContext.Provider>
);

export const useSheetContext = () => {
  const sheet = useContext(SheetContext);

  if (!sheet)
    throw new Error("You must wrappe component with <SheetContextProvider />");

  return sheet;
};

export default SheetContext;
