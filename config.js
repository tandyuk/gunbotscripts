{
	"servers":{
		"gunbot": {  //server is matched by gethostname - php -r 'echo gethostname();'
			"pairs_per_instance": 1,  //how many pairs each bot should run
			"BOT_DELAY": 21,  //You can set this here, or omit it. If omitted, bot will use the default from the bot{} section, or allow this to be overridden by a specific pair. If running more than 1 pair per instance, pairs will be grouped so that all pairs run by a single bot have the same bot_delay.
			"max_instances": 100,  //optional maximum number of instances to run
			"hostname": "192.168.66.120"			
		}/*,
		"gunbot2": {
			"pairs_per_instance": 1,  //how many pairs each bot should run
			"BOT_DELAY": 60,  //You can set this here, or omit it. If omitted, bot will use the default from the bot{} section, or allow this to be overridden by a specific pair. If running more than 1 pair per instance, pairs will be grouped so that all pairs run by a single bot have the same bot_delay.
			"max_instances": 40,  //optional maximum number of instances to run
			"period_storage_ticker": 300,
			"interval_ticker_update": 30000,
		//	"gbver": "5_0_5",  //optional allow bot version to be overridden per-server
			"exchanges":{  //allow specific api key per bot, but note I only plan to support bittrex. If you want to add another, feel free to fork :)
				"bittrex":{
					"key":"",
					"secret":""
				}
			},
			"pairs":{
				"bittrex":{
					"BTC-IOP": {
                          "strategy": "stepgain"
                        },
				"BTC-TRIG": {
                         "strategy": "stepgain"
                        },
                        "BTC-ETH": {
                                "strategy": "stepgain"
                        },
                        "BTC-START": {
                                "strategy": "stepgain"
                        }
				}

			}
		
			
		}*/
	},	
	"overrides": {
		"james": {
			"REQUIRES": "stepgain",
                        "PERIOD": 5,
                        "BUYLVL1": 1.5,
                        "BUYLVL2": 2.5,
                        "BUYLVL3": 4,
                        "SELLLVL1": 0.9,
                        "SELLLVL2": 1.2,
                        "SELLLVL3": 1.9,
                        "BUYLVL": 2,
                        "SELLLVL": 2,
                        "LASTPOINTS": 6,
                        "AVGPOINTS": 30,
                        "AVGMINIMUM": 1e-8,
                        "EMA1": 8,
                        "EMA2": 4
		},
		"lostinspace": {
//custom settings from lostinspace - 17th sept
			"REQUIRES": "stepgain",
                        "PERIOD": 7,
                        "BUYLVL1": 1.295,
                        "BUYLVL2": 2.496,
                        "BUYLVL3": 13.845,
                        "SELLLVL1": 0.834,
                        "SELLLVL2": 1.593,
                        "SELLLVL3": 6.753,
                        "BUYLVL": 2,
                        "SELLLVL": 2,
                        "LASTPOINTS": 5,
                        "AVGPOINTS": 24,
                        "AVGMINIMUM": 1e-8,
                        "EMA1": 5,
                        "EMA2": 3
		},
		"diesel": {
		"REQUIRES": "stepgain",
		"PERIOD": 5,
		"BUYLVL1": 1.5,
		"BUYLVL2": 1.6,
		"BUYLVL3": 70,
		"SELLLVL1": 1.5,
		      "SELLLVL2": 1.6,
		      "SELLLVL3": 70,
		      "BUYLVL": 2,
		      "SELLLVL": 2,
		      "LASTPOINTS": 5,
		      "AVGPOINTS": 20,
		      "AVGMINIMUM": 0.00000001,
		      "EMA1": 4,
		      "EMA2": 2,
		      "PANIC_SELL": false,
		      "DOUBLE_UP": true
		},
		"richz": {
//Rich Z's Microprofits strategy
			"REQUIRES": "stepgain",
			"PERIOD": 5,
			"BUYLVL1": 1.6, 
      "BUYLVL2": 2.6, 
      "BUYLVL3": 20, 
      "SELLLVL1": 0.65, 
      "SELLLVL2": 0.85, 
      "SELLLVL3": 2, 
      "BUYLVL": 2, 
      "SELLLVL": 2, 
      "LASTPOINTS": 5, 
      "AVGPOINTS": 20, 
      "AVGMINIMUM": 0.00000001, 
      "EMA1": 4,
      "EMA2": 2,
      "PANIC_SELL": false,
      "DOUBLE_UP": false,
      "STOP_LIMIT": 10,
	"MIN_VOLUME_TO_BUY": 0.005,
      "MIN_VOLUME_TO_SELL": 0.00495
		},
		"dante": {
        "interval_ticker_update": 15000,
        "period_storage_ticker": 2000,
		"REQUIRES": "bbstepgain",
            "TRADING_LIMIT": 0.002,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 2,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 25,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "SELLLVL1": 0.8,
            "SELLLVL2": 3,
            "SELLLVL3": 70,
            "BUYLVL": 2,
            "SELLLVL": 1,
            "LASTPOINTS": 5,
            "AVGPOINTS": 250,
            "AVGMINIMUM": 0.00000001,
            "PP_BUY": 0.00000001,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001
		}
	},
	"pairs": {
		//pairs defined here take priority over pairs defined per server.
		//this setting takes priority. if you want a specific server to run a pair, do not list it here
		"bittrex": {
			"BTC-VTC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-GRS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-XLM": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-EXP": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-GNO": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-PTOY": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-QTUM": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-RISE": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-ETH": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-DASH": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-OK": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-ETC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-ZEC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-LTC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-NEO": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-OMG": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-LSK": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-XMR": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-XRP": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-MONA": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
            "BTC-ADA": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-MAID": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-DOGE": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-FTC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-RDD": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-NXT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-POT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-EMC2": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-LBC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-GAME": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-NAV": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-VIA": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-PKB": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-SYS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-NEOS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-DGB": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-XEM": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-BTS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-FCT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-PIVX": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-XVG": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-DCR": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-STEEM": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-ARK": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-WAVES": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-GNT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-EDG": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-XZC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-STRAT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-TRIG": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-ARDR": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-KMD": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-IOP": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-GBYTE": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-BNT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-SC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-ZEN": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-BAT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-SNT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-SALT": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-RCN": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-MCO": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-XEL": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-MTL": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-PAY": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-FUN": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-STORJ": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-ADX": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-CVC": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
			"BTC-CLUB": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-MLN": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-WINGS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-TKS": {
                "strategy": "bbrsistepgain",
                "override": {}
            },
"BTC-LGD": {
                "strategy": "bbrsistepgain",
                "override": {}
            }
		}
	},
	"exchanges": {
		"poloniex": {
			"key": "",
			"secret": ""
		},
		"kraken": {
			"key": "",
			"secret": ""
		},
		"bittrex": {
			"key": "",
			"secret": ""
		}
	},
	"bot": {
		"debug": false,
		"period_storage_ticker": 2000,
		"interval_ticker_update": 25000,
		"timeout_buy": 60000,
		"timeout_sell": 60000,
		"WATCH_MODE": false,
		"VERBOSE": true,
		"TV_GAIN": 0.6,
		"TV_TRADING_LIMIT_BUY": 0.001,
		"TV_PYRAMID": false,
		"TV_TRADING_LIMIT_SELL": 0.001,
		"TV_PROTECTION": true,
		"RETRY_TV_ORDER": false,
		"BOT_DELAY": 20
	},
	"ws": {
		"port": 5000,
		"clientport": 3000,
		"hostname": "127.0.0.1"
	},
	"imap_listener": {
		"enabled": false,
		"authorized_froms": [
			"noreply@tradingview.com"
		],
		"user": "YOUR_EMAIL_HERE",
		"password": "YOUR_PASSWORD_HERE",
		"host": "imap.gmail.com",
		"port": 993,
		"tls": true,
		"tlsOptions": {
			"rejectUnauthorized": false
		}
	},
	"strategies": {
        "bbrsistepgain": {
            "NAME": "bbrsistepgain",
            "TRADING_LIMIT": 0.05,
            "PERIOD": 15,
            "RSI_BUY_LEVEL": 45,
            "GAIN": 0.8,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 30,
            "STDV": 2,
            "SMAPERIOD": 50,
            "SELLLVL1": 0.8,
            "SELLLVL2": 1.6,
            "SELLLVL3": 70,
            "SELLLVL": 3,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 180
        },
        "bbstepgain": {
            "NAME": "bbstepgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 30,
            "STDV": 2,
            "SMAPERIOD": 50,
            "SELLLVL1": 0.6,
            "SELLLVL2": 2,
            "SELLLVL3": 70,
            "SELLLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 300
        },
		        "bb": {
            "NAME": "bb",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 300
        },
        "tsslbb": {
            "NAME": "tsslbb",
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_RANGE": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gain": {
            "NAME": "gain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 2,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gainbbrsi": {
            "NAME": "gainbbrsi",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_LEVEL": 0.6,
            "RSI_SELL_LEVEL": 70,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbrsigain": {
            "NAME": "bbrsigain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "RSI_BUY_LEVEL": 30,
            "GAIN": 2,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "pp": {
            "NAME": "pp",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_BUY": 1e-8,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "ppbbrsi": {
            "NAME": "ppbbrsi",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "PP_BUY": 1e-8,
            "RSI_SELL_LEVEL": 70,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "tsslpp": {
            "NAME": "tsslpp",
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_RANGE": 0.6,
            "PP_SELL": 0.12345678,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbrsipp": {
            "NAME": "bbrsipp",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "RSI_BUY_LEVEL": 30,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgain": {
            "NAME": "stepgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "SELLLVL1": 0.6,
            "SELLLVL2": 2,
            "SELLLVL3": 70,
            "BUYLVL": 2,
            "SELLLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 300
        },
        "tsslstepgain": {
            "NAME": "tsslstepgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "BUY_RANGE": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "SELLLVL1": 0.6,
            "SELLLVL2": 2,
            "SELLLVL3": 70,
            "SELLLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "tssl": {
            "NAME": "tssl",
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_RANGE": 0.6,
            "SELL_RANGE": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "tsslgain": {
            "NAME": "tsslgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_RANGE": 0.6,
            "BUY_LEVEL": 0.1,
            "GAIN": 2,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbrsitssl": {
            "NAME": "bbrsitssl",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "RSI_BUY_LEVEL": 30,
            "SELL_RANGE": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "pptssl": {
            "NAME": "pptssl",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "SELL_RANGE": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_BUY": 1e-8,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgaintssl": {
            "NAME": "stepgaintssl",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "SELL_RANGE": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "BUYLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gaintssl": {
            "NAME": "gaintssl",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 2,
            "SELL_RANGE": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbtssl": {
            "NAME": "bbtssl",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "SELL_RANGE": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbrsi": {
            "NAME": "bbrsi",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "RSI_BUY_LEVEL": 30,
            "RSI_SELL_LEVEL": 70,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 1,
            "LOW_BB": 1,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgainbbrsi": {
            "NAME": "stepgainbbrsi",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.6,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 49,
            "LOW_BB": 49,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "RSI_SELL_LEVEL": 70,
            "BUYLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbbbrsi": {
            "NAME": "bbbbrsi",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_LEVEL": 0.6,
            "RSI_SELL_LEVEL": 70,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "tsslbbrsi": {
            "NAME": "tsslbbrsi",
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "BUY_RANGE": 0.6,
            "RSI_SELL_LEVEL": 70,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "TSSL_TARGET_ONLY": true,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbrsibb": {
            "NAME": "bbrsibb",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 5,
            "RSI_BUY_LEVEL": 30,
            "GAIN": 0.6,
            "EMA1": 24,
            "EMA2": 12,
            "HIGH_BB": 45,
            "LOW_BB": 45,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbgain": {
            "NAME": "bbgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gainbb": {
            "NAME": "gainbb",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgainbb": {
            "NAME": "stepgainbb",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "BUYLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "bbpp": {
            "NAME": "bbpp",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "ppbb": {
            "NAME": "ppbb",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_BUY": 1e-8,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gainstepgain": {
            "NAME": "gainstepgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "SELLLVL1": 0.6,
            "SELLLVL2": 2,
            "SELLLVL3": 70,
            "SELLLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgaingain": {
            "NAME": "stepgaingain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "BUYLVL": 2,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "gainpp": {
            "NAME": "gainpp",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "ppgain": {
            "NAME": "ppgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "PP_BUY": 1e-8,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "stepgainpp": {
            "NAME": "stepgainpp",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "BUYLVL1": 0.6,
            "BUYLVL2": 2,
            "BUYLVL3": 70,
            "BUYLVL": 2,
            "PP_SELL": 0.12345678,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
        "ppstepgain": {
            "NAME": "ppstepgain",
            "TRADING_LIMIT": 0.001,
            "PERIOD": 15,
            "BUY_LEVEL": 0.1,
            "GAIN": 0.6,
            "EMA1": 16,
            "EMA2": 8,
            "HIGH_BB": 40,
            "LOW_BB": 40,
            "STDV": 2,
            "SMAPERIOD": 50,
            "SELLLVL1": 0.6,
            "SELLLVL2": 2,
            "SELLLVL3": 70,
            "SELLLVL": 2,
            "PP_BUY": 1e-8,
            "PANIC_SELL": false,
            "DOUBLE_UP": false,
            "DOUBLE_UP_CAP": 1,
            "STOP_LIMIT": 60,
            "BUY_ENABLED": true,
            "MIN_VOLUME_TO_BUY": 0.0001,
            "MIN_VOLUME_TO_SELL": 0.0001,
            "TRADES_TIMEOUT": 600
        },
		"selloutgain": {
			//special case: only checks every 5 mins and will sell bag at 1% profit.
			//can be used with double up to reduce bag cost
			"REQUIRES":"gain",
			"BOT_DELAY": 600, //roughly every 5 mins
        	        "period_storage_ticker": 120,
 	        	"interval_ticker_update": 300000,
			"GUNTHY_API": false,
			"BTC_TRADING_LIMIT": 0.05,
			"PERIOD": 5,
			"BUY_LEVEL": 2,
			"GAIN": 1,
			"EMA1": 200,
			"EMA2": 50,
			"HIGH_BB": 45,
			"LOW_BB": 45,
			"STDV": 2,
			"SMAPERIOD": 50,
			"PANIC_SELL": false,
			"DOUBLE_UP": true,
			"STOP_LIMIT": 50,
			"BUY_ENABLED": false,
			"MIN_VOLUME_TO_BUY": 0.001,
			"MIN_VOLUME_TO_SELL": 0.0001
		},
        "jamesstepgain": {
            "BTC_TRADING_LIMIT": 0.05,
            "PERIOD": 5,
            "BUYLVL1": 0.8,
            "BUYLVL2": 1.3,
            "BUYLVL3": 3,
            "SELLLVL1": 0.9,
            "SELLLVL2": 1.3,
            "SELLLVL3": 3,
            "BUYLVL": 2,
            "SELLLVL": 2,
            "LASTPOINTS": 30,
            "AVGPOINTS": 200,
            "AVGMINIMUM": 1.0e-8,
            "EMA1": 4,
            "EMA2": 2,
            "PANIC_SELL": false,
			"GUNTHY_API": false,
        	    "STOP_LIMIT": 35,
	            "BUY_ENABLED": true,
	            "MIN_VOLUME_TO_BUY": 0.001,
	            "MIN_VOLUME_TO_SELL": 0.0095
	        },
        "speedstepgain": {
			"REQUIRES": "stepgain",
            "BTC_TRADING_LIMIT": 0.05,
			"BOT_DELAY": 5,
        	        "period_storage_ticker": 120,
 	        	"interval_ticker_update": 5000,
            "PERIOD": 1,
            "BUYLVL1": 0.8,
            "BUYLVL2": 1.1,
            "BUYLVL3": 2.5,
            "SELLLVL1": 0.9,
            "SELLLVL2": 1.2,
            "SELLLVL3": 3,
            "BUYLVL": 2,
            "SELLLVL": 1,
            "LASTPOINTS": 10,
            "AVGPOINTS": 40,
            "AVGMINIMUM": 1.0e-8,
            "EMA1": 40,
            "EMA2": 10,
			"GUNTHY_API": false,
            "PANIC_SELL": false,
        	    "STOP_LIMIT": 50,
	            "BUY_ENABLED": true,
	            "MIN_VOLUME_TO_BUY": 0.001,
	            "MIN_VOLUME_TO_SELL": 0.0095
	        },
		"defaultstepgain": {
			"REQUIRES": "stepgain",
			"BTC_TRADING_LIMIT": 0.05,
			"PERIOD": 5,
			"BUYLVL1": 5,
			"BUYLVL2": 10,
			"BUYLVL3": 40,
			"SELLLVL1": 0.95,
			"SELLLVL2": 1.2,
			"SELLLVL3": 10,
			"BUYLVL": 2,
			"SELLLVL": 2,
			"LASTPOINTS": 20,
			"AVGPOINTS": 120,
			"AVGMINIMUM": 1e-8,
			"EMA1": 200,
			"EMA2": 50,
			"GUNTHY_API": false,
			"PANIC_SELL": false,
			"STOP_LIMIT": 50,
			"BUY_ENABLED": true,
			"MIN_VOLUME_TO_BUY": 0.01,
			"MIN_VOLUME_TO_SELL": 0.0095
		},
		"selloutstepgain": {
                        //special case: only checks every 5 mins and will sell bag at 1% profit.
                        //can be used with double up to reduce bag cost
                        "REQUIRES":"stepgain",
                        "BOT_DELAY": 600, //roughly every 5 mins
                        "period_storage_ticker": 120,
                        "interval_ticker_update": 300000,

			"BTC_TRADING_LIMIT": 0.05,
			"PERIOD": 5,
			"BUYLVL1": 1.5,
			"BUYLVL2": 2.5,
			"BUYLVL3": 50,
			"SELLLVL1": 0.6,
			"SELLLVL2": 0.8,
			"SELLLVL3": 1.2,
			"BUYLVL": 2,
			"SELLLVL": 1,
			"LASTPOINTS": 6,
			"AVGPOINTS": 30,
			"AVGMINIMUM": 1e-8,
			"EMA1": 8,
			"EMA2": 4,
			"GUNTHY_API": false,
			"PANIC_SELL": false,
			"STOP_LIMIT": 10,
			"BUY_ENABLED": false,
			"MIN_VOLUME_TO_BUY": 0.001,
			"MIN_VOLUME_TO_SELL": 0.0095
		}
	},
	"optionals": {
		"toOverride": {}
	}
}
