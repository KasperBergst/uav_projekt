import {spawn} from "child_process";

export default class Darknet {
    static _queue = [];
    _child;
    _waitingForImage = false;

    getImage = () => false;

    constructor(weights, threshold)
    {
        this._child = spawn(`bash`, ["detect.sh", weights, threshold]);
        this._child.stdout.on('data', data => this.parseData(data));
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
                this._currCallback(this.parseDarknet(this._currLog));
            }

            this._currLog = "";
            this._waitingForImage = true;
            this.queueTick();
        }
    }


    parseDarknet(input)
    {
        return input
                .split("\n")
                .slice(1, -1)
                .map(line => {
                const temp = line.split(": ");
                return ({
                    label: temp[0],
                    confidence: Number(temp[1].slice(0, -1))
                });
            });
    }

    /**
     * Checks the queue for the next element.
     */
    queueTick()
    {
        if(this._waitingForImage)
        {
            const element = this.getImage();
            if(element)
            {
                this._waitingForImage = false;
                
                this._currCallback = element.callback;
                this._child.stdin.write(element.frameName + "\n");
            }
        }
    }
}