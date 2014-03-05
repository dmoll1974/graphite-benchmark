var graphite_url = "http://172.21.42.152";  // enter your graphite url, e.g. http://your.graphite.com
var giraffeHost = "http://172.21.42.152:8080/TIF";

 

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
    //"max" : 1500,
        "benchmarkwarning" : 0.1,
        "benchmarkissue" : 0.25,
        "requirementValue" : 2000,
        "requirementOperator" : "<",
      },
  ]  
  },
  { "name": "Percentage of failed transactions",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
     {

            "alias": "Percentage of failed transactions",
        "target": "alias(asPercent(integral(gatling.tif2.allRequests.ko.count), integral(gatling.tif2.allRequests.all.count)),\"Percentage of failed transactions\")",  
               
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
        "requirementValue" : 2,
        "requirementOperator" : "<",
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
    
{ "name": "JVM Heap bytes in Use",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "JVM Heap bytes in Use",
        "target": [
                    "aliasByNode(kl12c27x.Tomcat.*.GC_Heap.Bytes_In_Use,2,3,4)",   
                    "aliasByNode(kl12c293.Tomcat.*.GC_Heap.Bytes_In_Use,2,3,4)"
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
  { "name": "Percentage of MaxHeap in use",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
         {
        "alias": "Percentage of MaxHeap in use",
        "target": [
                    "alias(asPercent(kl12c27x.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_In_Use, kl12c27x.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_Total),\"kl12c27x cms_rest Percentage Heap in Use/Total Heap\")",  
                    "alias(asPercent(kl12c293.Tomcat.cms_rest_a_ae1_kl12c293_server_1.GC_Heap.Bytes_In_Use, kl12c293.Tomcat.cms_rest_a_ae1_kl12c293_server_1.GC_Heap.Bytes_Total),\"kl12c293 cms_rest Percentage Heap in Use/Total Heap\")",
                    "alias(asPercent(kl12c27x.Tomcat.tif_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_In_Use, kl12c27x.Tomcat.tif_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_Total),\"kl12c27x tif Percentage Heap in Use/Total Heap\")",  
                    "alias(asPercent(kl12c293.Tomcat.tif_a_ae1_kl12c293_server_1.GC_Heap.Bytes_In_Use, kl12c293.Tomcat.tif_a_ae1_kl12c293_server_1.GC_Heap.Bytes_Total),\"kl12c293 tif Percentage Heap in Use/Total Heap\")",  
                    "alias(asPercent(kl12c27x.Tomcat.mosaic_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_In_Use, kl12c27x.Tomcat.mosaic_a_ae1_kl12c27x_server_1.GC_Heap.Bytes_Total),\"kl12c27x mosaic Percentage Heap in Use/Total Heap\")",  
                    "alias(asPercent(kl12c293.Tomcat.mosaic_a_ae1_kl12c293_server_1.GC_Heap.Bytes_In_Use, kl12c293.Tomcat.mosaic_a_ae1_kl12c293_server_1.GC_Heap.Bytes_Total),\"kl12c293 mosaic Percentage Heap in Use/Total Heap\")",  
                    
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
        "requirementValue" : 90,
        "requirementOperator" : "<",
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
                  "alias(averageSeries(kl12c27x.Tomcat.*.CPU.Processor_*.Utilization_percentage_aggregate),\"kl12c27x CPU percentage used\")",
                  "alias(averageSeries(kl12c293.Tomcat.*.CPU.Processor_*.Utilization_percentage_aggregate),\"kl12c293 CPU percentage used\")"    
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
    "requirementValue" : 40,
    "requirementOperator" : "<",
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
                  "aliasByNode(kl12c27x.Tomcat.*.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,2,4,6)",   
                  "aliasByNode(kl12c293.Tomcat.*.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,2,4,6)"
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
  { "name": "Percentage ThreadPool currentThreadsBusy/MaxThreads",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
    {
    "alias": "Percentage ThreadPool currentThreadsBusy/MaxThreads",
        "target": [
                  "alias(asPercent(kl12c27x.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c27x cms_rest Percentage CurrentThreadsBusy/MaxThreads\")",   
                  "alias(asPercent(kl12c293.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c293 cms_rest Percentage CurrentThreadsBusy/MaxThreads\")",   
                  "alias(asPercent(kl12c27x.Tomcat.tif_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c27x tif Percentage CurrentThreadsBusy/MaxThreads\")",   
                  "alias(asPercent(kl12c293.Tomcat.tif_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c293 tif Percentage CurrentThreadsBusy/MaxThreads\")",   
                  "alias(asPercent(kl12c27x.Tomcat.mosaic_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c27x mosaic Percentage CurrentThreadsBusy/MaxThreads\")",   
                  "alias(asPercent(kl12c293.Tomcat.mosaic_a_ae1_kl12c27x_server_1.Tomcat.ThreadPool.http_bio_0_0_0_0_100*.getCurrentThreadsBusy,200),\"kl12c293 mosaic Percentage CurrentThreadsBusy/MaxThreads\")",   
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
        "requirementValue" : 25,
        "requirementOperator" : "<",
      },

  ]
  },  
  { "name": "JDBC connectionPool Percentage numActive/MaxActive",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF CI metrics",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
   {
     "alias": "JDBC connectionPool Percentage numActive/MaxActive",
        "target": [
                  "alias(asPercent(kl12c27x.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.NumActive, kl12c27x.Tomcat.cms_rest_a_ae1_kl12c27x_server_1.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.Size),\"kl12c27x Percentage numActive/MaxActive\")",  
                  "alias(asPercent(kl12c293.Tomcat.cms_rest_a_ae1_kl12c293_server_1.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.NumActive, kl12c293.Tomcat.cms_rest_a_ae1_kl12c293_server_1.JMX.tomcat_jdbc.class_org_apache_tomcat_jdbc_pool_DataSource.name_jdbc_cms_rest_db.type_ConnectionPool.Size),\"kl12c293 Percentage numActive/MaxActive\")"  
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
        "requirementValue" : 25,
        "requirementOperator" : "<",
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
                  "aliasByNode(kl12c27x.Tomcat.*.Backends.Oracle_DB.Average_Response_Time_ms,2,4,5)",   
                  "aliasByNode(kl12c293.Tomcat.*.Backends.Oracle_DB.Average_Response_Time_ms,2,4,5)"
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
                  "aliasByNode(kl12c27x.Tomcat.*.Backends.Oracle_DB.Responses_Per_Interval,2,4,5)",   
                  "aliasByNode(kl12c293.Tomcat.*.Backends.Oracle_DB.Responses_Per_Interval,2,4,5)"   
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
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.tif.Responses_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.content.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.rootContext.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.tif.Responses_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.content.Responses_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.rootContext.Responses_Per_Interval,2,3,4,5)"
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
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.tif.Average_Response_Time_ms,2,3,4,5)",   
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.content.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.rootContext.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.tif.Average_Response_Time_ms,2,3,4,5)",   
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.content.Average_Response_Time_ms,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.rootContext.Average_Response_Time_ms,2,3,4,5)"
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
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.tif.Errors_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.content.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c27x.Tomcat.*.Frontends.Apps.rootContext.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.tif.Errors_Per_Interval,2,3,4,5)",   
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.content.Errors_Per_Interval,2,3,4,5)",
                  "aliasByNode(kl12c293.Tomcat.*.Frontends.Apps.rootContext.Errors_Per_Interval,2,3,4,5)"
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
  
  { "name": "TIF CMSCLient ehcache ObjectCount",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF metrics excluded from benchmark",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  
      {
        "alias": "TIF CMSCLient ehcache ObjectCount",
        "target": "aliasByNode(*.Tomcat.tif_a_ae1_*_server_1.JMX.net_sf_ehcache.CacheManager_tif.name_cmsClient.type_CacheStatistics.ObjectCount,2,6,7,8)",   
        
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
      //"description": "Average responsetimes for all requests",
        "interpolation": "cardinal",
        "renderer": "line",
    //"null_as": 0,
        "colspan": 3, 
        "scheme": "munin",  // this is a metric-specific color palette
   
      },

    ]
  },   
  { "name": "RequestCount",  // give your dashboard a name (required!)
    "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
    // add an (optional) dashboard description. description can be written in markdown / html.
    
    "description": "TIF metrics excluded from benchmark",
    "metrics":  // metrics is an array of charts on the dashboard
    [
  

      {
        "alias": "RequestCount",
        "target": [
                  "aliasByNode(*.Tomcat.tif_a_ae1_*_server_1.JMX.Catalina.name_http_bio_0_0_0_0_*.type_GlobalRequestProcessor.requestCount,2,6,7)",   
                  "aliasByNode(*.Tomcat.cms_rest_a_ae1_*_server_1.JMX.Catalina.name_http_bio_0_0_0_0_*.type_GlobalRequestProcessor.requestCount,2,6,7)",   
                  "aliasByNode(*.Tomcat.mosaic_a_ae1_*_server_1.JMX.Catalina.name_http_bio_0_0_0_0_*.type_GlobalRequestProcessor.requestCount,2,6,7)",   
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
