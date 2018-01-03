
model.User.fullName.onGet = function() {
    var
        result;

    result = this.firstName ? [this.firstName] : [];
    if (this.lastName) {
        result.push(this.lastName);
    }
    return result.join(' ');
};


model.User.fullName.onSet = function() {
	// Add your code here;
};


model.User.fullName.onSort = function() {
    return (ascending ? "firstName, lastName" : "firstName desc, lastName desc");
};


model.User.fullName.onQuery = function(compOperator, valueToCompare) {
    return "firstName " + compOperator + valueToCompare + " || " + "lastName " + compOperator + valueToCompare;
};