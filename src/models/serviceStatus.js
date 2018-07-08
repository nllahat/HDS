class ServiceStatus {
    constructor(isOk, code) {
        this.isOk = isOk;
        this.code = code;
        this.timestamp = Date.now();
    }
}

export default ServiceStatus;
