import {spawn} from "child_process";

export default class Darknet {
    _queue = [];
    _child;
    _waitingForImage = false;

    constructor(weights, threshold)
    {
        this._child = spawn(`bash`, ["detect.sh", weights, threshold]);
  
        this._child.stdout.on('data', data => this.parseData(data));
        // this._child.stdin.end();
    }

    /**
     * Parses the data from darknet.
     * @param Buffer<string> dataBuff 
     */
    _currCallback = false;
    _currLog = "";
    parseData(dataBuff)
    {
        const data = Buffer.from(dataBuff).toString();
        // const oldLog = this._currLog;
        this._currLog += data;
        if(this._currLog.includes("Enter Image Path:"))
        {
            if(this._currCallback)
            {
                this._currCallback(this._currLog);
            }

            this._currLog = "";
            this._waitingForImage = true;
            this.queueTick();
        }
    }

    /**
     * Adds a frame to the queue.
     * @param string frameName 
     * @param (data:string)=>void callback 
     */
    addImage(frameName, callback)
    {
        this._queue.push({
            frameName,
            callback
        });
        this.queueTick();
    }

    /**
     * Checks the queue for the next element.
     */
    queueTick()
    {
        if(this._queue.length > 0 && this._waitingForImage)
        {
            const {frameName, callback} = this._queue.shift();
            this._waitingForImage = false;

            this._currCallback = callback;
            this._child.stdin.write(frameName + "\n");
        }
    }
}