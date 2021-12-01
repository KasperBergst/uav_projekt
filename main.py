import cv2
vidcap = cv2.VideoCapture("videoes/Facade.mp4")
bool, frame = vidcap.read()
i = 0
frame_count = 0
frame_skip = 25
output_loc = "frames/"
while True:
    bool, frame = vidcap.read()
    if not bool:
        break
    if i > frame_skip - 1:
        frame_count += 1
        cv2.imwrite(output_loc + "Frame%d.jpg" % frame_count, frame)
        i = 0
        continue
    i += 1