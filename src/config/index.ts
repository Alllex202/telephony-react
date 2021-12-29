// create file '.env' in root folder
// and write env variables with prefix 'REACT_APP_'
// example 'REACT_APP_MY_NEW_VARIABLE'

// if you use real env variables on PC then you should not use predix

export const serverApi = process.env.SERVER_API || process.env.REACT_APP_SERVER_API
