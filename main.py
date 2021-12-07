import time
import roslibpy
import base64
import cv2
import logging

time.sleep(5)

# Configure logging to high verbosity (DEBUG)
fmt = '%(asctime)s %(levelname)8s: %(message)s'
logging.basicConfig(format=fmt, level=logging.DEBUG)
log = logging.getLogger(__name__)

log.info("Starting camera")

client = roslibpy.Ros(host='localhost', port=9090)
client.run()

talker = roslibpy.Topic(client, '/chatter', 'std_msgs/String')

vidcap = cv2.VideoCapture("/videos/Facade.mp4")
# vidcap = cv2.VideoCapture("videos/Facade.mp4")
i = 0
frame_skip = 25

while client.is_connected:
    # time.sleep(1)

    bool, frame = vidcap.read()
    log.info(bool)
    if bool:
        # converts the image to base64
        bool, buffer = cv2.imencode('.jpg', frame)
        encoded_img = base64.b64encode(buffer).decode('ascii')

        talker.publish(roslibpy.Message({'data': encoded_img}))
        
        i += frame_skip
        vidcap.set(cv2.CAP_PROP_POS_FRAMES, i)

talker.unadvertise()
client.terminate()
log.info("Stopping camera")