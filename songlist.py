import os
import collections
import json

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
        with open("E:\Github\Chiyuu_Button\songlist.json", 'a') as json_obj1:
            for listname in filelist:
                filename[Num] = os.path.splitext(listname)[0]
                if(os.path.splitext(listname)[1] == ".mp3"):
                    Num = Num + 1
            json.dump(filename, json_obj1)
        with open("E:\Github\Chiyuu_Button\songnumber.json", 'a') as json_obj2:
            json.dump(len(filename),json_obj2)
    return "输出文件名数量：" + str(len(filename))

print(getAllDirQueue_List("E:\Github\Chiyuu_Button\SpiritSound"))
