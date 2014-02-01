var graphite_url = "http://172.21.42.152";  // enter your graphite url, e.g. http://your.graphite.com
var giraffeHost = "http://172.21.42.152:8080";

 

var dashboards = 
[
  { "name": "Throughput vs active users",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

        "alias": "Throughput vs active users",
        "target": ["gatling.tif2.allRequests.ok.count",  
                    "gatling.tif2.users.allUsers.active"],   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //  "description": "Throughput vs active users",
        "interpolation": "cardinal",
        "renderer": "line",
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,

      },
	]  
  },
  { "name": "Transaction Response Times 95 percentile",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

    "alias": "Transaction Response Times 95 percentile",
        "target": ["aliasByNode(gatling.tif2.*.*.ok.percentiles95,2,3)", 
					"aliasByNode(gatling.tif2.*.ok.percentiles95,2)"],
		
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
    //    "description": "Throughput vs active users",
        "interpolation": "cardinal",
        "renderer": "line",
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"max" : 1500,
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,
      },
	]  
  },
  { "name": "Total Transactions per Second",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

            "alias": "Total Transactions per Second",
        "target": ["gatling.tif2.allRequests.ok.count",  
                    "gatling.tif2.allRequests.ko.count"],   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
    //    "description": "Throughput vs active users",
        "interpolation": "cardinal",
        "renderer": "line",
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,
      },
	]
  },
{ "name": "Transactions per Second",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

         "alias": "Transactions per Second",
        "target":["aliasByNode(gatling.tif2.*.*.ok.count,2,3)", 
					"aliasByNode(gatling.tif2.*.ok.count,2)"],
			
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
    //    "description": "Throughput vs active users",
        "interpolation": "cardinal",
        "renderer": "line",
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,
      },
	]
  },	
    
  { "name": "JVM Heap MB in Use",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "JVM Heap MB in Use",
        "target": "aliasByNode(newrelic.*.Memory_Heap_Used.used,1,2,3))",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Number of powerups played per type of powerup",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,
      },

	]
  },

  { "name": "GC Scavenge time percentage",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "GC Scavenge time percentage",
        "target": "aliasByNode(newrelic.*.GC_PS_Scavenge.time_percentage,1,2,3))",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Number of powerups played per type of powerup",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
        "benchmarkwarning" : 0.1,
	 "benchmarkissue" : 0.25,
      },

	]
  },


  { "name": "CPU",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
	 {
         "alias": "CPU",              
        "target": "aliasByNode(newrelic.*.CPU_User_Utilization.percent,1,2,3)",	   

        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"benchmarkwarning" : 0.1,
		"benchmarkissue" : 0.25,
      },

	]  
  },
  	
  { "name": "Database Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
        "alias": "Database Average Response Times",
        "target": "aliasByNode(newrelic.*.Database_select.average_response_time,1,2,3)",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
	"benchmarkwarning" : 0.1,
	"benchmarkissue" : 0.25,
	"null_as": 0, 
      },

	]
  },
  { "name": "Database Calls per minute",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
	 {
        "alias": "Database Calls per minute",
        "target": "aliasByNode(newrelic.*.Database_all.calls_per_minute,1,2,3)",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"benchmarkwarning" : 0.1,
		"benchmarkissue" : 0.25,
	"null_as": 0, 
      },

	]
  },	
  { "name": "WebTransaction Requests per minute",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "WebTransaction Requests per minute",
        "target": "aliasByNode(newrelic.*.WebTransaction.requests_per_minute,1,2,3)",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"benchmarkwarning" : 0.1,
		"benchmarkissue" : 0.25,
      },


	]
  },	
  { "name": "WebTransaction Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "WebTransaction Average Response Times",
        "target": "aliasByNode(newrelic.*.WebTransaction.average_response_time,1,2,3)",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"benchmarkwarning" : 0.1,
		"benchmarkissue" : 0.25,
      },


	]  
  },
  { "name": "Errors per minute",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Errors per minute",
        "target": "aliasByNode(newrelic.*.Errors_all.errors_per_minute,1,2,3)",   
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
		//"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
		"benchmarkwarning" : 0.1,
		"benchmarkissue" : 0.25,
      },


	]  
  },
  
];
var scheme = [

              //'#423d4f',
              //'#4a6860',
              '#848f39',
              '#a2b73c',
              '#ddcb53',
              '#c5a32f',
              '#7d5836',
              '#963b20',
              '#7c2626',
              ].reverse();

function relative_period() { return (typeof period == 'undefined') ? 1 : parseInt(period / 7) + 1; }
function entire_period() { return (typeof period == 'undefined') ? 1 : period; }
function at_least_a_day() { return entire_period() >= 1440 ? entire_period() : 1440; }
