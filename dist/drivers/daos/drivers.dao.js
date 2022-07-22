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
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
class DriversDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.driverSchema = new this.Schema({
            _id: String,
            firstname: String,
            lastName: String,
            secondLastName: String,
            drivingLicense: Number,
            phoneNumber: Number,
            daysOff: String,
            status: String,
        }, { id: false });
        this.Driver = mongoose_service_1.default.getMongoose().model('Drivers', this.driverSchema);
        log('Created new instance of DriversDao');
    }
    addDriver(driverFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const driverId = shortid_1.default.generate();
            const driver = new this.Driver(Object.assign({ _id: driverId }, driverFields));
            yield driver.save();
            return driverId;
        });
    }
    getDriverBydrivingLicense(license) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Driver.findOne({ drivingLicense: license }).exec();
        });
    }
    getDriverById(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Driver.findOne({ _id: driverId }).populate('Driver').exec();
        });
    }
    getDrivers(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Driver.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    updateDriverById(driverId, driverFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDriver = yield this.Driver.findOneAndUpdate({ _id: driverId }, { $set: driverFields }, { new: true }).exec();
            return existingDriver;
        });
    }
    removeDriverById(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Driver.deleteOne({ _id: driverId }).exec();
        });
    }
}
exports.default = new DriversDao();
