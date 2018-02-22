#!/bin/bash

if [ -z "$1" ] && [ -z "$2" ]; then
echo "Instructions: $0 /path/to/gunbot/exchange-BASE-ALT-state.json 4"
echo "where 4 is the RTcount to insert/update"
exit
fi


if [[ $(grep RTcount $1 | wc -l) -eq 1 ]]; then
echo already has RTcount

else
sed -i -e $(echo -ne 's/{"state":/{"RTcount":'; echo -ne ${2}; echo -ne ',"state":/g';) $1
fi
