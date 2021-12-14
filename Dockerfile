FROM ros:melodic-ros-core-bionic

# installs the rosbridge and the necessary python libraries
RUN apt-get update
RUN apt-get install ros-melodic-rosbridge-server python3-opencv -y
RUN apt install python3-pip -y
RUN pip3 install --upgrade pip
RUN pip3 install setuptools-rust roslibpy opencv-python pybase64 

# copies the scripts
COPY ./videos/* /videos/
COPY ./main.py /

EXPOSE 9090

CMD ["python3", "main.py"]