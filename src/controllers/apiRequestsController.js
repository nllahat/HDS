import { apiRequestsComponent } from '../components';

export const getHealthStatuses = (req, res, next) => {
    let result = apiRequestsComponent.handleAPIRequests.getServiceStatuses();

    res.status(200).json(result);
};

export const getServicesAvailability = (req, res, next) => {
    let result = apiRequestsComponent.handleAPIRequests.getServicesAvailability();

    res.status(200).json(result);
};
