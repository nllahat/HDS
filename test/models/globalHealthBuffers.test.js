import * as globalHealthBuffers from '../../src/models/globalHealthBuffers';

let expect = require("chai").expect;

describe("Global health buffer", () => {
    describe("Fill first buffer with 15 NOT OK statuses and 45 OK statuses", () => {
        for (let i = 0; i < 15; i++) {
            globalHealthBuffers.updateServiceBuffer('https://360-staging.autodesk.com/health', false, 500);
        }

        for (let i = 0; i < 45; i++) {
            globalHealthBuffers.updateServiceBuffer('https://360-staging.autodesk.com/health', true, 200);
        }

        it("Availability should be 75%", () => {
            expect(globalHealthBuffers.getAvailabilityPercentage()[0]).to.deep.equal({
                "serviceUrl": "https://360-staging.autodesk.com/health",
                "availability": 75
            });
        });
    });
});
