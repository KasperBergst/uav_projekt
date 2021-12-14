import ROSLIB from "roslib";
import fs from "fs";
import Darknet from "./darknet.js";


const darknet = new Darknet("dior", 0.8); 

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
    const FRAME = `/frames/frame${i}.jpg`;
    fs.writeFileSync(FRAME, message.data, {
        encoding: "base64url"
    });
    darknet.addImage(FRAME, (data) => {
        console.log("Done proccessing frame!", data);
        fs.unlinkSync(FRAME);
    });
    i = (i + 1) % Number.MAX_SAFE_INTEGER;
});

console.log("ONLINE")