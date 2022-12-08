"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = __importDefault(require("../config/dataManager"));
const validationHelper_1 = require("../config/validationHelper");
const dog_1 = __importDefault(require("../models/dog"));
let dataManager = new dataManager_1.default();
const root = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).send("It's working!");
});
const addDog = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validationHelper_1.IsJSONDataValid)(request.body)) {
        return response.status(400).json({});
    }
    let statementResult = dataManager.run("INSERT INTO `dogs` (`name`, `age`, `breed`, `gender`) VALUES (?, ?, ?, ?)", [
        request.body.name,
        request.body.age,
        request.body.breed,
        request.body.gender,
    ]);
    return response.status(200).json({
        insertID: statementResult.lastInsertRowid,
    });
});
const updateDog = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validationHelper_1.IsJSONDataValid)(request.body)) {
        return response.status(400).json({});
    }
    dataManager.run("UPDATE `dogs` SET `name` = ?, `age` = ?, `breed` = ?, `gender` = ? WHERE `id` = ?", [
        request.body.name,
        request.body.age,
        request.body.breed,
        request.body.gender,
        request.params.id,
    ]);
    return response.status(200).json({});
});
const getDogs = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = dataManager.get("SELECT * FROM `dogs`", [], true);
    return response.status(200).json({
        dogs: result,
    });
});
const getDog = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = dataManager.get("SELECT * FROM `dogs` WHERE `id` = ?", [
        Number(request.params.id),
    ]);
    return response.status(200).json({
        dog: new dog_1.default(result.id, result.name, result.age, result.breed, result.gender),
    });
});
const deleteDog = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    dataManager.run("DELETE FROM `dogs` WHERE `id` = ?", [request.params.id]);
    return response.status(200).json({});
});
exports.default = { root, addDog, updateDog, getDogs, getDog, deleteDog };
