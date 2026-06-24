import {TinyEmitter} from 'tiny-emitter';
import {Keys, readString, storeString} from './Storage';

const IS_AUTHENTICATED_KEY = 'is-authenticated';

export const GlobalState: {
  isAuthenticated: boolean;
} = {
  isAuthenticated: false,
};
export const emitter = new TinyEmitter();

export const initializationComplete = (async () => {
  GlobalState.isAuthenticated =
    (await readString(Keys.IS_AUTHENTICATED)) === 'true';
})();

export async function setIsAuthenticated(
  value: boolean,
  persist: boolean = true,
) {
  GlobalState.isAuthenticated = value;
  if (persist) {
    await storeString(Keys.IS_AUTHENTICATED, value.toString());
  }
  emitter.emit(IS_AUTHENTICATED_KEY, value);
}

export const onIsAuthenticated = (callback: (event: boolean) => void) => {
  emitter.on(IS_AUTHENTICATED_KEY, callback);
  return () => {
    emitter.off(IS_AUTHENTICATED_KEY, callback);
  };
};
