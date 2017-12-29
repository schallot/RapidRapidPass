var rapidrapidkeys = {
	powerswitch: "powerswitch",
	powerswitchOn : "extensionEnabled",
	powerswitchOff : "extensionDisabled",
	firstName: "fname",
	lastName: "lname",
	zipCode: "zipcode",
	email: "email",
	gender: "gender",
	genderMale : "genderMale",
	genderFemale : "genderFemale",
	birthdate: "birthdate",
	saveButton : "btnSave"
};

var addCssAndModalToPage = function(title, allowClosing){
	$("<style>")
    .prop("type", "text/css")
    .html("\r\n\
    \r\n\
	/* The Modal (background) */\r\n\
	#myModal {\r\n\
		display: none; /* Hidden by default */\r\n\
		position: fixed; /* Stay in place */\r\n\
		z-index: 9999; /* Sit on top */\r\n\
		left: 0;\r\n\
		top: 0;\r\n\
		width: 100%; /* Full width */\r\n\
		height: 100%; /* Full height */\r\n\
		overflow: auto; /* Enable scroll if needed */\r\n\
		background-color: rgb(0,0,0); /* Fallback color */\r\n\
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\r\n\
	}\r\n\
	\r\n\
	/* Modal Content/Box */\r\n\
	#rapidrapidsettingsmodal {\r\n\
		background-color: #fefefe;\r\n\
		margin: 8% auto; /* 8% from the top and centered */\r\n\
		padding: 20px;\r\n\
		border: 1px solid #888;\r\n\
		width: 80%; /* Could be more or less, depending on screen size */\r\n\
	}\r\n\
	\r\n\
	/* The Close Button */\r\n\
	.close {\r\n\
		color: #aaa;\r\n\
		float: right;\r\n\
		font-size: 28px;\r\n\
		font-weight: bold;\r\n\
	}\r\n\
	\r\n\
	.close:hover,\r\n\
	.close:focus {\r\n\
		color: black;\r\n\
		text-decoration: none;\r\n\
		cursor: pointer;\r\n\
	}\r\n\
	\r\n\
	.rapidrapid table {\r\n\
		font-family: arial, sans-serif;\r\n\
		border-collapse: collapse;\r\n\
		width: 100%;\r\n\
	}\r\n\
	\r\n\
	.rapidrapid td, th {\r\n\
		border: 1px solid #dddddd;\r\n\
		text-align: left;\r\n\
		padding: 8px;\r\n\
	}\r\n\
	\r\n\
	.rapidrapid tr:nth-child(even) {\r\n\
		background-color: #dddddd;\r\n\
	}\r\n\
	\r\n\
	.rapidrapidbutton {\r\n\
		background-color: white; \r\n\
		border: none;\r\n\
		color: black; \r\n\
		padding: 16px 32px;\r\n\
		text-align: center;\r\n\
		text-decoration: none;\r\n\
		display: inline-block;\r\n\
		font-size: 16px;\r\n\
		margin: 4px 2px;\r\n\
		width: 100%;\r\n\
		-webkit-transition-duration: 0.4s; /* Safari */\r\n\
		transition-duration: 0.4s;\r\n\
		cursor: pointer;\r\n\
		border: 6px solid #004880;\r\n\
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);\r\n\
	\r\n\
	}\r\n\
	\r\n\
	.rapidrapidbutton:hover {\r\n\
		background-color: #004880;\r\n\
		color: white;\r\n\
	}\r\n\
	\r\n\
	.rapidrapidcenter{ text-align: center; }\r\n\
	\r\n\
	/* The Close Button */\
	.rapidrapidclose {\
		color: #aaa;\
		float: right;\
		font-size: 28px;\
		font-weight: bold;\
	}\
	\
	.rapidrapidclose:hover,\
	.rapidrapidclose:focus {\
		color: black;\
		text-decoration: none;\
		cursor: pointer;\
	}\
	\r\n")
    .appendTo("head");
	
	var modalDiv = $("<div id=\"myModal\" class=\"modal rapidrapid\"></div>");
	var modalContent = $("<div class=\"modal-content rapidrapid\" id=\"rapidrapidsettingsmodal\"></div>");
	var closeSpan = $("<span class=\"rapidrapidclose\">&times;</span>")
	if(allowClosing === true){
		modalContent.append(closeSpan);		
		// When the user clicks on <span> (x), close the modal
		closeSpan.click(function() {
			modalDiv.hide();
		});
	}
	var paragraph = $("<p>" + title + "</p>");
	
	var page = $("body");
	modalContent.append(paragraph);
	modalDiv.append(modalContent);
	page.append(modalDiv)
	
	// Get the modal
	var modal = document.getElementById('myModal');
	// Go ahead and show the modal.
	modal.style.display = "block";
}


// Get the plugin's config object from the Chrome storage api, and pass that config to a callback method.
var getConfigFromDatastore = function(callback){
	chrome.storage.sync.get(null, function(config){
		if(!config){
			console.log("No existing settings were found.");
		}
		callback(config);
	});
}

// Save the plugin's config object to the Chrome storage api, and then call a callback method.
var saveConfigToDatastore = function(config, callback){
	chrome.storage.sync.set(config, function(){
		console.log("Finished saving settings.");
		callback();
	})
}

var createAndPopulateConfigEditControls = function(config, startRapidRapidAutofillCallback){
	var createElt = function(elementName, content1, content2){
		var result = $("<" + elementName + ">");
		if(content1){
			result.append(content1);
		}
		if(content2){
			result.append(content2);
		}
		return result;
	}
	
	var createTableRow = function(propertyName, inputElement){
		var row = createElt("tr", createElt("td", propertyName));
		row.append(createElt("td", inputElement));
		return row;
	}
	
	var createTextInput = function(id, placeholder){
		var input = createElt("input");
		input.attr("id", id);
		input.attr("name", id);
		input.attr("placeholder", placeholder);
		input.attr("type", "text")
		return input;
	}
	
	var createRadioButton = function(id, name, value){
		var rdio = createElt("input");
		rdio.attr("id", id);
		rdio.attr("name", name);
		rdio.attr("type", "radio");
		rdio.attr("value", value);
		return rdio;
	}
	
	var createTwoRadioButtons = function(name, id1, id2, value1, value2, text1, text2){
		var frm = createElt("form");
		frm.append(createRadioButton(id1, name, value1));
		frm.append(text1)
		frm.append("<br>\r\n");
		frm.append(createRadioButton(id2, name, value2));
		frm.append(text2)
		frm.append("<br>\r\n");
		return frm;
	}
	
	var createDateInput = function(id){
		var dt = createElt("input");
		dt.attr("id", id);
		dt.attr("name", id);
		dt.attr("type", "date");
		return dt;
	}
	
	var createButton = function(id, content){
		var btn = createElt("button", content);
		btn.attr("id", id);
		btn.attr("type", "button");		
		return btn;
	}
	
	var powerswitchForm = createTwoRadioButtons(rapidrapidkeys.powerswitch, rapidrapidkeys.powerswitchOn, 
												rapidrapidkeys.powerswitchOff, rapidrapidkeys.powerswitchOn, 
												rapidrapidkeys.powerswitchOff, "Enabled", "Disabled");
	var powerswitchOffInput = powerswitchForm.find("#" + rapidrapidkeys.powerswitchOff);
	var powerswitchOnInput = powerswitchForm.find("#" + rapidrapidkeys.powerswitchOn);
	var firstNameInput = createTextInput(rapidrapidkeys.firstName, "Enter First Name");
	var lastNameInput = createTextInput(rapidrapidkeys.lastName, "Enter Last Name");
	var birthdateInput = createDateInput(rapidrapidkeys.birthdate);
	var genderRadioForm = createTwoRadioButtons(rapidrapidkeys.gender, rapidrapidkeys.genderFemale, 
												rapidrapidkeys.genderMale, rapidrapidkeys.genderFemale, 
												rapidrapidkeys.genderMale, "Female", "Male")
	var genderFemaleInput = genderRadioForm.find("#" + rapidrapidkeys.genderFemale);
	var genderMaleInput = genderRadioForm.find("#" + rapidrapidkeys.genderMale);
	var zipCodeInput = createTextInput(rapidrapidkeys.zipCode, "Enter Zip Code");
	var emailInput = createTextInput(rapidrapidkeys.email, "Enter Email");
	
	var settingsSpan = $("#rapidrapidsettingsmodal");
	var table = createElt("table");
		
	var header = createElt("tr", createElt("th", "Property Name"), createElt("th", "Value"));
	table.append(header);

	if(!startRapidRapidAutofillCallback){
		table.append(createTableRow("Extension Enabled?",powerswitchForm));
	}
	table.append(createTableRow("First Name", firstNameInput));
	table.append(createTableRow("Last Name", lastNameInput));
	table.append(createTableRow("Birth Date", birthdateInput));
	table.append(createTableRow("Gender",genderRadioForm));	
	table.append(createTableRow("Zip Code", zipCodeInput));
	table.append(createTableRow("Email Address", emailInput));
	settingsSpan.append(table);
	
	var saveButton = createButton(rapidrapidkeys.saveButton, "Save")
	saveButton.attr("disabled", "disabled");
	
	var startAutofillButton = createButton("btnStartRapidRapid", "Start RapidPass Autofill");
	if(!startRapidRapidAutofillCallback){
		settingsSpan.append(saveButton);
	}
	else{
		startAutofillButton.attr("class", "rapidrapidbutton")
		var centerAlignDiv = $("<div class=\"rapidrapidcenter\"><div>");
		centerAlignDiv.append(startAutofillButton);
		settingsSpan.append(centerAlignDiv);
	}

	var disableSave = function(){
		saveButton.attr("disabled", "disabled");
	}
	
	var enableSave = function(){
		saveButton.attr('disabled', false);
	};
	
	//////////////////////////////////////////
	/// Populate control values from config 
	//////////////////////////////////////////
	
	firstNameInput.val(config[rapidrapidkeys.firstName]);
	lastNameInput.val(config[rapidrapidkeys.lastName]);
	zipCodeInput.val(config[rapidrapidkeys.zipCode]);
	emailInput.val(config[rapidrapidkeys.email]);
	birthdateInput.val(config[rapidrapidkeys.birthdate]);
	if(config[rapidrapidkeys.gender] == "male"){
		genderMaleInput.attr('checked', true);
		genderFemaleInput.attr('checked', false);
	}
	else{
		genderMaleInput.attr('checked', false);
		genderFemaleInput.attr('checked', true);
	}
	if(config[rapidrapidkeys.powerswitch] == "disabled"){
		powerswitchOnInput.attr('checked', false);
		powerswitchOffInput.attr('checked', true);
	}
	else{
		powerswitchOnInput.attr('checked', true);
		powerswitchOffInput.attr('checked', false);			
	}

	var saveConfig = function(callback){
		console.log("Saving settings...");
		disableSave();
		config[rapidrapidkeys.firstName] = firstNameInput.val();
		config[rapidrapidkeys.lastName] = lastNameInput.val();
		config[rapidrapidkeys.zipCode] = zipCodeInput.val();
		config[rapidrapidkeys.email] = emailInput.val();
		config[rapidrapidkeys.birthdate] = birthdateInput.val();
		
		if(genderFemaleInput.is(":checked")){
			config[rapidrapidkeys.gender] = "female";
		}
		else{
			config[rapidrapidkeys.gender] = "male";
		}
		
		if(powerswitchOffInput.is(":checked")){
			config[rapidrapidkeys.powerswitch] = "disabled";
		}
		else{
			config[rapidrapidkeys.powerswitch] = "enabled";
		}
		
		saveConfigToDatastore(config, function(){
			console.log("All settings saved.");
			if(callback){
				callback(config);
			}
		});
	}	
	
	saveButton.click(saveConfig);
	startAutofillButton.click(function(){
		saveConfig(startRapidRapidAutofillCallback);
	})
	
	//////////////////////////////////////////
	
	firstNameInput.keyup(enableSave);
	lastNameInput.keyup(enableSave);
	zipCodeInput.keyup(enableSave);
	emailInput.keyup(enableSave);
	genderFemaleInput.change(enableSave);
	genderMaleInput.change(enableSave);				
	birthdateInput.change(enableSave);
	birthdateInput.keyup(enableSave);
	powerswitchOffInput.change(enableSave);
	powerswitchOnInput.change(enableSave);
}

var showRapidRapidSettingsModal = function(existingConfig,startRapidRapidAutofillCallback){
	$(document).ready(function() {
		var title = "RapidRapidPass Settings.  After you make a change, be sure to hit the save button.";
		var allowModalClose = false;
		if(startRapidRapidAutofillCallback)
		{
			title = "Fill out and/or update the settings below before clicking the Start RapidPass Autofill button.";
			allowModalClose = true;
		}
		addCssAndModalToPage(title, allowModalClose);
		
		if(existingConfig){
			createAndPopulateConfigEditControls(existingConfig, startRapidRapidAutofillCallback);
			return;
		}
		// If the caller didn't provide a config, we'll pull it ourselves.
		getConfigFromDatastore(function(config){
			createAndPopulateConfigEditControls(config, startRapidRapidAutofillCallback);
		});
	});	
}