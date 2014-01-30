var graphite_url = "http://172.26.168.161:8080";  // enter your graphite url, e.g. http://your.graphite.com

var dashboards = 
[
  { "name": "Throughput vs active users",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

        "alias": "Throughput vs active users",
        "target": ["keepLastValue(gatling.basictest.allRequests.ok.count)",  
                    "keepLastValue(gatling.basictest.users.allUsers.active)"],   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

    "alias": "Transaction Response Times 95 percentile",
        "target": "keepLastValue(aliasByNode(gatling.basictest.*.ok.percentiles95,2))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

            "alias": "Transactions per Second",
        "target": ["keepLastValue(gatling.basictest.allRequests.ok.count)",  
                    "keepLastValue(gatling.basictest.allRequests.ko.count)"],   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "JVM Heap bytes in Use",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "JVM Heap bytes in Use",
        "target": "keepLastValue(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_[1-4].GC_Heap.Bytes_In_Use,3,4,5))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "CPU per core",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
	 {
         "alias": "CPU per core",              
        "target": ["keepLastValue(averageSeries(aliasByNode(trends.kl12c282.Tomcat.pipeline_test_a_ae1_kl12c282_server_1.CPU.Processor_*.Utilization_percentage_aggregate,2,4)))",
					"keepLastValue(averageSeries(aliasByNode(trends.kl12c293.Tomcat.pipeline_test_a_ae1_kl12c293_server_1.CPU.Processor_*.Utilization_percentage_aggregate,2,4)))"],
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "ThreadPool currentThreadsBusy",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
    "alias": "ThreadPool currentThreadsBusy",
        "target": "keepLastValue(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_*.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,2,4,6))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "JDBC connectionPool numActive",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
	 {
     "alias": "JDBC connectionPool numActive",
        "target": "keepLastValue(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_*.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_pipeline_test_db.type_ConnectionPool.NumActive,2,7,8))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "Oracle Backend Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
        "alias": "Oracle Backend Average Response Times",
        "target": "keepLastValue(averageSeries(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_*.Backends._*__Oracle_DB.Average_Response_Time_ms,2,4,5)))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "Oracle Backend Responses per 15sec",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
	 {
        "alias": "Oracle Backend Responses per 15sec",
        "target": "keepLastValue(averageSeries(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_*.Backends._*__Oracle_DB.Responses_Per_Interval,2,4,5)))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "Frontends Responses per 15 sec",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Frontends Responses per 15 sec",
        "target": "keepLastValue(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_[1-4].Frontends.Apps.Customer_API.Responses_Per_Interval,2,3,4,5))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
  { "name": "Frontends Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "Pipeline-test CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Frontends Average Response Times",
        "target": "keepLastValue(aliasByNode(trends.*.Tomcat.pipeline_test_a_ae1_*_server_[1-4].Frontends.Apps.Customer_API.Average_Response_Time_ms,2,3,4,5))",   
        "events": "Deployment",  // instead of annotator, if you use the graphite events feature
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
