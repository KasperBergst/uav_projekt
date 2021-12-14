import {exec} from "child_process";

const BASE = "darknet"

const detectImage = (frameName, weights, threshold) => {
    const tmp = exec(`./detect.sh ${weights} ${frameName} ${threshold}};`, 
                    {}, 
                    (err, stdout, stderr) => {
                        console.log(`err: ${err}`);
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                    });
}

export default detectImage;