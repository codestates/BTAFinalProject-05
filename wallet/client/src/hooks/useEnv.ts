// example -> keys: ['API_KEY', 'PASSWORD'];
export const useEnv = (keys: string[], prefix = 'REACT_APP_') => {
    return keys.map((key) => process.env[`${prefix}${key}`] || '');
};
