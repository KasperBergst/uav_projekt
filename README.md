## Building the image
First run the following to build the rosbridge image
    
    docker build -t rosbridge .

## Running the image
Then run the following to run the container

    docker run -p 9090:9090 rosbridge
