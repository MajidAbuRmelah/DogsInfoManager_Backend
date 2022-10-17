import { Request, Response, NextFunction } from 'express';
import DataManager from '../config/dataManager';
import { IsJSONDataValid } from '../config/validationHelper';
import Dog from '../models/dog';

let dataManager: DataManager = new DataManager();

const addDog = async (request: Request, response: Response, next: NextFunction) => {
    if (!IsJSONDataValid(request.body)) {
        return response.status(400).json({});
    }
    let statementResult = dataManager.run("INSERT INTO `dogs` (`name`, `age`, `breed`, `gender`) VALUES (?, ?, ?, ?)",
                                          [request.body.name, request.body.age, request.body.breed, request.body.gender]);
    return response.status(200).json({
        insertID: statementResult.lastInsertRowid
    });
};

const updateDog = async (request: Request, response: Response, next: NextFunction) => {
    if (!IsJSONDataValid(request.body)) {
        return response.status(400).json({});
    }
    dataManager.run("UPDATE `dogs` SET `name` = ?, `age` = ?, `breed` = ?, `gender` = ? WHERE `id` = ?",
                    [request.body.name, request.body.age, request.body.breed, request.body.gender, request.params.id]);
    return response.status(200).json({});
};

const getDogs = async (request: Request, response: Response, next: NextFunction) => {
    let result = dataManager.get("SELECT * FROM `dogs`", [], true);
    return response.status(200).json({
        dogs: result
    });
};

const getDog = async (request: Request, response: Response, next: NextFunction) => {
    let result = dataManager.get("SELECT * FROM `dogs` WHERE `id` = ?", [Number(request.params.id)]);
    return response.status(200).json({
        dog: new Dog(result.id, result.name, result.age, result.breed, result.gender)
    });
};

const deleteDog = async (request: Request, response: Response, next: NextFunction) => {
    dataManager.run("DELETE FROM `dogs` WHERE `id` = ?", [request.params.id]);
    return response.status(200).json({});
};

export default { addDog, updateDog, getDogs, getDog, deleteDog };