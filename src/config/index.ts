import dotenv from 'dotenv' 

dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

export const port: number = typeof process.env.PORT !== 'undefined' ? parseInt(process.env.PORT) : 3000
export const host: string = typeof process.env.HOST !== 'undefined' ? process.env.HOST : 'http://127.0.0.1:3000'
export const url_db: string = typeof process.env.URL_DB !== 'undefined' ? process.env.URL_DB : 'mongodb://127.0.0.1:27017/shoppingmsdb'