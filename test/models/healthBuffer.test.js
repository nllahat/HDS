import HealthBuffer from '../../src/models/healthBuffer';

let expect = require("chai").expect;

describe("Single health buffer functionality", () => {
    describe("Instantiate new HealthBuffer named TestService with fixedSize of 10", () => {
        let TestHealthBuffer = new HealthBuffer('TestService', 10);

        it("Has empty fifo", () => {
            expect(TestHealthBuffer.fifo.length).equal(0);
        });

        it("Has fixedSize of 10", () => {
            expect(TestHealthBuffer.fixedSize).equal(10);
        });

        it("Has name TestService", () => {
            expect(TestHealthBuffer.name).equal('TestService');
        });

        it("Availability is 0%", () => {
            expect(TestHealthBuffer.calcAvailabilityPercentage()).equal(0);
        });
    });

    describe("Log 5 OK statuses and 5 NOT OK statuses to HealthBuffer (size 10)", () => {
        let TestHealthBuffer = new HealthBuffer('TestService', 10);

        TestHealthBuffer.logStatus(true, 200);
        TestHealthBuffer.logStatus(true, 200);
        TestHealthBuffer.logStatus(true, 200);
        TestHealthBuffer.logStatus(true, 200);
        TestHealthBuffer.logStatus(true, 200);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);

        it("Has fifo length 10", () => {
            expect(TestHealthBuffer.fifo.length).equal(10);
        });

        it("Availability is 50%", () => {
            expect(TestHealthBuffer.calcAvailabilityPercentage()).equal(50);
        });
    });

    describe("Log 10 NOT OK statuses to HealthBuffer (size 10)", () => {
        let TestHealthBuffer = new HealthBuffer('TestService', 10);

        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);
        TestHealthBuffer.logStatus(false, 500);

        it("Has fifo length 10", () => {
            expect(TestHealthBuffer.fifo.length).equal(10);
        });

        it("Availability is 0%", () => {
            expect(TestHealthBuffer.calcAvailabilityPercentage()).equal(0);
        });
    });

    describe("Log 1 OK status to HealthBuffer (size 10)", () => {
        let TestHealthBuffer = new HealthBuffer('TestService', 10);

        TestHealthBuffer.logStatus(true, 200);

        let { isOk, code } = TestHealthBuffer.getLastStatus();

        it("Last status is the inserted OK status with code 200", () => {
            expect({isOk, code}).to.deep.equal({
                isOk: true,
                code: 200
            });
        });
    });
});
