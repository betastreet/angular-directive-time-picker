(function() {
'use strict';

angular
    .module('inputTime', ['rtcb'])
    .directive('inputTime', function(){
    	return {
    		restrict: 'A',
    		scope:{
    			update:'&update',
          inputTime:'@inputTime',
    			disabled:'@disabled'
    		},
    		link:function(scope, element, attrs, InputTimeController){
    			InputTimeController.setTime(element,attrs.inputTime,attrs.military,attrs.endTimeInclusive);
    			attrs.$observe('inputTime',function(value){
	    			InputTimeController.setTime(element,value,attrs.military,attrs.endTimeInclusive);
    			});
    			attrs.$observe('disabled',function(value){
	    			InputTimeController.setDisabled(value);
    			});

    		},
    		templateUrl: 'input-time/input-time.tpl.html',
    		controller: 'InputTimeController',
    		controllerAs: 'vm'
    	};
    });

})();
