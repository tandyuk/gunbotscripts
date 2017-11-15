<?PHP


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

function get_market_summaries(){
	return bittrex_api_query('public/getmarketsummaries');
}

function get_market_summary($pair){
	$arr = bittrex_api_query('public/getmarketsummary',array('market'=>$pair));
	return $arr[0];
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


function cancel_order($uuid){
		return bittrex_api_query('market/cancel',array('uuid'=>$uuid));
}

?>
