var eventIDCounter = -1;
var eventStatusIDCounter = -1;
var commentIDCounter = -1;

function retrieveNewEventFromDB(eventName) {
    eventIDCounter++;
    return new Event(eventIDCounter, eventName, new Date(), undefined);
};

function retrieveNewEventStatusFromDB(eventID) {
    eventStatusIDCounter++;
    return new EventStatus(eventStatusIDCounter, eventID, 1, new Date(), undefined);
};

function saveNewCommentToDB(eventID, statusID, commentText){
    commentIDCounter++;
    return new Comment(commentIDCounter, eventID, statusID, new Date(), commentText);
};

var eventListItemsIDCounter = -1;
var eventListItemsArray = [];

function addNewEvent() {
    var eventName = $("#eventInputName").val();
    if (eventName.trim != "") {
        var newEvent = retrieveNewEventFromDB(eventName);
        eventListItemsIDCounter++;
        var newEventListItem = new EventListItem(eventListItemsIDCounter, newEvent, retrieveNewEventStatusFromDB(newEvent.eventID), []);
        eventListItemsArray.push(newEventListItem);
        $("#eventInputName").val("");
        addEvent(newEventListItem);
    }
};

function addComment(eventListItemID) {
    var currentEventListItem = eventListItemsArray[eventListItemID];
    var comment = saveNewCommentToDB(currentEventListItem.event.eventID, currentEventListItem.eventStatus.statusID,
        $("#eventListItem" + eventListItemID + "CommentsTextArea").val());
    currentEventListItem.comments.push(comment);
    $("#eventListItem" + eventListItemID + "CommentsTextArea").val("");
    updateEvent(currentEventListItem);
};

function progressEventForward() {
};

function progressEventBack() {
};

function addEvent(eventListItem) {
    $("#eventList").append(createEventHTML(eventListItem)).collapsibleset('refresh');
    $("#eventListItem" + eventListItem.eventListItemID).collapsible("expand");
};

function removeEvent(eventListItem) {
    $("#eventListItem" + eventListItem.eventListItemID).remove();
    $("#eventList").collapsibleset('refresh');
};

function updateEvent(eventListItem) {
    removeEvent(eventListItem);
    addEvent(eventListItem);
};