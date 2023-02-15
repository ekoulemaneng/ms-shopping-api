import { Request, Response, NextFunction } from 'express'
import validate from 'validate.js'

function convert (type: string, data: any, inputs: any): void {
    Object.keys(data).forEach((key: string) => {
        if (inputs[type][key].type === 'boolean') data[key] = Boolean(data[key])
        else if (['integer', 'number'].includes(inputs[type][key].type)) data[key] = Number(data[key])
    })

}

export default function (inputs: any): ((req: Request, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let result
            let params = req.params
            let query = req.query
            let body = req.body
            if (typeof params !== 'undefined') convert('params', params, inputs)
            result = validate(params, inputs.params, { format: 'grouped' })
            if (result) {
                res.status(400).send({ code: 'InvalidInputsInPath', message: result })
                return
            }
            if (typeof query !== 'undefined') convert('query', query, inputs)
            result = validate(query, inputs.query, { format: 'grouped' })
            if (result) {
                res.status(400).send({ code: 'InvalidInputInQuery', message: result })
                return
            }
            if (typeof body !== 'undefined') convert('body', body, inputs)
            result = validate(body, inputs.body, { format: 'grouped' })
            if (result) {
                res.status(400).send({ code: 'InvalidInputInBody', message: result })
                return
            }
            next()
        } 
        catch (error) {
            console.error(error)
            next(error)
        }
    }
}