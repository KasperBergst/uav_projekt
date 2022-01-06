import Darknet from "./Darknet.js";

export default class DarknetManager {
    #threads = [];
    #queue = [];
    
    /**
     * Starts darknet on the given amount of threads, with the given weight and threshold.
     * @param string weights 
     * @param number threshold 
     * @param number threads 
     */
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

    /**
     * Runs queueTick on every thread.
     */
    queueTick()
    {
        this.#threads.forEach(thread => thread.queueTick());
    }
}