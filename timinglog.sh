#!/bin/bash
declare -A lastpairs
declare -A pairstats

counter=0
maxcounter=100  ## Set this to set how many rows to output at a time
counterreset=1  ## Set this to 0 to echo headers again every $MAXCOUNTER lines, use anything greater than 0 for csv

while read -r line
do
if [ "$counter" -eq "0" ]; then
#output a heading row
echo -e "App\tPair\tStart\tEnd\tDelay\tPolltime\tRound";
#echo -e "1:App\t2:Pair\t3:Start\t4:End\t5:Delay\t6:Polltime\t7:Round";
fi


if [[ ${line} = *Round* ]]; then
app=$(echo $line | jq .app_name | tr -d '"')
#echo "APP: ${app}"
msg=$(echo $line | jq .message | tr -d '"')
#echo "MSG: ${msg}"
sdate=$(echo $line | jq .timestamp | tr -d '"')
stime=$(date -u -d $sdate +"%s")
#echo "STARTTIME: ${stime}"
pair=$(echo $msg | cut -d' ' -f4)
#echo "PAIR: ${pair}"
round=$(echo $msg | cut -d' ' -f7)
#echo "ROUND: ${round}"
lastpairs[$app]=$pair
#echo "LASTPAIR: ${lastpairs[$app]}"
pairstats[$app${pair}"_round"]=${round}
pairstats[$app${pair}"_delay"]=$((stime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_start"]=${stime}
fi

##you could ananlyse other lines here....

if [[ ${line} = *good* ]]; then
app=$(echo $line | jq .app_name | tr -d '"')
#echo "APP: ${app}"
msg=$(echo $line | jq .message | tr -d '"')
edate=$(echo $line | jq .timestamp | tr -d '"')
etime=$(date -u -d $edate +"%s")
#echo "ENDTIME: ${etime}"
#[[ -n $app && -v $lastpairs[$app] ]] || break
pair=${lastpairs[$app]}
#echo "PAIR: ${pair}"
pairstats[$app${pair}"_dur"]=$((etime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_end"]=${etime}


#knowing this is the final bit, now we now echo out a complete row
startkey=${app}${pair}"_start"
endkey=${app}${pair}"_end"
delaykey=${app}${pair}"_delay"
durkey=${app}${pair}"_dur"
roundkey=${app}${pair}"_round"

echo -e "${app}\t${pair}\t${pairstats[${startkey}]}\t${pairstats[${endkey}]}\t${pairstats[${delaykey}]}\t${pairstats[${durkey}]}\t${pairstats[${roundkey}]}"
#echo -e "1:${app}\t2:${pair}\t3:${pairstats[${startkey}]}\t4:${pairstats[${endkey}]}\t5:${pairstats[${delaykey}]}\t6:${pairstats[${durkey}]}\t7:${pairstats[${roundkey}]}"
#we also update out output row counter
counter=$((counter+1))
fi


if [ "${counter}" -ge "${maxcounter}" ]; then
#reset counter
counter=$counterreset;
fi


done
