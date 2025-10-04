export const WINDOW_KEYS = [
  'menu',
  'start',
  'explorer',
  'browser',
  'vscode',
  'recycle',
  'app',
  'pictures',
  'notepad',
  'videos',
  'contactme',
  'linkedin',
  'github',
  'quickSettings'
];

export const MINIMIZABLE_WINDOWS = [
  'explorer',
  'browser',
  'vscode',
  'recycle',
  'app',
  'pictures',
  'notepad',
  'videos',
  'contactme'
];

export const createWindowState = (activeWindow = null) => {
  return WINDOW_KEYS.reduce((acc, key) => {
    acc[key] = key === activeWindow ? true : false;
    return acc;
  }, {});
};

export const createMinimizedState = () => {
  return MINIMIZABLE_WINDOWS.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});
};
