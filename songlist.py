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
        with open("E:\Github\Chiyuu_Button\songlist.json", 'a') as json_obj1:
            for listname in filelist:
                filename[Num] = os.path.splitext(listname)[0]
                if(os.path.splitext(listname)[1] == ".mp3"):
                    Num = Num + 1
            json.dump(filename, json_obj1)
        with open("E:\Github\Chiyuu_Button\songnumber.json", 'a') as json_obj2:
            json.dump(len(filename),json_obj2)
    #print("输出文件名数量：" + str(len(filename)))
    return "输出文件名数量：" + str(len(filename))

def getGiuhubInformation(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.47'}
    data = requests.get(url, headers=headers)
    print(data)

print(getAllDirQueue_List("E:\Github\Chiyuu_Button\SpiritSound"))
