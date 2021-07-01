import React from 'react';
import { Link } from 'react-router-dom';

export const getLinkReference = (path: string) => {
  return React.forwardRef<HTMLAnchorElement>((props, ref) => (
    <Link innerRef={ref} to={path} {...props} />
  ));
};
