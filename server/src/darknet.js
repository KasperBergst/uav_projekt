import {spawn} from "child_process";

export default class Darknet {
    _queue = [];
    _child;
    _waitingForImage = false;
    constructor(weights, threshold)
    {
        this._child = spawn(`bash`, ["detect.sh", weights, threshold]);
        // this._child.stderr.on('data', (data) => {
        //     console.error(`stderr: ${data}`);
        // });
        
        // this._child.on('close', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });
        
        this._child.stdout.on('data', data => this.parseData(data));
        // this._child.stdin.end();
        
    }

    _currCallback = false;
    _currLog = "";
    parseData(dataBuff)
    {
        const data = Buffer.from(dataBuff).toString();
        this._currLog += data;

        if(this._currLog.includes("Enter Image Path:"))
        {
            console.log("SHould enter image path");
            const tempLog = this._currLog;
            this._currLog = "";
            this._waitingForImage = true;
            this.queueTick();

            if(this._currCallback)
            {
                this._currCallback(tempLog);
            }
        }
    }

    addImage(frameName, callback)
    {
        this._queue.push({
            frameName,
            callback
        });
        this.queueTick();
    }

    queueTick()
    {
        if(this._queue.length > 0 && this._waitingForImage)
        {
            const {frameName, callback} = this._queue.shift();
            console.log("Proccess next frame!!", frameName);
            this._waitingForImage = false;

            this._currCallback = callback;
            this._child.stdin.write(frameName + "\n");
        }
    }
}