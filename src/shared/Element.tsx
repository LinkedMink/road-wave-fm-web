import React, {
  ForwardedRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithChildren,
  RefAttributes,
} from 'react';
import { Link } from 'react-router-dom';

export const getLinkReference = (
  path: string,
): ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> => {
  const ref: ForwardRefRenderFunction<HTMLAnchorElement, Record<string, never>> = (
    props: PropsWithChildren<Record<string, never>>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => <Link ref={ref} to={path} {...props} />;

  return React.forwardRef<HTMLAnchorElement>(ref);
};
