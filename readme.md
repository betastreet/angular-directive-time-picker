#angular-directive-time-picker

A simple time picker component for angular (1.3.x+)

#Features

* Military time ability
* endTimeInclusive setting (09:00 visible to users will be saved as 08:59)

#initialize

include the .js files and place css/scss in your app.

#response

Handle the change event in the update attribute and look for the "value" variable.

#Usage

```html
<b>Open Time:</b><br>
<div input-time="{{vm.timeOpen}}" military="true" update="vm.timeOpen = value; vm.something()"></div>

<b>Close Time:</b><br>
<div input-time="{{vm.timeClose}}" military="true" end-time-inclusive="true" update="vm.timeClose = value; vm.something()"></div>
```

#To do

* ability to reverse the up/down buttons based on preference
