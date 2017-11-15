<?PHP


$basedir = dirname(__FILE__);
include_once($basedir . '/bittrex-functions.php');
global $config;
$config = json_clean_decode(file_get_contents($basedir.'/config.js'),true);

$orders = get_open_orders();
$currencies = get_currencies();
$markets = get_markets();

if(count($orders)>0){
foreach($orders as $key=>$order){

if((time()-strtotime($order['Opened'])) > 300){
echo "need to cancel order" . PHP_EOL;
cancel_order($order['OrderUuid']);
}

}
}

?>
