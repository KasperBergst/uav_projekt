#!/bin/bash
cd darknet
./darknet detect cfg/$1.cfg $1.weights -thresh $2
cd ..