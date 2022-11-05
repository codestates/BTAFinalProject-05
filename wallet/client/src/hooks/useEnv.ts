// example -> keys: ['API_KEY', 'PASSWORD'];
export const useEnv = (keys: string[], prefix = 'REACT_APP_') => {
    const value = keys.map((key) => process.env[`${prefix}${key}`] || '')
    return keys.map((key) => process.env[`${prefix}${key}`] || '')
}
