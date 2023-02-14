"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./docs/routes"));
const routes_2 = __importDefault(require("./apis/routes"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
(0, mongodb_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/docs/v1', express_1.default.static(path_1.default.join(__dirname, '/docs/routes/assets')));
app.use('/docs', routes_1.default);
app.use('/apis/v1', routes_2.default);
app.use((err, req, res, next) => {
    let error;
    if (typeof err === 'string')
        error = { status: 400, upload: { code: 'Failed', message: err } };
    else
        error = { status: 500, upload: { code: 'Failed', message: err.message } };
    res.status(error.status).send(error.upload);
});
exports.default = app;
