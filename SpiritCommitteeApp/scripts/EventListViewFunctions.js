var statusRefValueList = new StatusReferenceValueList();

function createEventHTML(eventListItem) {
    return "<div data-role='collapsible' class='" + statusRefValueList.statusReferenceVOs[eventListItem.eventStatus.statusID].statusCode
        + "' id='eventListItem" + eventListItem.eventListItemID + "' data-index='" + eventListItem.eventListItemID + "'data-theme='"
        + statusRefValueList.statusReferenceVOs[eventListItem.eventStatus.statusID].statusColorTheme + "'>"
        + "<h3>" + eventListItem.event.eventName + "</h3>"
        + "<p>Current Status: <font color='" + statusRefValueList.statusReferenceVOs[eventListItem.eventStatus.statusID].statusColor
        + "'>" + statusRefValueList.statusReferenceVOs[eventListItem.eventStatus.statusID].statusName + "</font>"
        + currentEventCommentsHTML(eventListItem.eventListItemID, eventListItem.eventStatus.statusID, eventListItem.comments)
        + moveStatusButtonsHTML(eventListItem.eventStatus.statusID, eventListItem.eventListItemID) + "</p></div>"
};

function currentEventCommentsHTML(eventListItemID, statusID, comments) {
    var currentComments = "";
    if (comments.length > 0) {
        currentComments = currentComments + "<br/>Current Comments: <br/>";
        for (var commentNum = 0; commentNum < comments.length; commentNum++) {
            currentComments = currentComments + comments[commentNum].commentText + " " + comments[commentNum].enteredDate + "<br/>";
        }
    }
    currentComments = currentComments + "<br/><textarea id='eventListItem" + eventListItemID + "CommentsTextArea'/><br/>"
        + makeButtonHTML(statusID, eventListItemID, "Add Comments", "addComment(" + eventListItemID + ")");
    return currentComments;
};

function moveStatusButtonsHTML(currentStatusID, eventListItemID) {
    var buttonStr = "";
    var previousStatusID = statusRefValueList.statusReferenceVOs[currentStatusID].previousStatusID;
    if (previousStatusID != undefined) {
        buttonStr = makeButtonHTML(eventListItemID, previousStatusID,
            statusRefValueList.statusReferenceVOs[previousStatusID].statusName, "progressEventBack()");
    }
    var nextStatusID = statusRefValueList.statusReferenceVOs[currentStatusID].nextStatusID;
    if (nextStatusID != undefined) {
        buttonStr = buttonStr + makeButtonHTML(eventListItemID, nextStatusID,
            statusRefValueList.statusReferenceVOs[nextStatusID].statusName, "progressEventForward()");
    }
    if (buttonStr != "") {
        buttonStr = "<br/><br/>Move Status To: " + buttonStr;
    }
    return buttonStr;
};

function makeButtonHTML(eventListItemID, statusID, buttonText, onclickFunctionStr) {
    return "<button id='eventListItem" + eventListItemID + statusRefValueList.statusReferenceVOs[statusID].statusCode
        + "' class='" + statusRefValueList.statusReferenceVOs[statusID].statusColor + "Btn' onclick='" + onclickFunctionStr + "'>"
        + buttonText + "</button>"
};