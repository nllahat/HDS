import fifo from 'fifo';
import ServiceStatus from './serviceStatus';

/**
 * HealthBuffer contains the fifo (stack) that holds all the statuses logged by the monitor interval
 * The fifo will remove the oldest log if it reaches up to 60 records
 * A record is a ServiceStatus class
 */
class HealthBuffer {
    constructor(name, fixedSize = 0) {
        this.fixedSize = fixedSize;
        this.name = name;
        this.fifo = fifo();
    }

    logStatus(isOk, code) {
        if (this.fixedSize) {
            if (this.fifo.length === this.fixedSize) {
                this.fifo.shift();
            }

            this.fifo.push(new ServiceStatus(isOk, code));
        }
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
