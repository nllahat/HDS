import xml2json from 'xml2json';
import objectPath from 'object-path';

export const parseResponse = (service, response) => {
    try {
        let parsed = service.responseType === 'xml' ? JSON.parse(xml2json.toJson(response)) : response;

        parsed = objectPath.get(parsed, service.statusPath, '');
        parsed = parsed === service.okWord;

        return parsed;
    } catch (e) {
        console.error(e);

        return false;
    }
};
