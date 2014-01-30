var benchmarkSet=[];
 var testSet=[];
 var selectedEvents=[];
 var testRuns=[];
 var baselineFrom, baselineUntil, benchmarkFrom, benchmarkUntil;
 //var dashboard = "CIS";
 
 var baselineAvgValues=[];
 var benchmarkAvgValues=[];
 var compareAvgValues=[];
 var dashboard;
 var metrics; 
 var warningAndIssueCounter=0;
 
 if (getUrlVars()["dashboard"]){

	dashboardUrl = getUrlVars()["dashboard"];
 }else{
	
	dashboardUrl = dashboards[0];
 }
 
 console.log(dashboards);
 
 for (i=0; i<dashboards.length; ++i){
 
 	if (encodeURI(dashboards[i].name) == dashboardUrl){
		 	 metrics = dashboards[i]['metrics'];
		 break;
	}	 
 } 
 
 
 
 for (i=0; i<metrics.length; ++i){
 
 	if (metrics[i].target[0].length >1){
 	console.log(metrics[i].target[0]);}
 } 
  
 if (getUrlVars()["metric"]){ 
 	legendMetric = getUrlVars()["metric"];
 }
 if (getUrlVars()["benchmarkset"]){ 
 	benchmarkSet =  getUrlVars()["benchmarkset"].split(','); //tags
 }else{
 	benchmarkSet[0] =".*";
 }
 if (getUrlVars()["testset"]){
 	testSet = getUrlVars()["testset"];			  //data	
 }else{
 	testSet[0]=".*";
 }
 
 	
 var eventUrl = graphiteEventHost + "/events/get_data?";
 /*optional from and until*/
  
 if (getUrlVars()["from"]) eventUrl += "from="+ getUrlVars()["from"]+ "&";
 if (getUrlVars()["until"]) eventUrl +="until="+ getUrlVars()["until"];
 
 
 var events=[];

 $.ajax({
  url: eventUrl,
  dataType: 'json',
  async: false,
  success: function(response) {
    			var i;
    			for(i=0;i<response.length;i++){
            		events[i]=[response[i].when,String(response[i].what),String(response[i].tags),String(response[i].data)];
        		
        		}
			return events;
  			}
 });



var k = 0;


for (i = 0; i < events.length; ++i) {
	
	for (j= 0; j < benchmarkSet.length; ++j) {
		
		//if (events[i][2].match(benchmarkSet[j]) && events[i][3].match(testSet)){
		if (events[i][2] == benchmarkSet[j]){
					
			selectedEvents[k] = events[i];
			++k;	
		}
			
	}
}
/*create testruns from selected events*/
var l = 0;
var m =0;

	
for (j= 0; j < selectedEvents.length -1; ++j) {
	
	if 	(selectedEvents[j][1] == "End-loadtest") ++l;
	
	testRuns[l] =  selectedEvents[j].concat(selectedEvents[j+1]);
	
	
}	
	
/*limit to last 5 testRuns*/
if (testRuns.length > 5){
	
	testRuns.splice(0, testRuns.length-5);
	
}

function loadComparisonTable()
{
	if (testRuns.length == 2 )//&& testSet != ".*")
	{
	
		baselineAvgValues = getComparisonData (testRuns[0][0], testRuns[0][4]);
		for (i=0;i<baselineAvgValues.length;++i) {console.log("baseline: " + baselineAvgValues[i]);}
		benchmarkAvgValues = getComparisonData (testRuns[1][0], testRuns[1][4]);
		for (i=0;i< benchmarkAvgValues.length;++i) {console.log("benchmark: " + benchmarkAvgValues[i]);}
		
		
		
		/* Get comparison data for testruns*/
		function getComparisonData (from, until)
		{
			var j = 0;
			var outputData =[];
				
			for (i=0; i<metrics.length; ++i){
			
				
				if (metrics[i].target[0].length < 2){
	
				
					var dataUrl = graphiteEventHost + "/render?target=" + metrics[i].target + "&from=" + from + "&until=" + until + "&format=json";
					
					
					$.ajax({
					  url: dataUrl,
					  dataType: 'json',
					  async: false,
					  success: function(data) 
					 	{
							
			    			$.each(data, function(entryIndex, entry) 
			    			{
	  							 								
								var total = 0;
								var count = 0;
							
	  							for (count=0; count < this.datapoints.length ; count++)
	  							{
	  								total = total + this.datapoints[count][0];
								}
							
								outputData[j]=[metrics[i].alias,this.target,Math.round((total/(count+1))*10)/10,metrics[i].benchmarkwarning,metrics[i].benchmarkissue];
								++j;
								
							});
			  			}
					 });
				}
				else {
				
					for (k=0; k < metrics[i].target.length ; ++k)
					{
					
						var dataUrl = graphiteEventHost + "/render?target=" + metrics[i].target[k] + "&from=" + from + "&until=" + until + "&format=json";
						
						
						$.ajax({
						  url: dataUrl,
						  dataType: 'json',
						  async: false,
						  success: function(data) 
						 	{
								
				    			$.each(data, function(entryIndex, entry) 
				    			{
		  							 								
									var total = 0;
									var count = 0;
								
		  							for (count=0; count < this.datapoints.length ; count++)
		  							{
		  								total = total + this.datapoints[count][0];
									}
								
									outputData[j]=[metrics[i].alias,this.target,Math.round((total/(count+1))*10)/10,metrics[i].benchmarkwarning,metrics[i].benchmarkissue];
									++j;
									
								});
				  			}
						 });
					
					}
					
				}	 
			}	
		
			return outputData;
		}
		
		
		var h=0;
		
		
			    
	    for (j= 0; j < baselineAvgValues.length ; ++j) 
	    {
	
			for (k= 0; k < benchmarkAvgValues.length ; ++k) 
			{
					
					if (baselineAvgValues[j][0] == benchmarkAvgValues[k][0] && baselineAvgValues[j][1] == benchmarkAvgValues[k][1])// && baselineAvgValues[j][2] > 0) 
					{
					
						if (baselineAvgValues[j][2] > 0)
						{
						var image; 
						var status;
						
						
							
							if (benchmarkAvgValues[k][2]/baselineAvgValues[j][2] >= (1+benchmarkAvgValues[k][4]) || benchmarkAvgValues[k][2]/baselineAvgValues[j][2] <= (1-benchmarkAvgValues[k][4]) )
							{
								//image="<a href=\"javascript:iframeJump('"+ baselineAvgValues[j][0] + "')\"><img src=\"img/ok.png\" height=50 width=50></a>";
								image="<a href=\"javascript:iframeJump('"+ baselineAvgValues[j][0] + "')\"><img src=\"img/issue.png\" height=40 width=40></a>";
								status= "issue";
								++warningAndIssueCounter;
							
							}
							else if (benchmarkAvgValues[k][2]/baselineAvgValues[j][2] >= (1+benchmarkAvgValues[k][3]) || benchmarkAvgValues[k][2]/baselineAvgValues[j][2] <= (1-benchmarkAvgValues[k][3]) )
							{
								
							
								//image="<a href=\"javascript:iframeJump('"+ baselineAvgValues[j][0] + "')\"><img src=\"img/warning.png\" height=50 width=50></a>";
								image="<a href=\"javascript:iframeJump('"+ baselineAvgValues[j][0] + "')\"><img src=\"img/warning.png\" height=40 width=40></a>";
								status= "warning";
								++warningAndIssueCounter;
							}
							else {
							
									image="<a href=\"javascript:iframeJump('"+ baselineAvgValues[j][0] + "')\"><img src=\"img/ok.png\" height=40 width=40></a>";
									status= "ok";
							}
							
							compareAvgValues[h] =  [baselineAvgValues[j][0], baselineAvgValues[j][1], baselineAvgValues[j][2], benchmarkAvgValues[k][2], parseInt((benchmarkAvgValues[k][2]/baselineAvgValues[j][2]) * 100) + "%", image, status] ;
							++h;
							break;
						}
					}	
			}
		
		}	
		
		for (j= 0; j < compareAvgValues.length; ++j)
		{
					
					
			console.log(compareAvgValues[j]);
					
		}
				
				
	    var compareTable = "<div class=\"CSSTableGenerator\"><table>";
	    
	    compareTable += "<tr><td>Graph</td><td>Metric (average)</td><td>" + testRuns[0][2] + "</td><td>" + testRuns[1][2] + "</td><td>Delta</td><td>Status</td>";
	    
	    for(var i=0; i<compareAvgValues.length; i++) 
		{
	    
			compareTable += "<tr class=\"" + compareAvgValues[i][6] + "\">";
	    
			for(var j=0; j<compareAvgValues[i].length - 1; j++)
			{
	    
	            compareTable += "<td>"+compareAvgValues[i][j]+"</td>";
			}
	        
	        compareTable += "</tr>";
		}
	    
	    compareTable += "</table></div>";
	
		var fragment = create("<div style=\"width:100%; text-align=center; font-size:20px;\">" + compareTable + "</div>"); 
	
	   // document.body.insertBefore(fragment, document.body.childNodes[0]);
	
	document.body.appendChild(fragment);		
			
		function create(htmlStr) 
		{
		    	var frag = document.createDocumentFragment(),
		        
		        temp = document.createElement('div');
		    	
		    	temp.innerHTML = htmlStr;
		    	
		    	while (temp.firstChild) 
		    	{
		        
		        	frag.appendChild(temp.firstChild);
		      	}
		        
		        return frag;
		}
	}
}

$(window).load( function(){

//loadComparisonTable();

if(testRuns.length != 2){

	$( "#ok-toggle" ).hide();
	$( "#warning-toggle" ).hide();
	$( "#issue-toggle" ).hide();
}	

for (j= 0; j < testRuns.length; ++j) {

	var testRunFrom, testRunUntil;
	
	testRunFrom = testRuns[j][0] //parseInt(testRuns[j][0] - ((testRuns[j][4]-testRuns[j][0]) * 0.1));
	testRunUntil = testRuns[j][4] + 60//parseInt(testRuns[j][4] + ((testRuns[j][4]-testRuns[j][0]) * 0.1));
	
	var ifrm = document.createElement("iframe");
	document.body.appendChild(ifrm);
	ifrm.id = "iframe" + j; 
	ifrm.width = (100/testRuns.length)-0.5+"%"; 
	ifrm.height = "100%";
	ifrm.float = "center";
	ifrm.class = "scrollSync";
	ifrm.src = graphite_url + "/index.html#dashboard=" + dashboardUrl + "&from=" + testRunFrom + "&until=" + testRunUntil + "&description=Build: " + testRuns[j][2] + " Testset: " + testRuns[j][3] + "&events=" + testRuns[j][2] ; 
		
}

  /*set synchronized scrolling for frames*/ 	
	
	
	setTimeout(function(){
    	
    	var ifr0 = $( $('#iframe0').contents() );
    	var ifr1 = $( $('#iframe1').contents() );
    	var ifr2 = $( $('#iframe2').contents() );
 		var ifr3 = $( $('#iframe3').contents() );
      	var ifr4 = $( $('#iframe4').contents() );
		
		
		
		
		ifr0.scroll( function(){ 
         ifr1.scrollTop(ifr0.scrollTop());
         ifr1.scrollLeft(ifr0.scrollLeft());
         ifr2.scrollTop(ifr0.scrollTop());
         ifr2.scrollLeft(ifr0.scrollLeft());
         ifr3.scrollTop(ifr0.scrollTop());
         ifr3.scrollLeft(ifr0.scrollLeft());
         ifr4.scrollTop(ifr0.scrollTop());
         ifr4.scrollLeft(ifr0.scrollLeft());
    	});
		
		ifr1.scroll( function(){ 
         ifr0.scrollTop(ifr1.scrollTop());
         ifr0.scrollLeft(ifr1.scrollLeft());
         ifr2.scrollTop(ifr1.scrollTop());
         ifr2.scrollLeft(ifr1.scrollLeft());
         ifr3.scrollTop(ifr1.scrollTop());
         ifr3.scrollLeft(ifr1.scrollLeft());
         ifr4.scrollTop(ifr1.scrollTop());
         ifr4.scrollLeft(ifr1.scrollLeft());
    	});
      
    	ifr2.scroll( function(){ 
         ifr0.scrollTop(ifr2.scrollTop());
         ifr0.scrollLeft(ifr2.scrollLeft());
         ifr1.scrollTop(ifr2.scrollTop());
         ifr1.scrollLeft(ifr2.scrollLeft());
         ifr3.scrollTop(ifr2.scrollTop());
         ifr3.scrollLeft(ifr2.scrollLeft());
         ifr4.scrollTop(ifr2.scrollTop());
         ifr4.scrollLeft(ifr2.scrollLeft());
    	});
    	
    	ifr3.scroll( function(){ 
         ifr0.scrollTop(ifr3.scrollTop());
         ifr0.scrollLeft(ifr3.scrollLeft());
         ifr1.scrollTop(ifr3.scrollTop());
         ifr1.scrollLeft(ifr3.scrollLeft());
         ifr2.scrollTop(ifr3.scrollTop());
         ifr2.scrollLeft(ifr3.scrollLeft());
         ifr4.scrollTop(ifr3.scrollTop());
         ifr4.scrollLeft(ifr3.scrollLeft());
    	});
    	
    	ifr4.scroll( function(){ 
         ifr0.scrollTop(ifr4.scrollTop());
         ifr0.scrollLeft(ifr4.scrollLeft());
         ifr1.scrollTop(ifr4.scrollTop());
         ifr1.scrollLeft(ifr4.scrollLeft());
         ifr2.scrollTop(ifr4.scrollTop());
         ifr2.scrollLeft(ifr4.scrollLeft());
         ifr3.scrollTop(ifr4.scrollTop());
         ifr3.scrollLeft(ifr4.scrollLeft());
    	});
    	
	
	
    	
  },2000);

	if (warningAndIssueCounter > 0){
	 toggle('ok');
	}
	
});




function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
 

function toggle(thisname) {

       tr=document.getElementsByTagName('tr')

       for (i=0;i<tr.length;i++){
          if (tr[i].className == thisname){
             if ( tr[i].style.display=='none' ){
                tr[i].style.display = '';
             }
          else {
             tr[i].style.display = 'none';
             }
          }
       }
       
    $('table tr:visible:odd').css({"background": "lightgrey"});
    $('table tr:visible:even').css({"background": "#ffffff"});
}
