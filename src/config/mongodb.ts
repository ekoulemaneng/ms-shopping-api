import mongoose, { connect } from 'mongoose'
import { url_db } from './../config'

mongoose.set('strictQuery', false)

export default async function () {
    try {
        await connect(url_db)
        console.log('Successfully connected to database', url_db)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}