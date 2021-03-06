import time
import roslibpy
import base64
import cv2
import subprocess
from threading import Thread
import logging

# Configure logging to high verbosity (DEBUG)
fmt = '%(asctime)s %(levelname)8s: %(message)s'
logging.basicConfig(format=fmt, level=logging.INFO)
log = logging.getLogger(__name__)

# Runs roscore
def runRoscore():
    log.info("Starting roscore...")
    subprocess.run(["roscore"])

# Runs rosbridge
def runRosbridge():
    log.info("Starting rosbridge...")
    subprocess.run(["roslaunch", "--wait", "rosbridge_server", "rosbridge_websocket.launch"])

# Returns ture if rosbridge is currently running and false otherwise
def isRosbridgeRunning():
    output = subprocess.run(["rostopic", "list"], stdout=subprocess.PIPE, stderr=subprocess.PIPE).stdout.decode("utf-8")
    if output != None:
        return "/connected_clients" in output
    else:
        return False

roscore = Thread(target=runRoscore)
rosbridge = Thread(target=runRosbridge)

roscore.start()
rosbridge.start()

# Wait for rosbridge to run
while not isRosbridgeRunning():
    time.sleep(0.5)

client = roslibpy.Ros(host='localhost', port=9090)
client.run()
talker = roslibpy.Topic(client, "/frames", 'std_msgs/String')

# Video to be captured
vidcap = cv2.VideoCapture("/videos/Perimeter.mp4")
i = 0
frame_skip = 60

# Give the server 20 seconds to start before we begin sending the data
time.sleep(20)


vidcap.set(cv2.CAP_PROP_POS_FRAMES, frame_skip * 21)
i += frame_skip * 7

while client.is_connected:
    time.sleep(3)

    # Get frames from video
    bool, frame = vidcap.read()
    if bool:

        # Converts the image to base64
        bool, buffer = cv2.imencode('.jpg', frame)
        encoded_img = base64.b64encode(buffer).decode('ascii')

        talker.publish(roslibpy.Message({'data': encoded_img}))
        
        i += frame_skip
        vidcap.set(cv2.CAP_PROP_POS_FRAMES, i)
        
talker.unadvertise()
client.terminate()
