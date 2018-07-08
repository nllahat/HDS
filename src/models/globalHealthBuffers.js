/**
 * This GlobalHealthBuffers is a singleton object.
 * It creates a buffer for each service listed in settings.js
 * Each buffer holds its service statuses logged during the last one hour
 * The buffers stored in a map (key is the service uri)
 */
import HealthBuffer from './healthBuffer';
import settings from '../config/settings';

const buffersMap = {};

for (const service of settings.servicesList) {
    buffersMap[service.uri] = new HealthBuffer(service.name, settings.bufferLimit);
}

/**
 * This function logs the status (isOk) and code to the service buffer by the serviceUri
 * @param serviceUri
 * @param isOk
 * @param code
 */
export const updateServiceBuffer = (serviceUri, isOk, code) => {
    if (!buffersMap || !buffersMap[serviceUri]) {
        console.error(`Cannot find buffer for service ${serviceUri}`);
    } else {
        buffersMap[serviceUri].logStatus(isOk, code);
    }
};

/**
 * For each service in the buffersMap - get the last status the has logged to the buffer
 * @returns {Array}
 */
export const getLastStatuses = () => {
    let result = [];

    for (const serviceUrl in buffersMap) {
        result.push({serviceUrl, status: buffersMap[serviceUrl].getLastStatus()});
    }

    return result;
};

/**
 * For each service in the buffersMap - get it's availability percentages
 * @returns {Array}
 */
export const getAvailabilityPercentage = () => {
    let result = [];

    for (const serviceUrl in buffersMap) {
        result.push({serviceUrl, availability: buffersMap[serviceUrl].calcAvailabilityPercentage()});
    }

    return result;
};
