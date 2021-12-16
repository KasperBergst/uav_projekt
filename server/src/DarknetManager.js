import Darknet from "./Darknet.js";

export default class DarknetManager {
    #threads = [];
    #queue = [];
    
    constructor(weights, threshold, threads)
    {
        for(let i = 0; i < threads; i++)
        {
            const temp = new Darknet(weights, threshold);
            temp.getImage = () => {
                return this.#queue.length > 0 ? this.#queue.shift() : false;
            };
            this.#threads.push(temp);
        }
    }

    /**
     * Adds a frame to the queue.
     * @param string frameName 
     * @param (data:string)=>void callback 
     */
    addImage(frameName, callback)
    {
        this.#queue.push({
            frameName,
            callback
        });
        this.queueTick();
    }

    queueTick()
    {
        this.#threads.forEach(thread => thread.queueTick());
    }
}