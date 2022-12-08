"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsJSONDataValid = exports.IsNullOrEmpty = void 0;
const IsNullOrEmpty = (value) => {
    return !value || value === null || value.length === 0;
};
exports.IsNullOrEmpty = IsNullOrEmpty;
const IsJSONDataValid = (data) => {
    if (!data.hasOwnProperty("name") ||
        !data.hasOwnProperty("age") ||
        !data.hasOwnProperty("breed") ||
        !data.hasOwnProperty("gender") ||
        IsNullOrEmpty(data.name) ||
        IsNullOrEmpty(data.breed) ||
        Number(data.age) <= 0 ||
        Number(data.gender) > 1 ||
        Number(data.gender) < 0) {
        return false;
    }
    return true;
};
exports.IsJSONDataValid = IsJSONDataValid;
