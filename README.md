## Objective :
The objective of this project is to efficiently and fairly distribute incoming user requests to a pool of astrologers. The algorithm aims to ensure that each astrologer receives a balanced number of requests over time, while also providing the flexibility to prioritize certain astrologers based on predefined criteria such as performance or user ratings.

## Features
- Fetch Users and Astrologers: Retrieve all users without an assigned astrologer and all astrologers.
- Calculate Total Weight: Sum up the weights of all astrologers.
- Assign Users to Astrologers: Iterate through each user and randomly assign them to an astrologer based on their weight.
- Update Connections: Increment the connections count for each astrologer as users are assigned.
- When an astrologer's isTop status is toggled: Their weight is adjusted (e.g., doubled if they are marked as top).This increases their likelihood of receiving more users.

## Architecture
- Client Interface: Users interact with the system and send requests to the server using API.
- Server: Receives requests, and enqueues requests.
- Queue Management: Each client has a dedicated queue in Redis/bull.
- Worker Processes: Process tasks from queues sequentially.
- We use Flow Distribution Algorithm to to distribute users to Astrologer
- Database: MongoDB for data storage.
- Monitoring: Prometheus for metrics collection and Grafana for visualization.

## Diagram
![Flow-Diagram-Algorithm](https://github.com/ManishGupta03/gAstroAssignment2/assets/117648576/0e4f5df3-1505-4999-8afa-4a9a1010a396)


## Technology Used
- Node-js
- MongoDB
- Jest
- Docker Centralization
- Express-Js
- Javascript
- Redis
- Promethus

## Installation
- Clone the repository: git clone https://github.com/your_username/gAstroAssignment2.git
- Navigate to the project directory: cd gAstroAssignment2
- Install dependencies: npm install
- configure database
- configure .env file

## Usage
- Start the server: npm run start
- Access the  application through a web browser by visiting http://localhost:8086

## Requirements(Should Installed in your local computer)
- Node -js
- MongoDB
- Docker

## API endpoints
- connectUSER(POST) ---> http://localhost:8086/api/connectUser
- setTopAstrologer(POST) ---> http://localhost:8086/api/connectUser
- createUSER(POST) ---> http://localhost:8086/api/createUser
- createASTROLOGER(POST) ---> http://localhost:8086/api/createAstrologer
