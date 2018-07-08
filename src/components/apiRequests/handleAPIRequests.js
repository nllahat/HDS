import * as GlobalHealthBuffers from '../../models/globalHealthBuffers';

/**
 * This function gets the last statuses from each service buffer in the GlobalHealthBuffers
 * @returns {Array}
 */
export const getServiceStatuses = () => {
    return GlobalHealthBuffers.getLastStatuses();
};

/**
 * This function calcs the availability percentages on each service buffer in the GlobalHealthBuffers
 * @returns {Array}
 */
export const getServicesAvailability = () => {
    return GlobalHealthBuffers.getAvailabilityPercentage();
};
