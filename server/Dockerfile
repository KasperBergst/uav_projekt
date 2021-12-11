FROM node:16

# installs the rosbridge and the necessary python libraries
# RUN apt-get update
# RUN apt-get install python3-opencv -y
# RUN apt install python3-pip -y
# RUN pip3 install --upgrade pip
# RUN pip3 install setuptools-rust opencv-python pybase64 

# copies the scripts
# COPY ./videos/* /videos/
# COPY ./main.py /
# COPY ./run.sh /
# RUN chmod +x run.sh
# RUN ls -l /videos

COPY ./src/* /

RUN npm install
RUN chmod +x installDarknet.sh

RUN ./installDarknet.sh
COPY ./weights/* darknet
COPY ./cfg/* ./darknet/cfg/
COPY ./names/* ./darknet/data/

# CMD ["ls"]
CMD ["npm", "run", "start"]