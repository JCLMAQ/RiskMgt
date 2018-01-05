
model.Employee.events.save = function(event) {
	ds.ChangeTackin.writeChange(this);
};