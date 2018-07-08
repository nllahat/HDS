import dotenv from 'dotenv';

dotenv.config();

const settings = {
    servicesList: [
        {
            name: 'staging',
            uri: 'https://360-staging.autodesk.com/health',
            responseType: 'xml',
            statusPath: 'HealthCheck.status',
            okWord: 'Good'
        },
        {
            name: 'bim360Dev',
            uri: 'https://bim360dm-dev.autodesk.com/health?self=true',
            responseType: 'json',
            statusPath: 'status.overall',
            okWord: 'GOOD'
        },
        {
            name: 'bim360DevCommands',
            uri: 'https://commands.bim360dm-dev.autodesk.com/health',
            responseType: 'json',
            statusPath: 'status.overall',
            okWord: 'OK'
        }
    ],
    intervalValue: Number(process.env.INTERVAL_VALUE),
    bufferLimit: Number(process.env.BUFFER_LIMIT),

};

export default settings;
