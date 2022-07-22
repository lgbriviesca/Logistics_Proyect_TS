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
const drivers_dao_1 = __importDefault(require("../daos/drivers.dao"));
class DriversService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.addDriver(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.removeDriverById(id);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.getDrivers(limit, page);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.updateDriverById(id, resource);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.updateDriverById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.getDriverById(id);
        });
    }
    getDriverByLicense(license) {
        return __awaiter(this, void 0, void 0, function* () {
            return drivers_dao_1.default.getDriverBydrivingLicense(license);
        });
    }
}
exports.default = new DriversService();
