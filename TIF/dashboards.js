buildPlanId =  getUrlVars()["buildPlanId"];

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}


$.ajax({
  url: 'http://lt-dash-dev.cf.eden.klm.com/get-giraffe-dashboard-file/' + buildPlanId,
  dataType: 'json',
  async: false,
  success: function(response) {
  
  dashboards= response;
                                    }
 });
 
 $.getScript("../js/giraffe.js", function(){

   // Here you can use anything you defined in the loaded script
});

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
