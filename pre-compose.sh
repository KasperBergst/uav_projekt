rm -rf darknet
git clone https://github.com/pjreddie/darknet
cd darknet

# wget https://pjreddie.com/media/files/yolov3.weights --no-check-certificate
wget https://clonex.dk/dior.weights --no-check-certificate
# wget https://clonex.dk/visdrone.weights --no-check-certificate
# wget https://clonex.dk/608.weights --no-check-certificate

cp -a ../server/cfg/. ./cfg
cp -a ../server/names/. ./data