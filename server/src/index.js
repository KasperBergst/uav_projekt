import ROSLIB from "roslib";
import fs from "fs";
import detectImage from "./darknet.js";

var i = 0;

const ros = new ROSLIB.Ros({
    url : `ws://${process.env.droneHost}:9090`
});

const listener = new ROSLIB.Topic({
    ros : ros,
    name : '/frames',
    messageType : 'std_msgs/String'
});

listener.subscribe((message) => {
    // console.log("RECEIVED:", message.data)
    fs.writeFileSync(`/frames/frame.jpg`, message.data, {
        encoding: "base64url"
    });
    i++;
    // detectImage(`frame.jpg`, "dior", 0.8);
    // console.log('Received message on ' + listener.name + ': ' + message.data);
});

console.log("ONLINE")