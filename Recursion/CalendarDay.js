var CalendarDay = function(meeting_times) {
  this.meeting_times      = meeting_times;
  this.free_meeting_times = [];
  this.buildFreeTimes(this.showPossibleHours(), 0, 0);
};
CalendarDay.prototype.showPossibleHours = function() {
  var hours = ("0,0," + this.meeting_times + ",24,24").split(","); // add limits 0 and 24
  for(var i=0; i<hours.length; i++) { hours[i] = +hours[i]; } // convert to integers 
  return hours;
}
CalendarDay.prototype.getScheduledMeetingTimes = function(){
  return this.meeting_times;
}
CalendarDay.prototype.getFreeMeetingTimes = function(){
  return this.free_meeting_times;
}
CalendarDay.prototype.buildFreeTimes = function(hours, index, n) {
  var start_time = hours[(n + 1)];
  var end_time   = hours[(n + 2)];
  // base case
  if( index === this.meeting_times.length ) {
    this.free_meeting_times.push([start_time, end_time]);  
  } else { // recursive case
    if(start_time !== end_time){
      this.free_meeting_times.push([start_time, end_time]);  
    }   
    return this.buildFreeTimes(hours, (index + 1), (n + 2));
  }
}