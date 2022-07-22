import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';

import { CreateDriverDto } from '../dto/create.driver.dto';
import { PatchDriverDto } from '../dto/patch.driver.dto';
import { PutDriverDto } from '../dto/put.driver.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class DriversDao {
  Schema = mongooseService.getMongoose().Schema;

  driverSchema = new this.Schema(
    {
      _id: String,
      firstname: String,
      lastName: String,
      secondLastName: String,
      drivingLicense: Number,
      phoneNumber: Number,
      daysOff: String,
      status: String,
    },
    { id: false }
  );

  Driver = mongooseService.getMongoose().model('Drivers', this.driverSchema);

  constructor() {
    log('Created new instance of DriversDao');
  }

  async addDriver(driverFields: CreateDriverDto) {
    const driverId = shortid.generate();
    const driver = new this.Driver({
      _id: driverId,
      ...driverFields,
    });
    await driver.save();
    return driverId;
  }

  async getDriverBydrivingLicense(license: number) {
    return this.Driver.findOne({ drivingLicense: license }).exec();
  }

  async getDriverById(driverId: string) {
    return this.Driver.findOne({ _id: driverId }).populate('Driver').exec();
  }

  async getDrivers(limit = 25, page = 0) {
    return this.Driver.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateDriverById(
    driverId: string,
    driverFields: PatchDriverDto | PutDriverDto
  ) {
    const existingDriver = await this.Driver.findOneAndUpdate(
      { _id: driverId },
      { $set: driverFields },
      { new: true }
    ).exec();

    return existingDriver;
  }

  async removeDriverById(driverId: string) {
    return this.Driver.deleteOne({ _id: driverId }).exec();
  }
}

export default new DriversDao();
