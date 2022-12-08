"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./routes/router"));
/*** Configure Router Settings ***/
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
// Parse the request.
app.use(express_1.default.urlencoded({ extended: false }));
// Takes care of JSON data.
app.use(express_1.default.json());
// Define API rules.
app.use((req, res, next) => {
    // Set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // Set the CORS headers
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    // Set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});
// Set routes
app.use("/", router_1.default);
// Handle errors.
app.use((request, response, next) => {
    const error = new Error("Not Found 404");
    return response.status(404).json({
        message: error.message,
    });
});
/*** Initalize Server ***/
const httpServer = http_1.default.createServer(app);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}.`));
