import os
import collections
import json

def getAllDirQueue_List(path):
    file = open("E:\Github\Chiyuu_Button\songlist.json",'w')
    file.write('')
    file.close()
    queue = collections.deque()
    queue.append(path)
    Num = 0
    filename = {}
    while len(queue) != 0:
        dirpath = queue.popleft()
        filelist = os.listdir(dirpath)
        with open("E:\Github\Chiyuu_Button\songlist.json", 'a') as json_obj:
            for listname in filelist:
                filename[Num] = os.path.splitext(listname)[0]
                Num = Num + 1
            json.dump(filename, json_obj)
    return "输出文件名数量：" + str(len(filelist))

print(getAllDirQueue_List("E:\Github\Chiyuu_Button\SpiritSound"))
