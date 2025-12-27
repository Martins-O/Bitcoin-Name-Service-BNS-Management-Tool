import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { NETWORK, APP_NAME, APP_ICON } from './config';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export interface AuthOptions {
  onFinish?: (data: any) => void;
  onCancel?: () => void;
}

export const connectWallet = (options?: AuthOptions) => {
  showConnect({
    appDetails: {
      name: APP_NAME,
      icon: APP_ICON,
    },
    redirectTo: '/',
    onFinish: (data) => {
      window.location.reload();
      options?.onFinish?.(data);
    },
    onCancel: options?.onCancel,
    userSession,
  });
};

export const disconnectWallet = () => {
  userSession.signUserOut();
  window.location.reload();
};

export const getAddress = (): string | null => {
  if (!userSession.isUserSignedIn()) return null;
  const userData = userSession.loadUserData();
  return userData.profile.stxAddress.mainnet;
};

export const isAuthenticated = (): boolean => {
  return userSession.isUserSignedIn();
};
