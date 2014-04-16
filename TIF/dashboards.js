var graphite_url = "http://172.21.42.152";  // enter your graphite url, e.g. http://your.graphite.com
var giraffeHost = "http://172.21.42.152:8080/TIF";

$.ajax({
  url: 'http://localhost:3000/get-giraffe-dashboard-file/tif',
  dataType: 'json',
  async: false,
  success: function(response) {
  
  dashboards= response;
                                    }
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
