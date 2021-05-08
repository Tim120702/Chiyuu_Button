import os
import collections
import json
import requests;

dataNeeded = {}
def getAllDirQueue_List(path):
    file = open("E:\Github\Chiyuu_Button\songlist.json",'w')
    file.write('')
    file.close()
    file = open("E:\Github\Chiyuu_Button\songnumber.json",'w')
    file.write('')
    file.close()
    queue = collections.deque()
    queue.append(path)
    Num = 0
    filename = {}
    while len(queue) != 0:
        dirpath = queue.popleft()
        filelist = os.listdir(dirpath)
        for listname in filelist:
            if(os.path.splitext(listname)[1] == ".mp3"):
                filename[Num] = os.path.splitext(listname)[0]
                Num = Num + 1
    audioNum = len(filename)
    json.dump(filename, open("E:\Github\Chiyuu_Button\songlist.json",'a'))

    Num = 0
    filename = {}
    path = "E:\Github\Chiyuu_Button\SpiritSound\幽歌"
    queue.append(path)
    while len(queue) != 0:
        dirpath = queue.popleft()
        filelist = os.listdir(dirpath)
        for listname in filelist:
            if (os.path.splitext(listname)[1] == ".mp3"):
                filename[Num] = os.path.splitext(listname)[0]
                Num = Num + 1
    songNum = len(filename)
    json.dump(str(songNum) + "+" + str(audioNum), open("E:\Github\Chiyuu_Button\songnumber.json",'a'))
    #print("输出文件名数量：" + str(len(filename)))
    return "输出文件名数量：" + str(songNum) + " + " + str(audioNum)

print(getAllDirQueue_List("E:\Github\Chiyuu_Button\SpiritSound"))
