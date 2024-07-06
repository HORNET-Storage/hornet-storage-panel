import { UserModel } from '@app/domain/UserModel';
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';

const testUser: UserModel = {
  id: 1,
  firstName: 'Chris',
  lastName: 'Johnson',
  userName: '@john1989',
  email: 'chris.johnson@altence.com',
};

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string => {
  return localStorage.getItem('accessToken') || 'bearerToken';
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem('user');

  try {
    return userStr ? JSON.parse(userStr) : testUser;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return testUser;
  }
};

export const persistRelayMode = (relayMode: 'unlimited' | 'smart'): void => {
  localStorage.setItem('relayMode', relayMode);
};

export const readRelayMode = (): 'unlimited' | 'smart' => {
  return (localStorage.getItem('relayMode') as 'unlimited' | 'smart') || 'unlimited'; // default to 'unlimited' if nothing is stored
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
