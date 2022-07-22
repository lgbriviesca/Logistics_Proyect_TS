import express from 'express';
import DriversService from '../services/drivers.service';
import debug from 'debug';
import driversService from '../services/drivers.service';

const log: debug.IDebugger = debug('app:drivers-controller');

class DriversMiddleware {
  async validateRequiredDriverBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.firstname &&
      req.body.lastName &&
      req.body.drivingLicense
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields first name, lastname and driving license`,
      });
    }
  }

  async validateSameDrivingLicenseDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const driver = await DriversService.getDriverByLicense(req.body.license);
    if (driver) {
      res.status(400).send({ error: `Driver license already exists` });
    } else {
      next();
    }
  }

  async validateDriverExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const driver = await driversService.readById(req.params.driverId);
    if (driver) {
      next();
    } else {
      res.status(404).send({
        error: `Driver ${req.params.driverId} not found`,
      });
    }
  }

  async extractDriverId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.driverId;
    next();
  }
}

export default new DriversMiddleware();
