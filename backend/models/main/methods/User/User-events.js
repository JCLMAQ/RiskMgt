
model.User.fullName.onGet = function() {
    var result;

    result = this.firstName ? [this.firstName] : [];
    if (this.lastName) {
        result.push(this.lastName);
    }
    return result.join(' ');
};


model.User.fullName.onSet = function() {
	var names = value.split(' '); //split value into an array 
    this.firstName = names[0];  
    this.lastName = names[1];
};


model.User.fullName.onSort = function() {
    return (ascending ? "firstName, lastName" : "firstName desc, lastName desc");
};


model.User.fullName.onQuery = function(compOperator, valueToCompare) {
    return "firstName " + compOperator + valueToCompare + " || " + "lastName " + compOperator + valueToCompare;
};
model.User.fullName.onGet = function() {
	return "******"; //could also return Null
};