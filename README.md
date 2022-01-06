# Setup
## Requirements
- [Docker](https://www.docker.com/)

## Prerequisite
Run the following command to download and setup darknet and the pretrained weight.
```
./pre-compose.sh
```

## Docker-compose
First build the containers with the following command:
```
docker-compose build
```

Then spin up the docker containers:
```
docker-compose run 
```
This opens up ROS with ROS-brigde and our server.

When the docker is up and running, the detections of the server can be viewed in file `frontend.html`.