FROM node:16

WORKDIR /
COPY ./src/* /

# Install dependencies
RUN npm install
RUN mkdir frames

# Chmod scripts
RUN chmod +x setupServer.sh
RUN chmod +x detect.sh

EXPOSE 8080

CMD ["bash", "setupServer.sh"]