import fifo from 'fifo';
import ServiceStatus from './serviceStatus';

class HealthBuffer {
    constructor(name, fixedSize) {
        this.fixedSize = fixedSize;
        this.name = name;
        this.fifo = fifo();
    }

    logStatus(isOk, code) {
        if (this.fifo.length === this.fixedSize) {
            this.fifo.shift();
        }

        this.fifo.push(new ServiceStatus(isOk, code));
    }

    getLastStatus() {
        let letLastStatus = this.fifo.last();

        if (letLastStatus && letLastStatus.timestamp) {
            letLastStatus.timestamp = new Date(letLastStatus.timestamp);
        }

        return letLastStatus;
    }

    calcAvailabilityPercentage() {
        let successCounter = 0;
        let fifoLength = this.fifo.length;

        if (!fifoLength) {
            return 0;
        }

        for (let node = this.fifo.node; node; node = this.fifo.next(node)) {
            if (node.value && node.value.isOk) {
                successCounter++;
            }
        }

        return (successCounter / fifoLength) * 100;
    }
}

export default HealthBuffer;
