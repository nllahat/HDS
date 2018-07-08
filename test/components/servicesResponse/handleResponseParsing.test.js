import { servicesResponse } from '../../../src/components';

let expect = require("chai").expect;

describe("Response parser", () => {
    describe("Convert xml to json", () => {
        it("Convert a basic xml", () => {
            let json = servicesResponse.handleResponseParsing.xmlToJson('<HealthCheck><status>Good</status></HealthCheck>');

            expect(json).to.deep.equal({
                HealthCheck: {
                    status: 'Good'
                }
            });
        });

        it("Fail to convert invalid xml", () => {
            let json = servicesResponse.handleResponseParsing.xmlToJson('<HealthCheck><status>Good</status></date>');

            expect(json).equal(null);
        });
    });

    describe("Parse response to boolean result", () => {
        describe("Parse xml", () => {
            describe("Xml matched to the service", () => {
                it("Xml with status OK to true", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                        responseType: 'xml',
                        statusPath: 'HealthCheck.status',
                        okWord: 'Good'
                    }, '<HealthCheck><status>Good</status></HealthCheck>');

                    expect(json).equal(true);
                });

                it("Xml with status NOT OK to false", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                        responseType: 'xml',
                        statusPath: 'HealthCheck.status',
                        okWord: 'Good'
                    }, '<HealthCheck><status>Bad</status></HealthCheck>');

                    expect(json).equal(false);
                });
            });

            describe("Xml that is not matched to the service", () => {
                it("Return false", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                        responseType: 'xml',
                        statusPath: 'Some.path.that.does.not.exist',
                        okWord: 'Good'
                    }, '<HealthCheck><status>Good</status></HealthCheck>');

                    expect(json).equal(false);
                });
            });
        });

        describe("Parse json", () => {
            describe("Json matched to the service", () => {
                it("Json with status OK to true", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                            responseType: 'json',
                            statusPath: 'status.overall',
                            okWord: 'OK'
                        },
                        {
                            "time": "2018-07-08T13:39:46.102Z",
                            "service": "Command Processor",
                            "environment": "development",
                            "host": "N/A",
                            "status": {
                                "db": {
                                    "status": "OK"
                                },
                                "overall": "OK"
                            },
                            "build": "36aa12c9\n0.0.0-2043\n",
                            "duration": 5
                        }
                    );

                    expect(json).equal(true);
                });

                it("Json with status NOT OK to false", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                            responseType: 'json',
                            statusPath: 'status.overall',
                            okWord: 'OK'
                        },
                        {
                            "time": "2018-07-08T13:39:46.102Z",
                            "service": "Command Processor",
                            "environment": "development",
                            "host": "N/A",
                            "status": {
                                "db": {
                                    "status": "BAD"
                                },
                                "overall": "BAD"
                            },
                            "build": "36aa12c9\n0.0.0-2043\n",
                            "duration": 5
                        }
                    );

                    expect(json).equal(false);
                });
            });

            describe("Json that is not matched to the service", () => {
                it("Return false", () => {
                    let json = servicesResponse.handleResponseParsing.parseResponse({
                            responseType: 'json',
                            statusPath: 'Some.path.that.does.not.exist',
                            okWord: 'OK'
                        },
                        {
                            "time": "2018-07-08T13:39:46.102Z",
                            "service": "Command Processor",
                            "environment": "development",
                            "host": "N/A",
                            "status": {
                                "db": {
                                    "status": "BAD"
                                },
                                "overall": "BAD"
                            },
                            "build": "36aa12c9\n0.0.0-2043\n",
                            "duration": 5
                        }
                    );

                    expect(json).equal(false);
                });
            });
        });
    });
});
