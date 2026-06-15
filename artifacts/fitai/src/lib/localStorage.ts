import { mockUser } from './mockData';

export const getLocalUser = () => {
  const user = localStorage.getItem('fitai_user');
  if (user) return JSON.parse(user);
  return null;
};

export const loginUser = (email: string) => {
  const user = { ...mockUser, email };
  localStorage.setItem('fitai_user', JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem('fitai_user');
};

export const getProgressLogs = () => {
  const logs = localStorage.getItem('fitai_progress_logs');
  if (logs) return JSON.parse(logs);
  return [];
};

export const addProgressLog = (log: any) => {
  const logs = getProgressLogs();
  logs.push({ ...log, id: `pl${Date.now()}` });
  localStorage.setItem('fitai_progress_logs', JSON.stringify(logs));
  return logs;
};
