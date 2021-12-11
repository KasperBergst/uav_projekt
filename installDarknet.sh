rm -rf darknet

git clone https://github.com/pjreddie/darknet
cd darknet
make

wget https://pjreddie.com/media/files/yolov3.weights
wget https://clonex.dk/dior.weights
wget https://clonex.dk/visdrone.weights
wget https://clonex.dk/608.weights

cp -a ../cfg/. cfg/
cp -a ../names/. data/