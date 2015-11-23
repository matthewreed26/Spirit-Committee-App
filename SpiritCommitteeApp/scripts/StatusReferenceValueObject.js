function StatusReferenceValueObject(statusID, statusCode, statusName, statusColor, statusColorTheme, previousStatusID, nextStatusID, activeFlag) {
    this.statusID = statusID;
    this.statusCode = statusCode;
    this.statusName = statusName;
    this.statusColor = statusColor;
    this.statusColorTheme = statusColorTheme;
    this.previousStatusID = previousStatusID;
    this.nextStatusID = nextStatusID;
    this.activeFlag = activeFlag;
};