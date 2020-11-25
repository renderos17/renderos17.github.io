function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;
}



let params = new URLSearchParams(location.search);
let appointmentName = params.get('assigned_to');
appointmentName = appointmentName.substring(0, appointmentName.indexOf(" "));
document.getElementById("name").innerHTML = appointmentName;
let appointmentDate = new Date(Date.parse(params.get('event_start_time')));
document.getElementById("date").innerHTML = convertUTCDateToLocalDate(appointmentDate);
