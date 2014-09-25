$(function() {
	$('#busSearch').submit(function(e) {
		var key = '8322baf0-b5c8-4838-a798-1af726abd6da',
			stopNum = $(this).find('.stopNum').val(),
			data = '&MonitoringRef=' + stopNum,
			url = 'http://bustime.mta.info/api/siri/stop-monitoring.json?key=' + key + data;

		$.ajax({
			url: url,
			dataType:'jsonp',
			success: function(response) {
				var error = response.Siri.ServiceDelivery.StopMonitoringDelivery[0].ErrorCondition;

				if(error == undefined) {
					var $data = response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit,
						$length = $data.length,
						$yourStop = $data[0].MonitoredVehicleJourney.MonitoredCall.StopPointName,
						$falseStop = response.Siri.ServiceDelivery.StopMonitoringDelivery[0].ErrorCondition;
                    $('.place').text($yourStop).parent().parent().show();
                    for(var i = 0; i < $length; i++) {
						var $res = $data[i],
							$d = $res.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances,
							$busName = $res.MonitoredVehicleJourney.PublishedLineName,
							$distance = $d.PresentableDistance,
							$stopsAway = $d.StopsFromCall;
						    	
							var elements = {
								openTr : '<tr>',
								closeTr : '</tr>',
								openTd : '<td>',
								closeTd : '</td>'
							}
                           
							var $html = elements.openTr + 
									   	elements.openTd + 
										 $busName + 
										elements.closeTd + 
										
										elements.openTd + 
										 $distance + 
										elements.closeTd + 
										
										elements.openTd + 
										 $stopsAway + 
										elements.closeTd + 
									   elements.closeTr;
                        
						$('#results').append($html);
					}
				} else {
					alert('Bus Stop Does Not Exist');
				}
			},
			error: function() {
				alert('error');
			}
		});

		e.preventDefault();
	})
});