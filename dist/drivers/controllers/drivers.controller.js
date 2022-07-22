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
// we import our newly created driver services
const drivers_service_1 = __importDefault(require("../services/drivers.service"));
// we use debug with a custom context as described in Part 1
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:drivers-controller');
class DriversController {
    listDrivers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const drivers = yield drivers_service_1.default.list(100, 0);
            res.status(200).send(drivers);
        });
    }
    getDriverById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield drivers_service_1.default.readById(req.body.id);
            res.status(200).send(driver);
        });
    }
    createDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const driverId = yield drivers_service_1.default.create(req.body);
            res.status(201).send({ id: driverId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield drivers_service_1.default.patchById(req.body.id, req.body));
            res.status(201).send("Driver's data patched succesfully");
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield drivers_service_1.default.putById(req.body.id, req.body));
            res.status(201).send("Driver's data updated succesfully");
        });
    }
    removeDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield drivers_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new DriversController();
