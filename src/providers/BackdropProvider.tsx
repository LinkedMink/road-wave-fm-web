import { FunctionComponent, createContext, useCallback, useState } from "react";
import { LoadingBackdrop, LoadingBackdropProps } from "../components/styled/LoadingBackdrop";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export type BackdropProviderState = {
  setBackdrop: (percentComplete: number | null) => void;
  clearBackdrop: () => void;
};

export const BackdropContext = createContext<BackdropProviderState>({
  setBackdrop: () => {},
  clearBackdrop: () => {},
});

export const BackdropProvider: FunctionComponent<HasChildrenProps> = props => {
  const [loadingBackdropProps, setLoadingBackdropProps] = useState<LoadingBackdropProps>({
    isLoading: false,
  });

  const setBackdrop = useCallback(
    (percentComplete: number | null) => {
      setLoadingBackdropProps(prevState =>
        prevState.isLoading &&
        (percentComplete === null || percentComplete === prevState.percentComplete)
          ? prevState
          : {
              isLoading: true,
              percentComplete: percentComplete ? percentComplete : undefined,
            }
      );
    },
    [setLoadingBackdropProps]
  );

  const clearBackdrop = useCallback(() => {
    setLoadingBackdropProps(prevState =>
      prevState.isLoading
        ? {
            isLoading: false,
            percentComplete: undefined,
          }
        : prevState
    );
  }, [setLoadingBackdropProps]);

  return (
    <BackdropContext.Provider value={{ setBackdrop, clearBackdrop }}>
      <LoadingBackdrop {...loadingBackdropProps} />
      {props.children}
    </BackdropContext.Provider>
  );
};
