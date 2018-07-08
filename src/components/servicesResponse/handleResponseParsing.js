import xml2json from 'xml2json';
import objectPath from 'object-path';

export const xmlToJson = xml => {
    try {
        return JSON.parse(xml2json.toJson(xml));
    } catch (e) {
        return null;
    }
};

export const parseResponse = (service, response) => {
    let parsed = service.responseType === 'xml' ? xmlToJson(response) : response;

    if (!parsed) {
        return false;
    }

    parsed = objectPath.get(parsed, service.statusPath, '');
    parsed = parsed === service.okWord;

    return parsed;
};
