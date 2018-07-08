import express from 'express';
import * as healthStatusController from '../controllers/apiRequestsController';

const router = express.Router();

router.get('/getHealthStatuses', healthStatusController.getHealthStatuses);
router.get('/getServicesAvailability', healthStatusController.getServicesAvailability);

export default router;
