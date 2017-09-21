<?PHP

$basedir = dirname(__FILE__);
global $config;
$config = json_clean_decode(file_get_contents($basedir.'/config.js'),true);

$orders = get_open_orders();
$currencies = get_currencies();
$markets = get_markets();

$results = array();

$balances = get_balances();
        $abuys = 0;
        $asells = 0;
        $aamounttraded = 0;
        $acommission = 0;
        $atot_buy = 0;
        $atot_sell = 0;
        $agross = 0;
        $anet = 0;


foreach($config['pairs']['bittrex'] as $pair=>$data){
echo "Checking ".$pair.PHP_EOL;
        $hist = get_order_history($pair);


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
                }
                $commission += $order['Commission'];
        }
        $currency = str_replace('BTC-','',$pair);
        $balance = array_key_exists($currency,$balances)?$balances[$currency]['balance']:0;


$curtick = get_ticker($pair);
$curbal = ($curtick['Last']*$balance)*0.9975;

$gross = ($tot_sell+$curbal)-$tot_buy;
$net = $gross-$commission;
$profit = (($tot_sell+$curbal)/($tot_buy+$commission))-1;



        //echo "Stats for market ".$hist[0]['Exchange'].PHP_EOL;
//      echo $pair;
//      for($i=1;$i<(13-strlen($pair));$i++){echo " ";}
//echo ($buys+$sells) . "  ($buys/$sells)\t\t" . round($amounttraded)."\t\t" . number_format($tot_buy,8). "\t\t" . number_format($tot_sell,8)."\t\t" . $gross."         " . $commission."               " . $net."   ".round($profit,2)."%   ".$balance.PHP_EOL;

        $results[$pair] = array('buys'=>$buys,'sells'=>$sells,'amount'=>$amounttraded,'tot_buy'=>$tot_buy,'tot_sell'=>$tot_sell,'commission'=>$commission,'net'=>$net, 'gross'=>$gross,'profit'=>$profit,'balance'=>$balance);

        $abuys += $buys;
        $asells += $sells;
        $aamounttraded += $amounttraded;
        $acommission += $commission;
        $atot_buy += $tot_buy;
        $atot_sell += $tot_sell;
        $agross += $gross;
        $anet += $net;

}

$aprofit = ($atot_sell/($atot_buy-$acommission))-1;



uasort($results,'sort_profit');
        echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tGross Profit\t\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
$c=0;
foreach($results as $p=>$r){
$c++;
if($c>20){
        echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tGross Profit\t\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
        $c=0;
}

        echo $p.(strlen($pair)<8?"\t\t":"\t").($r['buys']+$r['sells']).' ('.$r['buys'].'/'.$r['sells'].')'."\t".$r['amount']."\t\t".number_format($r['tot_buy'],8)."\t\t".number_format($r['tot_sell'],8)."\t".number_format($r['gross'],8)."\t\t".number_format($r['commission'],8)."\t\t".number_format($r['net'],8)."\t\t".$r['balance'].PHP_EOL;
}
if($c>8){
        echo "PAIR\t\tTotal Trades\tTotal Volume\tTotal Buy Cost\t\tTotal Sell Value\tGross Profit\t\tCommission\t\tNet Profit\t\tBalance".PHP_EOL."           (Buys/Sells)".PHP_EOL;
}
echo "TOTAL\t\t".($abuys+$asells) . "\t\t" . round($aamounttraded)."\t\t" . number_format($atot_buy,8). "\t\t" . number_format($atot_sell,8)."\t\t" . $agross."         " . $acommission."              " . $anet."  ".round($aprofit,2)."%  ".PHP_EOL;
echo "\t\t\t($abuys/$asells)\t\t".PHP_EOL;



// Helper Functions

function sort_profit($a, $b){
        return ($a['profit'] < $b['profit'])? -1 : 1;
}

function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) {
    // search and remove comments like /* */ and //
    $json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);
    if(version_compare(phpversion(), '5.4.0', '>=')) {
        $json = json_decode($json, $assoc, $depth, $options);
    }
    elseif(version_compare(phpversion(), '5.3.0', '>=')) {
        $json = json_decode($json, $assoc, $depth);
    }
    else {
        $json = json_decode($json, $assoc);
    }
    return $json;
}


function bittrex_api_query($method,$params=array()){
global $config;
$apikey=$config['exchanges']['bittrex']['key'];
$apisecret=$config['exchanges']['bittrex']['secret'];
$nonce=time();
$extra = '';
if(count($params)>0){
foreach($params as $key=>$value){
        $extra .= '&'.$key.'='.$value;
}
}
$uri='https://bittrex.com/api/v1.1/' . $method . '?apikey='.$apikey.'&nonce='.$nonce . $extra;
$sign=hash_hmac('sha512',$uri,$apisecret);
$ch = curl_init($uri);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('apisign:'.$sign));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$execResult = curl_exec($ch);
$obj = json_clean_decode($execResult,true);
//var_export($obj);
return $obj['result'];
}


function get_open_orders(){
        return bittrex_api_query('market/getopenorders');
}

function get_markets(){
        return bittrex_api_query('public/getmarkets');
}

function get_currencies(){
        return bittrex_api_query('public/getcurrencies');
}

function get_ticker($pair){
        return bittrex_api_query('public/getticker',array('market'=>$pair));
}


function get_order_history($pair=NULL){
        $params=array();
        if(!$pair==NULL){
                $params['market'] = $pair;
        }
        return bittrex_api_query('account/getorderhistory',$params);
}


function get_balances(){
        $raw = bittrex_api_query('account/getbalances');
        $ret = array();
//var_export($raw);
        foreach($raw as $data){
                $ret[$data['Currency']] = array('balance'=>$data['Balance']);
        }
        return $ret;
}

function get_balance($currency){
        return bittrex_api_query('account/getbalance',array('currency'=>$currency));

}


?>
