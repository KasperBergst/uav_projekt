import {spawn} from "child_process";

export default class Darknet {
    _queue = [];
    _child;
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
            if(this._currCallback)
            {
                this._currCallback(this._currLog);
            }
            
            this._currLog = "";
            if(this._queue.length > 0)
            {
                const {frameName, callback} = this._queue.shift();
                this._currCallback = callback;
                this._child.stdin.write(frameName + "\n");
            }
        }
    }

    addImage(frameName, callback)
    {
        this._queue.push({
            frameName,
            callback
        });
    }
}