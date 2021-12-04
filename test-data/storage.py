def readFile(filePath):
    f = None

    fileContent = ""

    try:
        f = open(filePath, 'r')

        fileContent = f.read()

        f.close()

    except Exception as error:
        if f is not None:
            f.close()
        
        raise error

    return fileContent

def writeFile(filePath, content):
    f = None

    try:
        f = open(filePath, 'w')
        
        f.write(content)

        f.close()
    except Exception as error:
        if f is not None:
            f.close()
        raise error
    
    return True
