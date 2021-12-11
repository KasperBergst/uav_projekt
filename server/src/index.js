import ROSLIB from "roslib";

const ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

const listener = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
});