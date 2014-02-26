var graphite_url = "http://172.21.42.152";  // enter your graphite url, e.g. http://your.graphite.com
var giraffeHost = "http://172.21.42.152:8080/TIF_LE";

 

var dashboards = 
[
    
  { "name": "JVM Heap bytes in Use",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "JVM Heap bytes in Use",
        "target": [
                    "aliasByNode(kl1251ay.Tomcat.*.GC_Heap.Bytes_In_Use,2,3,4)",   
                    "aliasByNode(kl12519q.Tomcat.*.GC_Heap.Bytes_In_Use,2,3,4)"
                  ],
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
  { "name": "CPU per node",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
   {
         "alias": "CPU per node",              
        "target": [
                  "averageSeries(aliasByNode(kl1251ay.Tomcat.*.CPU.Processor_*.Utilization_percentage_aggregate,2,4))",
                  "averageSeries(aliasByNode(kl12519q.Tomcat.*.CPU.Processor_*.Utilization_percentage_aggregate,2,4))"    
                  ],    

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
  { "name": "ThreadPool currentThreadsBusy",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
    "alias": "ThreadPool currentThreadsBusy",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,2,4,6)",   
                  "aliasByNode(kl12519q.Tomcat.*.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,2,4,6)"
                  ],
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
  { "name": "JDBC connectionPool numActive",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
   {
     "alias": "JDBC connectionPool numActive",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.NumActive,2,7,8)",   
                  "aliasByNode(kl12519q.Tomcat.*.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.NumActive,2,7,8)"
                  ],
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
  { "name": "Oracle Backend Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
        "alias": "Oracle Backend Average Response Times",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Backends.Oracle_DB.Average_Response_Time_ms,2,4,5)",   
                  "aliasByNode(kl12519q.Tomcat.*.Backends.Oracle_DB.Average_Response_Time_ms,2,4,5)"
                  ],
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
  { "name": "Oracle Backend Responses per 15sec",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
   {
        "alias": "Oracle Backend Responses per 15sec",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Backends.Oracle_DB.Responses_Per_Interval,2,4,5)",   
                  "aliasByNode(kl12519q.Tomcat.*.Backends.Oracle_DB.Responses_Per_Interval,2,4,5)"   
                  ],
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
  { "name": "Frontends Responses per 15 sec",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Frontends Responses per 15 sec",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.tif.Responses_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.content.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.rootContext.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.tif.Responses_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.content.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.rootContext.Responses_Per_Interval,2,3,4,5)"
                  ],        
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
  { "name": "Frontends Average Response Times",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Frontends Average Response Times",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.tif.Average_Response_Time_ms,2,3,4,5)",   
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.content.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.rootContext.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.tif.Average_Response_Time_ms,2,3,4,5)",   
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.content.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.rootContext.Average_Response_Time_ms,2,3,4,5)"
                  ],
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
  { "name": "Frontends Errors per 15 sec",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "Frontends Errors per 15 sec",
        "target": [
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.tif.Errors_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.content.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl1251ay.Tomcat.*.Frontends.Apps.rootContext.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.tif.Errors_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.content.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12519q.Tomcat.*.Frontends.Apps.rootContext.Errors_Per_Interval,2,3,4,5)"
                  ],        
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
