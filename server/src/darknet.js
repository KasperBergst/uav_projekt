import {exec} from "child_process";

const detectImage = (frameName, weights, threshold) => {
    const tmp = exec(`./darknet/darknet detect cfg/${weights}.cfg ${weights}.weights ../${frameName} -thresh ${threshold} -ext_output > result.txt`, 
                    {}, 
                    (err, stdout, stderr) => console.log("Shutting detector down..."));

    tmp.stdout.on('data', d => console.log(d));
}

export default detectImage;