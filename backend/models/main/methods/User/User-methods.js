
model.User.entityMethods.validatePassword = function(password) {
	var ha1 = directory.computeHA1(this.ID, password);
	return (ha1 === this.HA1Key); //true if validated, false otherwise.
};


model.User.methods.addUser = function(signUpData) {
	// Add a new user account.
	var passwordRegexStr, isValid,
		newUser;

		//Check if the password is at least 7 characters and one digit.
		if (signUpData.password !== null) {
			passwordRegexStr = /[0-9a-zA-Z]{5,}/;
			isValid = passwordRegexStr.test(signUpData.password);
			if (!isValid) {
				return {error: 8025, errorMessage: "Password must be at least 5 characters."};
			}
		}
		
		var user = ds.User({email: signUpData.email}); // Get the user
		if (user) {
			return {error: 8030, errorMessage: "Email already exists."};
		}
		
		if (!signUpData.lastName) {
			return {error: 8030, errorMessage: "Name must be provided."};
		}
		if (!signUpData.firstName) {
			return {error: 8030, errorMessage: "First Name must be provided."};
		}
		if (!signUpData.email) {
			return {error: 8030, errorMessage: "Email must be provided."};
		}
		
		//Check if password is enterd the same both times on the Sign Up form.
		if (signUpData.password !== signUpData.verifyPassword) {
			return {error: 8030, errorMessage: "Verification of password failed."};
		}
		
		newUser =  ds.User.createEntity();
		newUser.firstName = signUpData.firstName; 
       	newUser.lastName = signUpData.lastName;  
       	newUser.email = signUpData.email;    
       	newUser.password = signUpData.password;
       	// Full Name computed
       	//*** Best Pratice ***
       	//Save the new User in a Try Catch block and put your validation code for the email address in the User 
       	// onValidate() method (see model.User.events.onValidate below). This is better than doing validation checks in this 
       	// function because you may create other methods in the future that save a new User.
       	
       	try {
			newUser.save(); //Save the entity.
		}
		catch(e) {
			return {error: 8099, errorMessage: e.messages[1]};
		}
};

//Class methods scope.
model.User.methods.addUser.scope ="public";

model.User.methods.modifyPassWord = function(changePasswObject) {
// Modify password class methods
    var passwordRegexStr, isValid;
    var sessionRef = currentSession(); // Get session.
    var promoteToken = sessionRef.promoteWith("Internal"); //temporarily make this session Internal level.
    //Find the User entity for the current user.
    var myCurrentUser = currentUser(); // we get the user of the current session.
    var myUser = ds.User.find("ID = :1", myCurrentUser.ID);
    if ((myCurrentUser !== null) && (myUser !== null)) { //if a user is logged in.
        if (myUser.validatePassword(changePasswObject.oldPassword)) { // Old Password is the rigth one
            if (changePasswObject.newPassword === changePasswObject.newPasswordAgain) {
                //Check if the password is at least 7 characters and one digit.
                /*
					if (changePasswObject.newPassword !== null) {
						passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{7,}$/;
						isValid = passwordRegexStr.test(changePasswObject.newPassword);
						if (!isValid) {
							return {error: 8025, errorMessage: "Invalid password. Password must be at least 7 characters."};
						}
					}
					*/
                myUser.password = changePasswObject.newPassword;
                try {
                    myUser.save(); //Save the entity.
                    sessionRef.unPromote(promoteToken); //Put the session back to normal.
                    return {
                        error: 8040,
//                        errorMessage: "Your password has been changed."
                        errorMessage: "Votre mot de passe a été changé avec succès."
                    };
                }
                catch (e) {
                    return {
                        error: 8099,
                        errorMessage: e.messages[1]
                    };
                }
            }
            else {
                return {
                    error: 8050,
//                    errorMessage: "You did not match the new password."
                    errorMessage: "Les deux mots de passe ne correspondent pas !"
                };
            }
        }
        else {
            return {
                error: 8060,
//                errorMessage: "You did not enter the correct password."
                errorMessage: "Vous n'avez pas introduit le bon mot de passe'."
            };
        }
    }
    else {
        return {
            error: 8070,
//            errorMessage: "Could not load your user account on the server. You password was not changed."
            errorMessage: "Nous n'avons pas réussi à charger votre compte. Votre mot de passe n'a pas été changé"
        };
    }
//    sessionRef.unPromote(promoteToken); //Put the session back to normal.
};
model.User.methods.modifyPassword.scope = "public";