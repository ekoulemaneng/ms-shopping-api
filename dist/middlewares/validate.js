"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_js_1 = __importDefault(require("validate.js"));
function convert(type, data, inputs) {
    Object.keys(data).forEach((key) => {
        if (inputs[type][key].type === 'boolean')
            data[key] = Boolean(data[key]);
        else if (inputs[type][key].type === 'number')
            data[key] = Number(data[key]);
        else if (inputs[type][key].type === 'integer')
            data[key] = Number(data[key]);
    });
}
function default_1(inputs) {
    return (req, res, next) => {
        try {
            let result;
            let params = req.params;
            let query = req.query;
            let body = req.body;
            if (typeof params !== 'undefined')
                convert('params', params, inputs);
            result = (0, validate_js_1.default)(params, inputs.params, { format: 'grouped' });
            if (result) {
                res.status(400).send({ code: 'InvalidInputsInPath', message: result });
                return;
            }
            if (typeof query !== 'undefined')
                convert('query', query, inputs);
            result = (0, validate_js_1.default)(query, inputs.query, { format: 'grouped' });
            if (result) {
                res.status(400).send({ code: 'InvalidInputInQuery', message: result });
                return;
            }
            if (typeof body !== 'undefined')
                convert('body', body, inputs);
            result = (0, validate_js_1.default)(body, inputs.body, { format: 'grouped' });
            if (result) {
                res.status(400).send({ code: 'InvalidInputInBody', message: result });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    };
}
exports.default = default_1;
