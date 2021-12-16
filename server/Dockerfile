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

WORKDIR /
COPY ./src/* /

RUN npm install
RUN mkdir frames

RUN chmod +x setupServer.sh
RUN chmod +x detect.sh

EXPOSE 8080

CMD ["bash", "setupServer.sh"]
# CMD ["npm", "run", "start"]