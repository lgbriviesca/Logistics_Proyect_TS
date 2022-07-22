"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversRoutes = void 0;
const express_validator_1 = require("express-validator");
const common_routes_config_1 = require("../common/common.routes.config");
const drivers_controller_1 = __importDefault(require("./controllers/drivers.controller"));
const drivers_middleware_1 = __importDefault(require("./middleware/drivers.middleware"));
class DriversRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'DriversRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/drivers`)
            .get(drivers_controller_1.default.listDrivers)
            .post((0, express_validator_1.body)('firstName').isString(), (0, express_validator_1.body)('lastName').isString(), (0, express_validator_1.body)('phoneNumber').isNumeric(), (0, express_validator_1.body)('drivingLicense').isNumeric(), (0, express_validator_1.body)('daysOff').isString(), (0, express_validator_1.body)('status').isString(), drivers_middleware_1.default.validateSameDrivingLicenseDoesntExist, drivers_controller_1.default.createDriver);
        this.app.param(`driverId`, drivers_middleware_1.default.extractDriverId);
        this.app
            .route(`/drivers/:driverId`)
            .all(drivers_middleware_1.default.validateDriverExists)
            .get(drivers_controller_1.default.getDriverById)
            .delete(drivers_controller_1.default.removeDriver);
        this.app.put(`/drivers/:driverId`, [
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('phoneNumber').isNumeric(),
            (0, express_validator_1.body)('drivingLicense').isNumeric(),
            (0, express_validator_1.body)('daysOff').isString(),
            (0, express_validator_1.body)('status').isString(),
            drivers_controller_1.default.put,
        ]);
        this.app.patch(`/drivers/:driverId`, [
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('phoneNumber').isNumeric(),
            (0, express_validator_1.body)('drivingLicense').isNumeric(),
            (0, express_validator_1.body)('daysOff').isString(),
            (0, express_validator_1.body)('status').isString(),
            drivers_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.DriversRoutes = DriversRoutes;
