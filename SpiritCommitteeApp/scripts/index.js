// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    var eventID = 0;
    var statusID = 1;
    var startDate = new Date();
    var endDate = new Date();
    var eventName = "";
    var statusName = new Array("Future", "Brainstorming", "Logistics", "HR Final Approval", "Preparation", "Publicizing", "Execution", "Completion");
    var statusCode = new Array("future", "brainstorming", "logistics", "hRFinalApproval", "preparation", "publicizing", "execution", "completion");
    var statusColor = new Array("white", "red", "orange", "yellow", "green", "blue", "purple", "black");
    var statusColorTheme = new Array("c", "d", "e", "f", "g", "h", "i", "b");


    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        document.getElementById("addNewEventBtn").onclick = addNewEvent;
    };

    function addNewEvent() {
        addEvent(createNewEvent);
    };

    function progressEventForward() {
        statusID++;
        removeEvent();
        addEvent(createEvent);
    };

    function progressEventBack() {
        statusID--;
        removeEvent();
        addEvent(createEvent);
    };

    function addEvent(content) {
        $("#eventList").append(content).collapsibleset('refresh');
    };

    function removeEvent() {
        $("#event"+eventID).remove();
        $("#eventList").collapsibleset('refresh');
    };

    function createNewEvent() {
        eventID++;
        statusID = 1;
        eventName = $("#eventInputName").val();
        $("#eventInputName").val("");
        return createEvent();
    };

    function createEvent() {
        return "<div data-role='collapsible' class='" + statusCode[statusID] + "' id='event" + eventID + "' data-index='" + eventID + "'data-theme='" + statusColorTheme[statusID] + "'>"
            + "<h3>" + eventName + "</h3>"
            + "<p>Current Status: " + statusName[statusID] + "<br/><textarea id='inputCommentsEvent" + eventID + "'/>"
            + "<button id='" + statusCode[statusID] + "Event" + eventID + "'>Add Comments</button>"
            + moveStatusButtons() + "</p></div>"
    };

    function moveStatusButtons() {
        var buttonStr = "";
        if (statusID < 7) {
            buttonStr = "<button id='" + statusCode[statusID + 1] + "Event" + eventID + "' class='" + statusColor[statusID + 1] + "Btn'>" + statusName[statusID + 1] + "</button>";
            if (statusID == 1 || statusID == 3) {
                buttonStr = "<button id='" + statusCode[statusID - 1] + "Event" + eventID + "' class='" + statusColor[statusID - 1] + "Btn'>" + statusName[statusID - 1] + "</button>&nbsp" + buttonStr;
            }
            buttonStr = "<br/>Move Status To: " + buttonStr;
        }
        return buttonStr;
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();