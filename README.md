# docker-express-react
Example of Docker container with React connecting to Express

*Express* and *React* will **hot-reload** every time changes are made to either *Express* or *React* code in both the client and server.
Just modify, reload, and iterate.

## Installation

```
cd client
npm install
cd ../api
npm install
```

## Starting/reloading
`make start` to start
`make stop` to stop
`make restart` to restart
`make rebuild` to rebuild and restart if you made changes to the Dockerfile or docker-compose.yml

## Usage

Visit http://localhost:8081 and the API is at http://localhost:3000/api

Modify files at `api/` for *Express* and `client/` for *React* - change take effect immediately without needing to restart.
