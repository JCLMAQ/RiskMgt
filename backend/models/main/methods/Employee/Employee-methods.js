
model.Employee.methods.getChanges = function() {
	return ds.changeTracking.getChanges(this);
};
model.Employee.entityMethods.getOrgChart = function() {
	var depth = depth || null; //in case depth wasn’t passed
	if (depth == null)
		depth = 100; //effectively infinite if not specified
	else
		depth -= 1; //decrement the depth
		var org = {}; //will hold the org chart for this level
		var info = {Title: this.title }; //, Salary: '$' + this.salary.toFixed()};
		info['Total Employees'] = this.countEmployees; //add Total Employees attribute
//		info['Total Salary'] = '$' + this.totalEmployeeSalary; //add Total Salary
		org[this.fullName] = [info]; //put entire info object as new attribute
	if ((this.directReports.length > 0) && (depth > 0))
	{
		var attName = this.directReports.length + ' Reports';
		org[attName] = {};
		var theEmployees = this.directReports;
		var i = 0;
		theEmployees.forEach(function(loopEmployee) {
			i++;
			org[attName][i] = loopEmployee.getOrgChart(depth);
		});
	}
	return org;
};