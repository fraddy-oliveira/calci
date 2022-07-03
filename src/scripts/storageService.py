def read_file(file_path):
    f = None

    file_content = ""

    try:
        f = open(file_path, 'r')

        file_content = f.read()

        f.close()

    except Exception as error:
        if f is not None:
            f.close()

        raise error

    return file_content


def write_file(file_path, content):
    f = None

    try:
        f = open(file_path, 'w')

        f.write(content)

        f.close()
    except Exception as error:
        if f is not None:
            f.close()
        raise error

    return True
