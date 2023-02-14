"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.general = void 0;
const general = (res, response) => {
    const entries = Object.entries(response.upload.content);
    entries.forEach(entry => res.status(response.status).type(entry[0]).send(entry[1]));
};
exports.general = general;
const serverError = (res, error) => {
    let code = 'ServerError';
    let message = 'Server has encountered an unexpected error.';
    if (error.code)
        code = error.code;
    if (error.message)
        message = error.message;
    res.status(500).send({ code, message });
};
exports.serverError = serverError;
