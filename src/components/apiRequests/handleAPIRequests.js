import * as globalHealthBuffers from '../../models/globalHealthBuffers';

export const getServiceStatuses = () => {
    return globalHealthBuffers.getStatuses();
};

export const getServicesAvailability = () => {
    return globalHealthBuffers.getAvailabilityPercentage();
};
