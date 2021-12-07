FROM ros:melodic-ros-core-bionic

RUN apt-get update
RUN apt-get install ros-melodic-rosbridge-suite -y
COPY ./run.sh /
RUN chmod +x run.sh

CMD ["./run.sh"]