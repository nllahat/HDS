import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { startHealthMonitor, stopHealthMonitor } from './controllers/monitoringController';
import healthStatusRouter from './routes/healthStatusRoute';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/healthStatus/', healthStatusRouter);

let server = app.listen(process.env.PORT || 8080, () => {
    console.log('Running on localhost:' + process.env.PORT || 8080);

    startHealthMonitor();
});

process.on('SIGTERM', () => {
    stopHealthMonitor();
    server.close(() => {
        process.exit(0);
    });
});
