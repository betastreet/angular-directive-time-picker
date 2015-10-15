(function() {
'use strict';

angular
    .module('inputTime')
    .controller('InputTimeController', InputTimeController);

InputTimeController.$inject = ['$scope', '$log', '$timeout'];

function InputTimeController($scope, $log, $timeout){

    var vm = this;

    vm.minuteStep = 5;

    vm.loaded = false;
    vm.display = null;
    vm.open = false;
    vm.field = null;

    //make this a setting
    vm.reverse = true;

    vm.timerPromise = null;

    vm.hour = null;
    vm.minute = null;
    vm.ampm = null;
    vm.military = false;
    vm.center = true;

    vm.setDisabled = function(value){
	    vm.disabled = ($scope.disabled && ($scope.disabled == true||$scope.disabled == 'true'||$scope.disabled == 1)) ? true : false;
    }
    vm.setDisabled($scope.disabled);

    vm.setTime = function(element, time, military, endTime){
    	if(typeof military == 'string')
    		military = (military == '1' || military == 'true') ? true : false;
    	else if(typeof military == 'number')
    		military = (+military) ? true : false;
    	vm.military = military;
    	if(typeof endTime == 'string')
    		endTime = (endTime == '1' || endTime == 'true') ? true : false;
    	else if(typeof endTime == 'number')
    		endTime = ( +endTime) ? true : false;
    	vm.endTime = endTime;
    	vm.element = element;
	    vm.minute = +time.substr(3, 2);
	    vm.hour = +time.substr(0, 2);
	    if(military){
		    if(vm.hour  >=  '12'){
		    	vm.ampm = 'PM';
		    	if(vm.hour >= '13')vm.hour -= 12;
		    }else{
		    	vm.ampm = 'AM';
		    	if(vm.hour == '00')vm.hour = 12;
		    }
		  }else{
		    vm.ampm = time.substr(6, 2).toUpperCase();
		  }
		  if(vm.endTime){
		  	vm.minute++;
		  	if(vm.minute > 59){
		  		vm.minute = 0;
		  		vm.hour++;
		  		if(vm.hour == 13){
		  			vm.hour = 1;
		  		}
		  		else if(vm.hour == 12){
			    	vm.ampm = (vm.ampm == 'AM' ? 'PM' : 'AM');
		  		}
		  	}
		  }
		  vm.hour = (vm.hour < 10 ? '0' + vm.hour : vm.hour);
		  vm.minute = (vm.minute < 10 ? '0' + vm.minute : vm.minute);
		  vm.display = vm.hour + ':' + vm.minute + ' ' + vm.ampm;
	    vm.loaded = true;
    }

    vm.adjustHour = function(direction){
      if(vm.reverse)direction = (direction == 'up') ? 'down' : 'up';
    	var hour = +vm.hour;
    	if(direction == 'up'){
    		hour += 1;
    		if(hour > 12)hour = 1;
    	}else{
    		hour -= 1;
    		if(hour < 1)hour = 12;
    	}
    	hour = '' + hour;
    	vm.hour = (hour.length == 1) ? '0' + hour : hour;
    	update();
    }
    vm.adjustMinute = function(direction){
      if(vm.reverse)direction = (direction == 'up') ? 'down' : 'up';
    	var minute = +vm.minute;
    	if(direction == 'up'){
    		if(minute % vm.minuteStep == 0)
	    		minute += vm.minuteStep;
    		else
    			minute += vm.minuteStep - (minute % vm.minuteStep);
    		if(minute >= 60)minute -= 60;
    	}else{
    		if(minute % vm.minuteStep == 0)
	    		minute -= vm.minuteStep;
	    	else
    			minute -= (minute % vm.minuteStep);
    		if(minute < 0)minute += 60;
    	}
    	minute = '' + minute;
    	vm.minute = (minute.length == 1) ? '0' + minute : minute;
    	update();
    }
    vm.adjustAmPm = function(){
    	vm.ampm = (vm.ampm == 'AM' ? 'PM' : 'AM');
    	update();
    }

    vm.focus = function(){
    	$timeout.cancel(vm.timerPromise);
    	vm.open = true;
    }

    vm.blur = function(){
    	vm.timerPromise = $timeout(function(){
    		vm.open = false;
    	}, 50);
    }

    vm.mouse = function(){
    	vm.element.find('input')[0].focus();
    	$timeout(function(){
	    	$timeout.cancel(vm.timerPromise);
    	}, 10);
    }

    //ignore typing for now
    vm.reset = function(){
    	vm.display = vm.hour + ':' + vm.minute + ' ' + vm.ampm;
    }

    function update(){
		  vm.display = vm.hour + ':' + vm.minute + ' ' + vm.ampm;
		  var send = '';
		  var hour = vm.hour;
		  var minute = vm.minute;
		  var ampm = vm.ampm;
		  if(vm.endTime){
		  	var hour = +hour;
		  	var minute = (+minute) - 1;
		  	if(minute < 0){
		  		hour--;
		  		minute = 59;
		  		if(hour == 11)
			    	ampm = (ampm == 'AM' ? 'PM' : 'AM');
			   	else if(hour == 0)
			   		hour = 12;
		  	}
			  hour = (hour < 10 ? '0' + hour : hour);
			  minute = (minute < 10 ? '0' + minute : minute);
		  }
    	if(!vm.military){
    		$scope.update({value: hour + ':' + minute + ' ' + ampm});
    	}else{
    		var hour = +hour;
    		if(ampm == 'AM' && hour == '12'){
    			hour = 0;
    		}
    		else if(ampm == 'PM' && hour < 12)hour += 12;
    		$scope.update({value : (hour < 10 ? '0' : '') + hour + ':' + minute});
    	}
    }

}

})();
