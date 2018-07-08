# HDS

## API Routes

1. Get health statuses of all services: http://localhost:8080/api/healthStatus/getHealthStatuses
  * Response is an array of service statuses.
  * Each statues will have a timestamp, code and isOk.

2. Get services availability: http://localhost:8080/api/healthStatus/getServicesAvailability
  * Response is an array of service availability percentages.
  
## Description
### Settings
The settings.js file contains a list of services to monitor. 
Each service in the list is represented by and object that contains the service name, uri, responseType (xml / json), 
statusPath (the object path to the property that represents the overall status) and okWord (the term that symbol if status is OK).

### .env
This file contains environment variables (server port, interval value, max size of buffer).

### Overview
My main focus was on how to store the logs for each service and how to parse thier responses. 
I wanted to make it scalable so it can be expanded to more then 3 services.

The main problem was that each service response in a different structure 
and that's why I had to describe each service in the settings.js file.

Each service has its own HealthBuffer. The HealthBuffers are stored in a global singleton object.

I tried to split the code to small components to ease on reuse, make the code readable and to ease on unit testings.

### Notice
 * Logs are pushed to a FIFO on each interval and therefore the push might be inaccurate - 
 if the interval is delayed, an early log can get pushed to the fifo after a later one.

 * On first minute - the buffers will be empty cause it takes the main code 1 minute to run because of the interval.

## Run Tests
Run **npm test**

## Run Server
Run **npm install** and then **npm start**
