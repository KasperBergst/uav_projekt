# Setup
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

Then spin up docker:
    docker-compose run 
This opens up ROS with ROS-brigde and our Server.

When the containers are up and running, the detections of the server can be viewed in `frontend.html`.