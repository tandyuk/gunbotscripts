<?PHP

$basedir = dirname(__FILE__);
include_once($basedir . '/bittrex-functions.php');
global $config;
$config = json_clean_decode(file_get_contents($basedir.'/config.js'),true);

$orders = get_open_orders();
$currencies = get_currencies();
$markets = get_markets();

$pairs = array();
$results = array();

$balances = get_balances();
//	echo "PAIR	Total Trades		Total Volume	Total Buy Cost		Total Sell Value	Commission		Net Profit		Balance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
	$abuys = 0;
	$asells = 0;
	$aamounttraded = 0;
	$acommission = 0;
	$atot_buy = 0;
	$atot_sell = 0;
	$agross = 0;
	$anet = 0;

$want = array();
$drop = array();
$defstrat = "bbrsistepgain";

if(isset($argv[1]) && (NULL!==$argv[1])){
global $arg;
$arg = $argv[1];
	$markets = array_filter($markets, function($v){global $arg; return $v['MarketName']==$arg;});
}

//filter bitcoin only.<br />
	$markets = array_filter($markets, function($v){global $arg; return substr($v['MarketName'],0,3)=="BTC";});
//comment out the line about to include USDT / ETH / ???

foreach($markets as $m){
$pair = $m['MarketName'];
if(array_key_exists($pair,$config['pairs']['bittrex'])){
$data = $config['pairs']['bittrex'][$pair];
$havecoin = true;
}else{
$havecoin = false;
}
$wantcoin = false;

echo "Checking ".$pair.PHP_EOL;
	$hist = get_order_history($pair);
	$summ = get_market_summary($pair);
	$currency = str_replace('BTC-','',$pair);
	$balance = array_key_exists($currency,$balances)?$balances[$currency]['balance']:0;
	$boughtprices = array();
	$boughtprice = 0;
	$checkbal = $balance;
	$droppoints=0;

	$buys = 0;
	$sells = 0;
	$amounttraded = 0;
	$commission = 0;
	$tot_buy = 0;
	$tot_sell = 0;

	foreach($hist as $order){
		if(substr($order['OrderType'],6,3)=="SEL"){
			//sell
			$sells++;
			$tot_sell += $order['Price'];
		}elseif(substr($order['OrderType'],6,3)=="BUY"){
			//buy
			$buys++;
			$tot_buy += $order['Price'];
			$amounttraded += ($order['Quantity'] - $order['QuantityRemaining']);
			if($checkbal>0){
				$boughtprices[] = array('Quantity'=>($order['Quantity']-$order['QuantityRemaining']),'Price'=>$order['PricePerUnit']);
				$checkbal -= ($order['Quantity']-$order['QuantityRemaining']);
			}

		}
		$commission += $order['Commission'];
	}

$curbal = $summ['Bid']*$balance;

$gross = ($tot_sell+$curbal)-$tot_buy;
$net = $gross-$commission;
if($tot_sell>0 || $curbal>0){
$profit = ((($tot_sell+$curbal)/($tot_buy+$commission))*100)-100;
}else{
$profit=0;
}

if(count($boughtprices)>1){
$u=$p=0;
foreach($boughtprices as $d){
	$u+=$d['Quantity'];
	$p+=$d['Quantity']*$d['Price'];
}
$boughtprice = round(($p/$u),8);
}elseif(count($boughtprices)==1){
	$boughtprice = $boughtprices[0]['Price'];
}

	echo "Stats for market ".$pair.PHP_EOL;
	echo "Buys and Sells: ".($buys+$sells) . "  ($buys/$sells)".PHP_EOL;
	echo "Volume Traded:" . round($amounttraded).($amounttraded>0?" since ".$hist[count($hist)-1]['TimeStamp']:"").PHP_EOL;
	echo "Total Buy / Sell: " . number_format($tot_buy,8). "\t" . number_format($tot_sell,8).PHP_EOL;
	echo "Current Balance: ALT (BTC): ".number_format($balance,2)." (".number_format($curbal,5).")".PHP_EOL;
	echo "Last purchase price (averaged): ".number_format($boughtprice,8)." ".(count($boughtprices)>1?"(yes)":"").PHP_EOL;
	if($balance > 0){
		echo "Minimum price to sell to breakeven: " . number_format(($boughtprice*1.0055),8).PHP_EOL;
		echo "Minimum price to sell 1% profit: " . number_format(($boughtprice*1.0155),8).PHP_EOL;
		echo "Minimum price to sell 2% profit: " . number_format(($boughtprice*1.0255),8).PHP_EOL;
		
	}
	echo "Gross profit: " . $gross.PHP_EOL;
	echo "Commission paid on pair: " . $commission.PHP_EOL;
	echo "net profit: ".$net." (".round($profit,2)."%)".PHP_EOL;

echo "24h Volume BTC: ".$summ['BaseVolume'].PHP_EOL;
echo "Open Orders: " . $summ['OpenBuyOrders'] . " / " . $summ['OpenSellOrders'].PHP_EOL;

$trend = ($summ['Last']/$summ['PrevDay'])*100;
$spread = (($summ['High']/$summ['Low'])*100)-100;

echo "Last Price vs 24h: " . $summ['Last'] . " vs " . $summ['PrevDay'] . "(" .($trend>100?"UP ":"DOWN "). number_format($trend-100,1) . "%)".PHP_EOL;

if($summ['BaseVolume']<50){
//	echo "LOW VOLUME, Recommend ditching".PHP_EOL;
	$droppoints++;
}
if($trend<60){
//	echo "Large 24h Drop, Recommend ditching".PHP_EOL;
	$droppoints++;
}
if(($summ['OpenBuyOrders']<100)||($summ['OpenSellOrders']<100)){
//	echo "Few orders, recommend ditching".PHP_EOL;
	$droppoints++;
}
if($spread<2){
//	echo "Tight Spread, recommend dropping".PHP_EOL;
	$droppoints++;
}
if($spread>40){
//	echo "Massive Spread, recommend dropping".PHP_EOL;
	$droppoints++;
}

if($droppoints>2){
	$wantcoin = false;
	echo "Good candidate to consider dropping".PHP_EOL;
}

if($droppoints==0){
	$wantcoin = true;
	echo "Good candidate to add".PHP_EOL;
}



echo PHP_EOL.PHP_EOL.PHP_EOL;

	$results[$pair] = array('buys'=>$buys,'sells'=>$sells,'amount'=>$amounttraded,'tot_buy'=>$tot_buy,'tot_sell'=>$tot_sell,'commission'=>$commission,'net'=>$net, 'gross'=>$gross,'profit'=>$profit,'balance'=>$balance,'have'=>$havecoin,'want'=>$wantcoin);

	$abuys += $buys;
	$asells += $sells;
	$aamounttraded += $amounttraded;
	$acommission += $commission;
	$atot_buy += $tot_buy;
	$atot_sell += $tot_sell;
	$agross += $gross;
	$anet += $net;
}

$aprofit = (($atot_sell-$atot_buy-$acommission)/$atot_sell)*100;



uasort($results,'sort_profit');
$results = array_filter($results,'filter_shitcoins');


	echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
$c=0;
foreach($results as $p=>$r){
$c++;
if($c>20){
	echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
	$c=0;
}

	echo $p.(strlen($p)<8?"\t\t":"\t").($r['buys']+$r['sells']).' ('.$r['buys'].'/'.$r['sells'].')'."\t".$r['amount']."\t\t".number_format($r['tot_buy'],8)."\t\t".number_format($r['tot_sell'],8)."\t".number_format($r['commission'],8)."\t\t".number_format($r['net'],8)."\t\t".number_format($r['profit'],2)."%\t\t".number_format($r['balance'],8).PHP_EOL;
	
if($r['have']&&!$r['want']){
echo "^^DROP^^".PHP_EOL;
$drop[] = $p;
}
if($r['want']&&!$r['have']){
echo "^^WANT^^".PHP_EOL;
$want[] = $p;
}

}
if($c>8){
	echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
}
echo "TOTAL\t\t".($abuys+$asells) . "\t\t" . round($aamounttraded)."\t\t" . number_format($atot_buy,8). "\t\t" . number_format($atot_sell,8)."\t\t" . number_format($acommission,8)."		" . number_format($anet,8)."	".round($aprofit,2)."%	".PHP_EOL;
echo "\t\t\t($abuys/$asells)\t\t".PHP_EOL;

var_dump($want);
foreach($want as $key=>$pr){
echo '"'.$pr.'": {
                "strategy": "'.$defstrat.'",
                "override": {}
            },'.PHP_EOL;

}



// Helper Functions

function sort_profit($a, $b){
	return ($a['profit'] < $b['profit'])? -1 : 1;
}

function filter_shitcoins($arr){
	return ($arr['have'] || $arr['want']);
}


?>
