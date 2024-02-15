import { FunctionComponent, useContext, useEffect } from "react";
import { BackdropContext } from "../../providers/BackdropProvider";

export const BootstrapContent: FunctionComponent = () => {
  const { setBackdrop, clearBackdrop } = useContext(BackdropContext);

  useEffect(() => {
    setBackdrop(null);
    return () => {
      clearBackdrop();
    };
  }, [setBackdrop, clearBackdrop]);

  return null;
};
