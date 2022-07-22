import DriversDao from '../daos/drivers.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateDriverDto } from '../dto/create.driver.dto';
import { PutDriverDto } from '../dto/put.driver.dto';
import { PatchDriverDto } from '../dto/patch.driver.dto';

class DriversService implements CRUD {
  async create(resource: CreateDriverDto) {
    return DriversDao.addDriver(resource);
  }

  async deleteById(id: string): Promise<any> {
    return DriversDao.removeDriverById(id);
  }

  async list(limit: number, page: number) {
    return DriversDao.getDrivers(limit, page);
  }

  async patchById(id: string, resource: PatchDriverDto): Promise<any> {
    return DriversDao.updateDriverById(id, resource);
  }

  async putById(id: string, resource: PutDriverDto): Promise<any> {
    return DriversDao.updateDriverById(id, resource);
  }

  async readById(id: string) {
    return DriversDao.getDriverById(id);
  }

  async getDriverByLicense(license: number) {
    return DriversDao.getDriverBydrivingLicense(license);
  }
}

export default new DriversService();
