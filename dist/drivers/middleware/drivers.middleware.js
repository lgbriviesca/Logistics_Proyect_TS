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
const drivers_service_1 = __importDefault(require("../services/drivers.service"));
const debug_1 = __importDefault(require("debug"));
const drivers_service_2 = __importDefault(require("../services/drivers.service"));
const log = (0, debug_1.default)('app:drivers-controller');
class DriversMiddleware {
    validateRequiredDriverBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body &&
                req.body.firstname &&
                req.body.lastName &&
                req.body.drivingLicense) {
                next();
            }
            else {
                res.status(400).send({
                    error: `Missing required fields first name, lastname and driving license`,
                });
            }
        });
    }
    validateSameDrivingLicenseDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield drivers_service_1.default.getDriverByLicense(req.body.license);
            if (driver) {
                res.status(400).send({ error: `Driver license already exists` });
            }
            else {
                next();
            }
        });
    }
    validateDriverExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield drivers_service_2.default.readById(req.params.driverId);
            if (driver) {
                next();
            }
            else {
                res.status(404).send({
                    error: `Driver ${req.params.driverId} not found`,
                });
            }
        });
    }
    extractDriverId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.driverId;
            next();
        });
    }
}
exports.default = new DriversMiddleware();
