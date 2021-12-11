import ROSLIB from "roslib";
import fs from "fs";

const ros = new ROSLIB.Ros({
    url : `ws://${process.env.droneHost}:9090`
});

const listener = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
});

listener.subscribe((message) => {
    fs.writeFileSync("temp.jpg", message.data, {
        encoding: "base64url"
    });
    // console.log('Received message on ' + listener.name + ': ' + message.data);
});