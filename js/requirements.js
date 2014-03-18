 var dashboard;
 var metrics; 
 
 //dashboard = dashboards[0];
 //metrics = dashboard['metrics'];
 
 if (getUrlVars()["maxNumberOfBuilds"]){ 
 	maxNumberOfBuilds =  getUrlVars()["maxNumberOfBuilds"];
 }else{
 	maxNumberOfBuilds =  30;
 }
 
if (getUrlVars()["buildMatches"]){
	buildMatches=getUrlVars()["buildMatches"];
}else{
	buildMatches=".*";
}

if (getUrlVars()["baseline"]){
	baseline=getUrlVars()["baseline"];
}else{
	baseline="";
}

if (baseline == "previousBuild"){
	
	maxNumberOfBuilds =  2;

}	

	
 var eventUrl = graphite_url + "/events/get_data?";
 /*optional from and until*/
  
 if (getUrlVars()["from"]) eventUrl += "from="+ getUrlVars()["from"]+ "&";
 if (getUrlVars()["until"]) eventUrl +="until="+ getUrlVars()["until"];
 
 
 var trendSet=[];

 $.ajax({
  url: eventUrl,
  dataType: 'json',
  async: false,
  success: function(response) {
	var j = 0;
	
		for(i=0;i<response.length;i++){
                                               
			if (response[i].tags.match(buildMatches)){
															
				if (response[i].what.match("Start-loadtest")){
					/*leave out in case test is running*/
					if(i+1 < response.length){	
						trendSet[j]=[response[i].when,String(response[i].what),String(response[i].tags),String(response[i].data)];
					}	
				}	
				if (response[i].what.match("End-loadtest")){
					trendSet[j].push(response[i].when);
					++j;
				}
 
			}          
		}
    return trendSet;
	                                  }
 });
var trendSetTableData = [];
var j=0;

for (t=0;t<trendSet.length;++t){

	trendSetTableData[t]= getComparisonData (trendSet[t][0], trendSet[t][4]); 
	trendSetTableData[t].push(trendSet[t][2]); //build
	trendSetTableData[t].push(trendSet[t][3]); //testset
}

for (t=0;t<trendSetTableData.length;++t){
	
	if (trendSetTableData[t][trendSetTableData[t].length-2].match(baseline)){ 
	
		trendSetTableData.splice(0, t);
		break;
	}
}
/*limit to last maxNumberOfBuilds*/

if (trendSetTableData.length > maxNumberOfBuilds){
	
	trendSetTableData.splice(0, trendSetTableData.length-maxNumberOfBuilds);
	
}
		
/* Get comparison data for testruns*/
function getComparisonData (from, until)
{
	var j = 0;
	var outputData =[];
	
	for (d=0; d<dashboards.length; ++d){
		
		for (i=0; i<dashboards[d].metrics.length; ++i){
		
			if (dashboards[d].metrics[i].requirementValue){

				if (dashboards[d].metrics[i].target[0].length < 2  ){ //if only one target in metric

			
				
					var dataUrl = graphite_url + "/render?target=" + dashboards[d].metrics[i].target + "&from=" + from + "&until=" + until + "&format=json";
					
					
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
							
								for(p=0;p<this.datapoints.length;p++){
							
										if(this.datapoints[p][0] != null){

											count++;
											total += this.datapoints[p][0]

										}
								}
								
							
								outputData[j]=[dashboards[d].metrics[i].alias,this.target,Math.round((total/count)*1000)/1000,dashboards[d].metrics[i].requirementValue,dashboards[d].metrics[i].requirementOperator];
								++j;
								
							});
						}
					 });
				}
				else {
				
					for (k=0; k < dashboards[d].metrics[i].target.length ; ++k)
					{
					
						var dataUrl = graphite_url + "/render?target=" + dashboards[d].metrics[i].target[k] + "&from=" + from + "&until=" + until + "&format=json";
						
						
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
								
									for(p=0;p<this.datapoints.length;p++){
							
										if(this.datapoints[p][0] != null){

											count++;
											total += this.datapoints[p][0]

										}
									}
								
									outputData[j]=[dashboards[d].metrics[i].alias,this.target,Math.round((total/count)*1000)/1000,dashboards[d].metrics[i].requirementValue,dashboards[d].metrics[i].requirementOperator];
									++j;
									
								});
							}
						 });
					
					}
					
				}	 
		
			}
		
		
		}	
	
		
	}	
	
	return outputData;
}
var benchmarkSet;

for (i=0;i<trendSetTableData.length;i++){	

	if (i==0){
		
		benchmarkSet =trendSetTableData[i][trendSetTableData[i].length-2];
	}else{	
		benchmarkSet +=  "," +trendSetTableData[i][trendSetTableData[i].length-2] ;
	}	
}
baselineBuild = trendSetTableData[0][trendSetTableData[0].length-2]
benchmarkBuild = trendSetTableData[trendSetTableData.length -1][trendSetTableData[0].length-2]

/*limit trendset to trendSettable data*/

if (trendSet.length > trendSetTableData.length){
	trendSet.splice(0, trendSet.length - trendSetTableData.length );
}	
startTimeTrendGraph = trendSet[0][0];
endTimeTrendGraph = trendSet[trendSet.length-1][4] + 300;

var compareTable = "<div class=\"CSSTableGenerator\"><table id=\"trendTable\"><tr class=\"trendTableHeader\"><td>Metric</td><td>Counter</td><td>Requirement</td><td>Graph</td>";

for (i=0;i<trendSetTableData.length;i++){	    
	    if (i == 0){

			compareTable += "<td><code class=\"baseline center\">BASELINE</code><button class=\"btn btn-default btn-xs center\" title=\"Show release notes\" onClick=\"location.href='http://bamboo.eden.klm.com/browse/TIF-PANIC-" + trendSetTableData[i][trendSetTableData[i].length-1] + "' target='_blank'\"><img src=\"../img/settings.png\" width =12px height=12px></button></br>" + trendSetTableData[i][trendSetTableData[i].length-2] + "</td>";		
		
		}else{	
			
			compareTable += "<td><button class=\"btn btn-default btn-xs center\" title=\"Set baseline to " + trendSetTableData[i][trendSetTableData[i].length-2] + "\" onClick=\"location.href='" + giraffeHost + "/viewTrends.html?buildMatches=" + buildMatches + "&baseline=" + trendSetTableData[i][trendSetTableData[i].length-2]  + "'\"><img src=\"../img/flag.png\" width =12px height=12px></button><button class=\"btn btn-default btn-xs center\" title=\"Show release notes\" onClick=\"location.href='http://bamboo.eden.klm.com/browse/TIF-PANIC-" + trendSetTableData[i][trendSetTableData[i].length-1] + "'\"><img src=\"../img/settings.png\" width =12px height=12px></button></br>" + trendSetTableData[i][trendSetTableData[i].length-2] + "</td>"; 
		}	
				
}


compareTable += "</tr>"
graphIndex=0;

for (i=0;i<trendSetTableData[0].length - 2 ;i++){	 
	
		/*if new graph increment graphIndex*/
		if (i>0){
			
			if(trendSetTableData[0][i][0]!= trendSetTableData[0][i-1][0]){
				
				++graphIndex;
			}
		}
		/*create buttons to graphs */
		
		if (trendSetTableData.length < 6 || trendSetTableData.length > 2  ){
		
			buttonFragment = "<button title=\"Show detailed graphs\" class=\"btn btn-default btn-xs center\"  onClick=\"showGraph('graph" + graphIndex + "','" + trendSetTableData[0][i][0] + "','" + trendSetTableData[0][i][1] + "','" + baselineBuild + "','" + benchmarkBuild +  "');\"><img src=\"../img/benchmark.png\" width =10px height=10px></button>";
		}
		if (trendSetTableData.length > 2 ){
		
			buttonFragment += "<button title=\"Show trend graph\" class=\"btn btn-default btn-xs  center\"  onClick=\"showTrendGraph('graph" + graphIndex + "','" + trendSetTableData[0][i][0] + "','" + trendSetTableData[0][i][1] + "','" + startTimeTrendGraph + "','" + endTimeTrendGraph +  "');\"><img src=\"../img/trend.png\" width =10px height=10px></button>";
	
		}
		
		
	
		compareTable += "<tr class=\"graph" + graphIndex + "\"><td>" + trendSetTableData[0][i][0] + "</td><td>"  + trendSetTableData[0][i][1] + "</td><td>" +  trendSetTableData[0][i][4] + " " +  trendSetTableData[0][i][3] + "</td><td>" + buttonFragment  + "</td>";
	
		
	for(var j=0; j<trendSetTableData.length ; j++){

		/*set classes for cells and add buttons for warnings and issues*/
		if ((trendSetTableData[j][i][4] == ">" && trendSetTableData[j][i][2] < trendSetTableData[j][i][3]) || (trendSetTableData[j][i][4] == "<" && trendSetTableData[j][i][2] > trendSetTableData[j][i][3]) ){
		
			tableClass = "issue";
			//compareTable += "<td class=\"" + tableClass + "\"><code>" + trendSetTableData[j][i][2]+ "</code></td>";
			compareTable += "<td class=\"" + tableClass + "\"><button title=\"Show detailed graph\" class=\"btn btn-default btn-xs center\"  onClick=\"showGraph('graph" + graphIndex + "','" + trendSetTableData[j][i][0] + "','" + trendSetTableData[j][i][1] + "','" + baselineBuild + "','" + benchmarkBuild +  "');\">" + trendSetTableData[j][i][2] + "</button>";
		}
		else
		{
		
			tableClass = "ok";
			compareTable += "<td class=\"" + tableClass + "\">" + trendSetTableData[j][i][2]+ "</td>";
		}	
	
	   
		//compareTable += "<td class=\"" + tableClass + "\">" + trendSetTableData[j][i][2]+ "</td>";
		//compareTable += "<td>" + parseInt(trendSetTableData[j][i][2]/trendSetTableData[0][i][2] * 100)+ "%</td>";	
		//compareTable += "<td><a href=\"" + giraffeHost + "/benchmark.html?benchmarkset=" + baselineBuild + "," + trendSetTableData[j][trendSetTableData[j].length-2] + "\">" + parseInt(trendSetTableData[j][i][2]/trendSetTableData[0][i][2] * 100)+ "%</a></td>";	
	}
	        
	 compareTable += "</tr>";
}
	    
	    compareTable += "</table></div>";
	
		var fragment = createHTML("<div style=\"width:100%; text-align=center; font-size:20px;\">" + compareTable + "</div>"); 
	
	   // document.body.insertBefore(fragment, document.body.childNodes[0]);
	
	
	
		function createHTML(htmlStr) 
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
	




$(window).load( function(){

	$( "#backToOverview" ).hide();
	document.body.appendChild(fragment);	
	
	var warningAndIssueCounter = 0;
	$('table tr').each(function(){
		
		if  ($(this).hasClass('trendTableHeader') == false) {
		
			if ($(this).find('td.issue').length != 0){	
				$(this).addClass('issue');
				warningAndIssueCounter++;
			}else if ($(this).find('td.warning').length != 0){
				$(this).addClass('warning');
				warningAndIssueCounter++;
			}else{
				$(this).addClass('ok');
			}
		}	
    });    
	
/*	if (warningAndIssueCounter > 0){
	 toggle('ok');
	}
*/			
});


function removeIframes() {

	var iframes = document.getElementsByTagName('iframe');

	for (var i = 0; i < iframes.length; i++) {
		iframes[i].parentNode.removeChild(iframes[i]);
	}
}
function backToOverview() {

   for (i=0;i<tr.length;i++){
		
			tr[i].style.display = '';
		 
	}
    
	removeIframes()	;
	
    $('table tr:visible:odd').css({"background": "lightgrey"});
    $('table tr:visible:even').css({"background": "#ffffff"});
	
	$( "#backToOverview" ).hide();
	
	
}


function showGraph(thisname,dashboardUrl,metricName,baseline,benchmark) {
	
	removeIframes()	;
	_metricName = metricName;
	var ifrm = document.createElement("iframe");
	document.body.appendChild(ifrm);
	ifrm.id = "iframe"; 
	ifrm.width = "100%"; 
	ifrm.height = "80%";
	ifrm.float = "center";
	ifrm.class = "scrollSync";
	//ifrm.src = giraffeHost + "/benchmark.html?dashboard=" + dashboardUrl + "&benchmarkset=" + baseline + "," + benchmark ; 	
    ifrm.src = giraffeHost + "/benchmark.html?dashboard=" + dashboardUrl + "&benchmarkset=" + benchmarkSet + "&metric=" + metricName; 	   
   tr=document.getElementsByTagName('tr')

   for (i=0;i<tr.length;i++){
   
	  if (tr[i].className != 'trendTableHeader'){
		tr[i].style.display = 'none';
	  }
	  
	  if (tr[i].className.match(thisname + " ")){
		
			tr[i].style.display = '';
		 
	  }       
	}
       
    $('table tr:visible:odd').css({"background": "lightgrey"});
    $('table tr:visible:even').css({"background": "#ffffff"});
	
	$( "#backToOverview" ).show();
	
	
	function clickMetric(){
		$('#iframe').contents().find('#iframe0').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
		$('#iframe').contents().find('#iframe1').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
		$('#iframe').contents().find('#iframe2').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
		$('#iframe').contents().find('#iframe3').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
		$('#iframe').contents().find('#iframe4').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
	}

	setTimeout(function(){
  //where we can also call foo
	clickMetric();
	},3000);
	
}	

	

function showTrendGraph(thisname,dashboardUrl,metricName,startTimeTrendGraph,endTimeTrendGraph) {

	removeIframes()	;	
	_metricName = metricName;
	
	var ifrm = document.createElement("iframe");
	document.body.appendChild(ifrm);
	ifrm.id = "iframe"; 
	ifrm.width = "100%"; 
	ifrm.height = "80%";
	ifrm.float = "center";
	ifrm.class = "scrollSync";
	ifrm.src = giraffeHost + "/viewTrendGraph.html#dashboard=" + dashboardUrl + "&from=" + startTimeTrendGraph + "&until=" + endTimeTrendGraph + "&events=Deployment" ; 	
       
   tr=document.getElementsByTagName('tr')

   for (i=0;i<tr.length;i++){
   
	  if (tr[i].className != 'trendTableHeader'){
		tr[i].style.display = 'none';
	  }
	  
	  if (tr[i].className.match(thisname)+ " "){
		
			tr[i].style.display = '';
		 
	  }       
	}
       
    $('table tr:visible:odd').css({"background": "lightgrey"});
    $('table tr:visible:even').css({"background": "#ffffff"});
	
	$( "#backToOverview" ).show();
	
	function clickMetric(){
		$('#iframe').contents().find('.label').filter(':contains("' + _metricName + '")').trigger("click");
	
	}

	setTimeout(function(){
  //where we can also call foo
	clickMetric();
	},3000);
	
	
}


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
          if (tr[i].className.match(thisname)){
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
