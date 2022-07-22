// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created driver services
import DriversService from '../services/drivers.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:drivers-controller');
class DriversController {
  async listDrivers(req: express.Request, res: express.Response) {
    const drivers = await DriversService.list(100, 0);
    res.status(200).send(drivers);
  }

  async getDriverById(req: express.Request, res: express.Response) {
    const driver = await DriversService.readById(req.body.id);
    res.status(200).send(driver);
  }

  async createDriver(req: express.Request, res: express.Response) {
    const driverId = await DriversService.create(req.body);
    res.status(201).send({ id: driverId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await DriversService.patchById(req.body.id, req.body));
    res.status(201).send("Driver's data patched succesfully");
  }

  async put(req: express.Request, res: express.Response) {
    log(await DriversService.putById(req.body.id, req.body));
    res.status(201).send("Driver's data updated succesfully");
  }

  async removeDriver(req: express.Request, res: express.Response) {
    log(await DriversService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new DriversController();
