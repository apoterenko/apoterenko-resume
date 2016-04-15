# If you update english here is the procudure for this:
#  - update en.po that on the left you will have old ids, and on the right you will have new ids.
#  - update english in source files
#  - generate new .pot file
#  - Open poedit and generate ru2.po from new .pot file.
#  - then run
#     python3 merger.py en.po ru.po ru2.po > ru3.po
#  - then look throug diff ru2.po & ru3.po
#  - than cp ru3.po ru.po
#  - commit new ru.po


import sys
from collections import OrderedDict


def build_map(file, reverse=False):
	result = OrderedDict()

	msgid_flag = False
	msgstr_flag = False
	msgant_flag = False
	current_id = ""
	current_msg = ""
	current_ano = ''
	for line in file:
		line = line.strip()
		if line.find('msgid') == 0:
			current_id = ""
			msgid_flag = True
			msgant_flag = False
		elif line.find('msgstr') == 0:
			current_msg = ""
			msgid_flag = False
			msgstr_flag = True
		elif line.find('#: ') == 0:
			msgant_flag = True
			msgid_flag = False
		elif line == "":
			if msgstr_flag:
				if reverse:
					result[current_msg] = (current_ano, current_id)
				else:
					result[current_id] = (current_ano, current_msg)
				current_ano = ""
			msgid_flag = False
			msgstr_flag = False
			msgant_flag = False

		if msgid_flag:
			line = line[line.find('"'):]
			current_id += line + '\n'

		elif msgstr_flag:
			line = line[line.find('"'):]
			current_msg += line + '\n'

		elif msgant_flag:
			current_ano += line + '\n'
		
		
	return result
		


en_en_po = open(sys.argv[1])
en_en_map = build_map(en_en_po, True)

old_po = open(sys.argv[2])
old_map = build_map(old_po)

new_po = open(sys.argv[3])
new_map = build_map(new_po)

merge_map = {}

for k,v in new_map.items():
	try:
		old_key = en_en_map[k][1]
		print(v[0], end="")
		print('msgid', k, end="")
		print('msgstr', old_map[old_key][1], end="")
		print()
	except:
		#print(old_key = k
		print(v[0], end="")
		print('msgid', k, end="")
		print('msgstr', v[1], end="")
		print()

	

