#!/bin/bash
cd darknet

rm data/coco.names
cp -r data/$1.names data/coco.names

./darknet detect cfg/$1.cfg $1.weights -thresh $2
cd ..