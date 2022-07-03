import json
import random
import os

from storageService import read_file, write_file


def populate_mock_add_positive(add_number_count, digits=1000, reset=False):
    file_path = os.path.dirname(__file__) + '/../core/fixtures/mockAddPositive.json'

    add_op_list = {"list": []}

    try:
        if reset is False:
            add_op_list = json.loads(read_file(file_path))  # and []
        else:
            add_op_list = {"list": []}
    except:
        add_op_list = {"list": []}

    for i in range(add_number_count):
        obj = {'numOne': (random.getrandbits(digits)), 'numTwo': (random.getrandbits(digits))}

        obj['result'] = str(obj['numOne'] + obj['numTwo'])

        obj['numOne'] = str(obj['numOne'])

        obj['numTwo'] = str(obj['numTwo'])

        add_op_list['list'].append(obj)

    write_file(file_path, json.dumps(add_op_list, indent=4, sort_keys=True))


populate_mock_add_positive(10000, 1000, False)
