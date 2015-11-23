var statusCodeArray = new Array("future", "brainstorming", "logistics", "hRFinalApproval", "preparation", "publicizing", "execution", "completion");
var statusNameArray = new Array("Future", "Brainstorming", "Logistics", "HR Final Approval", "Preparation", "Publicizing", "Execution", "Completion");
var statusColorArray = new Array("gray", "red", "orange", "yellow", "green", "blue", "purple", "black");
var statusColorThemeArray = new Array("c", "d", "e", "f", "g", "h", "i", "b");

function retrieveStatuses() {
    var statusesArray = [];
    for(var statusNumber=0; statusNumber<8; statusNumber++){
        statusesArray.push([statusNumber, statusCodeArray[statusNumber], statusNameArray[statusNumber], statusColorArray[statusNumber], statusColorThemeArray[statusNumber], true]);
    };
    return statusesArray;
};

function StatusReferenceValueList() {
    var statusReferenceVOsTemp = [];
    var statuses = retrieveStatuses();
    for (var statusNum = 0; statusNum < statuses.length; statusNum++) {
        var status = statuses[statusNum];
        var statusReferenceVO = new StatusReferenceValueObject(status[0], status[1], status[2], status[3], status[4], status[5]);
        statusReferenceVOsTemp.push(statusReferenceVO);
    };
    this.statusReferenceVOs = statusReferenceVOsTemp;
};