import { RouteComponentProps } from 'react-router-dom';

export interface IdParams {
  id: string;
}

export type RouteComponentIdProps = RouteComponentProps<IdParams>;
