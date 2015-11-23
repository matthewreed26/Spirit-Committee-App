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
    var comments = "";

    var statusRefValueList = new StatusReferenceValueList();


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
        addEvent(createEventHTML);
    };

    function progressEventBack() {
        statusID--;
        removeEvent();
        addEvent(createEventHTML);
    };

    function addEvent(content) {
        $("#eventList").append(content).collapsibleset('refresh');
        document.getElementById(statusRefValueList.statusReferenceVOs[statusID].statusCode + "Event" + eventID).onclick = saveComments;
        if (statusID < 7) {
            document.getElementById(statusRefValueList.statusReferenceVOs[statusID + 1].statusCode + "Event" + eventID).onclick = progressEventForward;
            if (statusID == 1 || statusID == 3) {
                document.getElementById(statusRefValueList.statusReferenceVOs[statusID - 1].statusCode + "Event" + eventID).onclick = progressEventBack;
            }
        }
        $("#event" + eventID).collapsible("expand");
    };

    function saveComments() {
        comments = comments + $("#inputCommentsEvent" + eventID).val();
        $("#inputCommentsEvent" + eventID).val("");
        removeEvent();
        addEvent(createEventHTML);
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
        return createEventHTML();
    };

    function createEventHTML() {
        return "<div data-role='collapsible' class='" + statusRefValueList.statusReferenceVOs[statusID].statusCode + "' id='event" + eventID + "' data-index='" + eventID + "'data-theme='" + statusRefValueList.statusReferenceVOs[statusID].statusColorTheme + "'>"
            + "<h3>" + eventName + "</h3>"
            + "<p>Current Status: <font color='" + statusRefValueList.statusReferenceVOs[statusID].statusColor + "'>" + statusRefValueList.statusReferenceVOs[statusID].statusName + "</font>"
            + currentEventCommentsHTML()
            + moveStatusButtonsHTML() + "</p></div>"
    };

    function currentEventCommentsHTML() {
        var currentComments = "<br/><textarea id='inputCommentsEvent" + eventID + "'/><br/>"
            + "<button id='" + statusRefValueList.statusReferenceVOs[statusID].statusCode + "Event" + eventID + "'>Add Comments</button>";
        if (comments != "") {
            currentComments = "<br/>Current Comments: <br/>" + comments + ", " + currentComments;
        }
        return currentComments;
    };

    function moveStatusButtonsHTML() {
        var buttonStr = "";
        if (statusID < 7) {
            buttonStr = "<button id='" + statusRefValueList.statusReferenceVOs[statusID + 1].statusCode + "Event" + eventID + "' class='" + statusRefValueList.statusReferenceVOs[statusID + 1].statusColor + "Btn'>" + statusRefValueList.statusReferenceVOs[statusID + 1].statusName + "</button>";
            if (statusID == 1 || statusID == 3) {
                buttonStr = "<button id='" + statusRefValueList.statusReferenceVOs[statusID - 1].statusCode + "Event" + eventID + "' class='" + statusRefValueList.statusReferenceVOs[statusID - 1].statusColor + "Btn'>" + statusRefValueList.statusReferenceVOs[statusID - 1].statusName + "</button>&nbsp" + buttonStr;
            }
            buttonStr = "<br/><br/>Move Status To: " + buttonStr;
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