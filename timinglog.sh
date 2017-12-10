#!/bin/bash
declare -A lastpairs
declare -A pairstats

counter=0
maxcounter=100  ## Set this to set how many rows to output at a time
counterreset=1  ## Set this to 0 to echo headers again every $MAXCOUNTER lines, use anything greater than 0 for csv

debug=0   #set this to 1 for some info, or 2 (or more) for a full stack trace

tabs 30

function outputlog () {
app=$1
pair=$2
startkey=${app}${pair}"_start"
endkey=${app}${pair}"_end"
delaykey=${app}${pair}"_delay"
durkey=${app}${pair}"_dur"
roundkey=${app}${pair}"_round"

if [[ "pairstats[${delaykey}]" -lt "1000" ]]; then
if [[ "pairstats[${durkey}]" -lt "1000" ]]; then
#if ((debug)); then
#echo -e "1:${app}\t2:${pair}\t3:${pairstats[${startkey}]}\t4:${pairstats[${endkey}]}\t5:${pairstats[${delaykey}]}\t6:${pairstats[${durkey}]}\t7:${pairstats[${roundkey}]}"
#else
echo -e "${app}\t${pair}\t${pairstats[${startkey}]}\t${pairstats[${endkey}]}\t${pairstats[${delaykey}]}\t${pairstats[${durkey}]}\t${pairstats[${roundkey}]}"
#fi
#we also update out output row counter
counter=$((counter+1))
fi
fi
}

function d () {
if ((debug)); then echo $1 >&2; fi
}
if [[ debug -gt 1 ]]; then
set -x
fi




while read -r line
do
if [ "$counter" -eq "0" ]; then
#output a heading row
#if ((debug)); then
#echo -e "1:App\t2:Pair\t3:Start\t4:End\t5:Delay\t6:Polltime\t7:Round";
#else
echo -e "App\tPair\tStart\tEnd\tDelay\tPolltime\tRound";
#fi
counter=$((counter+1))
fi


if [[ ${line} = *Round* ]]; then
app=$(echo $line | jq .app_name | tr -d '"')
d "APP: ${app}"
msg=$(echo $line | jq .message | tr -d '"')
d "MSG: ${msg}"
sdate=$(echo $line | jq .timestamp | tr -d '"')
stime=$(date -u -d $sdate +"%s")
d "STARTTIME: ${stime}"
pair=$(echo $msg | cut -d' ' -f4)
d "PAIR: ${pair}"
round=$(echo $msg | cut -d' ' -f7)
d "ROUND: ${round}"
lastpairs[$app]=$pair
d "LASTPAIR: ${lastpairs[$app]}"

d "STATE: ${pairstats[$app${pair}_state]}"
if (( pairstats[$app${pair}"_state"] )); then
pairstats[$app${pair}"_dur"]=$((etime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_end"]=${etime}
pairstats[$app${pair}"_state"]=0  #mark the row as complete
#we also update out output row counter
outputlog ${app} ${pair}
#knowing this is the final bit of one type of log, now we now echo out a complete row
fi

pairstats[$app${pair}"_round"]=${round}
pairstats[$app${pair}"_delay"]=$((stime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_start"]=${stime}
pairstats[$app${pair}"_state"]=1  #mark pair as incomplete
fi

##you could ananlyse other lines here....



if [[ ${line} = *recalc* ]]; then
app=$(echo $line | jq .app_name | tr -d '"')
d "APP: ${app}"
msg=$(echo $line | jq .message | tr -d '"')
edate=$(echo $line | jq .timestamp | tr -d '"')
etime=$(date -u -d $edate +"%s")
d "ENDTIME: ${etime}"
#[[ -n $app && -v $lastpairs[$app] ]] || break
pair=${lastpairs[$app]}
d "PAIR: ${pair}"
pairstats[$app${pair}"_dur"]=$((etime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_end"]=${etime}
pairstats[$app${pair}"_state"]=0  #mark the row as complete
#knowing this is the final bit of one type of log, now we now echo out a complete row
outputlog ${app} ${pair}
fi



if [[ ${line} = *good* ]]; then
app=$(echo $line | jq .app_name | tr -d '"')
d "APP: ${app}"
msg=$(echo $line | jq .message | tr -d '"')
edate=$(echo $line | jq .timestamp | tr -d '"')
etime=$(date -u -d $edate +"%s")
d "ENDTIME: ${etime}"
#[[ -n $app && -v $lastpairs[$app] ]] || break
pair=${lastpairs[$app]}
d "PAIR: ${pair}"
pairstats[$app${pair}"_dur"]=$((etime-pairstats[${app}${pair}"_start"]))
pairstats[$app${pair}"_end"]=${etime}
pairstats[$app${pair}"_state"]=0  #mark the row as complete
#knowing this is the final bit of one type of log, now we now echo out a complete row
outputlog ${app} ${pair}
fi


if [ "${counter}" -ge "${maxcounter}" ]; then
#reset counter
counter=$counterreset;
fi


done< <(pm2 log --json | grep --line-buffered -iE 'good|round|recalc')
