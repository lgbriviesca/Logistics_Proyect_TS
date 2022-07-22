import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import { CommonRoutesConfig } from '../common/common.routes.config';
import DriversController from './controllers/drivers.controller';
import DriversMiddleware from './middleware/drivers.middleware';
import express from 'express';

export class DriversRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DriversRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/drivers`)
      .get(DriversController.listDrivers)
      .post(
        body('firstName').isString(),
        body('lastName').isString(),
        body('phoneNumber').isNumeric(),
        body('drivingLicense').isNumeric(),
        body('daysOff').isString(),
        body('status').isString(),
        DriversMiddleware.validateSameDrivingLicenseDoesntExist,
        DriversController.createDriver
      );

    this.app.param(`driverId`, DriversMiddleware.extractDriverId);
    this.app
      .route(`/drivers/:driverId`)
      .all(DriversMiddleware.validateDriverExists)
      .get(DriversController.getDriverById)
      .delete(DriversController.removeDriver);

    this.app.put(`/drivers/:driverId`, [
      body('firstName').isString(),
      body('lastName').isString(),
      body('phoneNumber').isNumeric(),
      body('drivingLicense').isNumeric(),
      body('daysOff').isString(),
      body('status').isString(),
      DriversController.put,
    ]);

    this.app.patch(`/drivers/:driverId`, [
      body('firstName').isString(),
      body('lastName').isString(),
      body('phoneNumber').isNumeric(),
      body('drivingLicense').isNumeric(),
      body('daysOff').isString(),
      body('status').isString(),
      DriversController.patch,
    ]);

    return this.app;
  }
}
