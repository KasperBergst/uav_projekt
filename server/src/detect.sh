cd darknet
./darknet detect cfg/$1.cfg $1.weights ../frames/$2 -thresh $3 -ext_output > ../result.txt
cd ..