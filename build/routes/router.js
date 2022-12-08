"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
const router = express_1.default.Router();
router.get("/", controller_1.default.root);
router.post("/dog", controller_1.default.addDog);
router.put("/dog/:id", controller_1.default.updateDog);
router.get("/dogs", controller_1.default.getDogs);
router.get("/dog/:id", controller_1.default.getDog);
router.delete("/dog/:id", controller_1.default.deleteDog);
module.exports = router;
