import json
import random
import os

from storage import readFile, writeFile

def addPositiveNumber(addNumberCount, digits=1000, reset=False):
    filePath = os.path.dirname(__file__) + '/addPositive.json'

    addOpList = ""

    try:
        if reset is False:
            addOpList = json.loads(readFile(filePath))# and []
        else:
            addOpList = []
    except:
        addOpList = []

    for i in range(addNumberCount):
        obj = {}

        obj['num_1'] = random.getrandbits(digits)
        obj['num_2'] = random.getrandbits(digits)

        obj['sum'] = str(obj['num_1'] + obj['num_2'])

        obj['num_1'] = str(obj['num_1'])
        obj['num_2'] = str(obj['num_2'])
        
        addOpList.append(obj)

    writeFile(filePath, json.dumps(addOpList, indent=4, sort_keys=True))

addPositiveNumber(10000, 1000, False)