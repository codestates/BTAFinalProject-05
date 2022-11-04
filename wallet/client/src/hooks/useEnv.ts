// example -> keys: ['API_KEY', 'PASSWORD'];
export const useEnv = (keys: string | string[], prefix = 'REACT_APP_') => {
    return typeof keys === 'string' ?
        process.env[`${prefix}${keys}`] || '' :
        keys.map((key) => process.env[`${prefix}${key}`] || '')
}
