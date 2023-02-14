import { Response } from 'express'

export const general = (res: Response, response: { status: number, upload: any}): void => {
    const entries: any[][] = Object.entries(response.upload.content)
    entries.forEach(entry => res.status(response.status).type(entry[0]).send(entry[1]))    
} 

export const serverError = (res: Response, error: any): void => {
    let code = 'ServerError'
    let message = 'Server has encountered an unexpected error.'
    if (error.code) code = error.code
    if (error.message) message = error.message
    res.status(500).send({ code, message })
}