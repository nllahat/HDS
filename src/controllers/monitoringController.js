import rpn from 'request-promise-native';
import settings from '../config/settings';
import { servicesResponse } from '../components';
import * as globalHealthBuffers from '../models/globalHealthBuffers';

const defaultOptions = {
    json: true, // automatically parses the JSON string in the response
    resolveWithFullResponse: true, // get the full response instead of just the body
    simple: false // boolean to set whether status codes other than 2xx should also reject the promise
};
let interval;

function logServiceHealthStatus(service) {
    return new Promise((resolve) => {
        rpn(Object.assign({ uri: service.uri }, defaultOptions))
            .then(response => {
                if (!response) {
                    return Promise.reject({error: {code: 'Missing response'}});
                }

                if (response.statusCode !== 200) {
                    return Promise.reject({error: {code: response.statusCode}});
                }

                return Promise.resolve(servicesResponse.handleResponseParsing.parseResponse(service, response.body));
            })
            .then(result => {
                globalHealthBuffers.updateServiceBuffer(service.uri, result, 200);

                resolve();
            })
            .catch(err => {
                globalHealthBuffers.updateServiceBuffer(service.uri, false, err && err.error && err.error.code);

                resolve();
            });
    });
}

function checkHealthStatuses() {
    let promises = [];

    for (const service of settings.servicesList) {
        promises.push(logServiceHealthStatus(service));
    }

    Promise.all(promises)
        .catch(err => {
            console.error(err);
        });
}

export const startHealthMonitor = () => {
    console.log('Starting health monitor...');
    interval = setInterval(checkHealthStatuses, settings.intervalValue);
};

export const stopHealthMonitor = () => {
    console.log('Stopping health monitor...');
    clearInterval(interval);
};
