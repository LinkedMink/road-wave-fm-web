import { LoadingState } from '../definitions/State';

export const isPending = (state: LoadingState) => state.isLoading && state.retryTimeout === null;
