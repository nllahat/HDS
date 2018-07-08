import HealthBuffer from './healthBuffer';
import settings from '../config/settings';

const buffersMap = {};

for (const service of settings.servicesList) {
    buffersMap[service.uri] = new HealthBuffer(service.name, settings.bufferLimit);
}

export const getStatuses = () => {
    let result = [];

    for (const serviceUrl in buffersMap) {
        result.push({serviceUrl, status: buffersMap[serviceUrl].getLastStatus()});
    }

    return result;
};

export const getAvailabilityPercentage = () => {
    let result = [];

    for (const serviceUrl in buffersMap) {
        result.push({serviceUrl, availability: buffersMap[serviceUrl].calcAvailabilityPercentage()});
    }

    return result;
};

export const updateServiceBuffer = (serviceUrl, isOk, code) => {
    if (!buffersMap || !buffersMap[serviceUrl]) {
        console.error(`Cannot find buffer for service ${serviceUrl}`);
    } else {
        buffersMap[serviceUrl].logStatus(isOk, code);
    }
};
