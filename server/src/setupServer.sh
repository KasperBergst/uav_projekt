#!/bin/bash

# init darknet
cd darknet
make clean
make

# start the server
npm run start