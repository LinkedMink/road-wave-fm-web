import { FunctionComponent, useDeferredValue } from "react";
import { useNavigation } from "react-router-dom";
import { LoadingBackdrop } from "./LoadingBackdrop";

export const NavigationBackdrop: FunctionComponent = () => {
  const navigation = useNavigation();
  const navigationState = useDeferredValue(navigation.state);

  const isLoading = navigationState === "loading" || navigationState === "submitting";
  return <LoadingBackdrop isLoading={isLoading} />;
};
