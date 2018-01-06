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
	/* The Close Button */\r\n\
	.rapidrapidclose {\r\n\
		color: #aaa;\r\n\
		float: right;\r\n\
		font-size: 28px;\r\n\
		font-weight: bold;\r\n\
	}\r\n\
	\r\n\
	.rapidrapidclose:hover,\r\n\
	.rapidrapidclose:focus {\r\n\
		color: black;\r\n\
		text-decoration: none;\r\n\
		cursor: pointer;\r\n\
	}\r\n\
	\r\n\
	/* Yes/No Radio Buttons */\r\n\
	.switch-field {\r\n\
	  font-family: \"Lucida Grande\", Tahoma, Verdana, sans-serif;\r\n\
	  padding: 0px;\r\n\
		overflow: hidden;\r\n\
	}\r\n\
	\r\n\
	.switch-title {\r\n\
	  margin-bottom: 6px;\r\n\
	}\r\n\
	\r\n\
	.switch-field input {\r\n\
		position: absolute !important;\r\n\
		clip: rect(0, 0, 0, 0);\r\n\
		height: 1px;\r\n\
		width: 1px;\r\n\
		border: 0;\r\n\
		overflow: hidden;\r\n\
	}\r\n\
	\r\n\
	.switch-field label {\r\n\
	  float: left;\r\n\
	}\r\n\
	\r\n\
	.switch-field label {\r\n\
	  display: inline-block;\r\n\
	  width: 60px;\r\n\
	  background-color: #e4e4e4;\r\n\
	  color: rgba(0, 0, 0, 0.6);\r\n\
	  font-size: 14px;\r\n\
	  font-weight: normal;\r\n\
	  text-align: center;\r\n\
	  text-shadow: none;\r\n\
	  padding: 6px 14px;\r\n\
	  border: 1px solid rgba(0, 0, 0, 0.2);\r\n\
	  -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);\r\n\
	  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);\r\n\
	  -webkit-transition: all 0.1s ease-in-out;\r\n\
	  -moz-transition:    all 0.1s ease-in-out;\r\n\
	  -ms-transition:     all 0.1s ease-in-out;\r\n\
	  -o-transition:      all 0.1s ease-in-out;\r\n\
	  transition:         all 0.1s ease-in-out;\r\n\
	}\r\n\
	\r\n\
	.switch-field label:hover {\r\n\
		cursor: pointer;\r\n\
	}\r\n\
	\r\n\
	.switch-field input:checked + label {\r\n\
	  background-color: #A5DC86;\r\n\
	  -webkit-box-shadow: none;\r\n\
	  box-shadow: none;\r\n\
	}\r\n\
	\r\n\
	.switch-field label:first-of-type {\r\n\
	  border-radius: 4px 0 0 4px;\r\n\
	}\r\n\
	\r\n\
	.switch-field label:last-of-type {\r\n\
	  border-radius: 0 4px 4px 0;\r\n\
	}\r\n\
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
			config = {};
		}
		
		if(!config.responses){
			config.responses = [];
		}
		
		var responses = 	[
			{q:"Are you feeling healthy and well today?",
				a:true},
			{q:"Are you currently taking an antibiotic?",
				a:false},
			{q:"Are you currently taking any other medication for an infection?",
				a:false},
			{q:"Have you taken any medications on the Medication Deferral List in the time frames indicated? (Review the Medication Deferral List.)",
				a:false},
			{q:"Have you read the educational materials today?",
				a:true},
			{q:"In the past 72 hours have you taken aspirin or anything that has aspirin in it?",
				a:false},
			{q:"In the past 8 weeks have you donated blood, platelets or plasma?",
				a:true},		
			{q:"In the past 8 weeks, have you had any vaccinations or other shots?",
				a:true},
			{q:"In the past 8 weeks, have you had contact with someone who was vaccinated for smallpox in the past 8 weeks?",
				a:false},
			{q:"In the past 16 weeks have you donated a double unit of red cells using an apheresis machine?",
				a:false},
			{q:"In the past 12 months have you had a blood transfusion?",
				a:false},
			{q:"In the past 12 months have you had a transplant such as organ, tissue or bone marrow?",
				a:false},
			{q:"In the past 12 months have you had a graft such as bone or skin?",
				a:false},
			{q:"In the past 12 months have you come into contact with someone else's blood?",
				a:false},
			{q:"In the past 12 months have you had an accidental needle-stick?",
				a:false},
			{q:"In the past 12 months have you had sexual contact with anyone who has HIV/AIDS or has had a positive test for the HIV/AIDS virus?",
				a:false},
			{q:"In the past 12 months have you had sexual contact with a prostitute or anyone else who takes money or drugs or other payment for sex?",
				a:false},
			{q:"In the past 12 months have you had sexual contact with anyone who has ever used needles to take drugs or steroids, or anything NOT prescribed by their doctor?",
				a:false},
			{q:"Male Donors: In the past 12 months, have you had sexual contact with another male?",
				a:false},
			{q:"Female donors: In the past 12 months have you had sexual contact with a male who had sexual contact with another male in the past 12 months?",
				a:false},		
			{q:"In the past 12 months have you had sexual contact with a person who has hepatitis?",
				a:false},
			{q:"In the past 12 months have you lived with a person who has hepatitis?",
				a:false},
			{q:"In the past 12 months have you had a tattoo?",
				a:false},
			{q:"In the past 12 months have you had ear or body piercing?",
				a:false},
			{q:"In the past 12 months have you had or been treated for syphilis or gonorrhea?",
				a:false},
			{q:"In the past 12 months have you been in juvenile detention, lockup, jail, or prison for more than 72 consecutive hours?",
				a:false},
			{q:"In the past three years have you been outside the United States or Canada?",
				a:true},
			{q:"From 1980 through 1996, did you spend time that adds up to three (3) months or more in the United Kingdom? REVIEW LIST OF COUNTRIES IN THE U.K.",
				a:false},
			{q:"From 1980 through 1996, were you a member of the U.S. military, a civilian military employee, or a dependent of a member of the U.S. military?",
				a:false},
			{q:"From 1980 to the present, did you spend time that adds up to five (5) years or more in Europe? (Review list of countries in Europe.)",
				a:false},
			{q:"From 1980 to the present, did you receive a blood transfusion in the United Kingdom or France? (Review countries list.)",
				a:false},
			{q:"Have you ever had a positive test for the HIV/AIDS virus?",
				a:false},
			{q:"Have you ever used needles to take drugs, steroids, or anything NOT prescribed by your doctor?",
				a:false},
			{q:"Have you ever received money, drugs, or other payment for sex?",
				a:false},
			{q:"Female donors: Have you ever been pregnant or are you pregnant now?",
				a:false},		
			{q:"Have you ever had malaria?",
				a:false},
			{q:"Have you ever had Chagas' disease?",
				a:false},
			{q:"Have you ever had Babesiosis?",
				a:false},
			{q:"Have you ever received a dura mater (or brain covering) graft or xenotransplantation product?",
				a:false},
			{q:"Have you ever had any type of cancer, including leukemia?",
				a:false},
			{q:"Have you ever had any problems with your heart or lungs?",
				a:false},
			{q:"Have you ever had a bleeding condition or a blood disease?",
				a:false},
			{q:"Have any of your relatives had Creutzfeldt-Jakob disease?",
				a:false},
			{q:"In the past 4 months, have you been exposed to a local Hepatitis A Outbreak?",
				a:false}
		];

		var getExistingSetting = function(question){
			for(var i = 0; i< config.responses.length; i++){
				var qa = config.responses[i];
				if(qa.q == question)
				{
					return qa;
				}
			}
			return null;
		}
		
		responses.forEach(function(item){
			var qa = getExistingSetting(item.q);
			if(qa){
				item.a = qa.a;
			}
		});
		config.responses = responses;
		
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
	
	var saveButton = createButton(rapidrapidkeys.saveButton, "Save")
	saveButton.attr("disabled", "disabled");

	var disableSave = function(){
		saveButton.attr("disabled", "disabled");
	}
	
	var enableSave = function(){
		saveButton.attr('disabled', false);
	};
	
	config.responses.forEach(function(qa, index){
		var leftCheck = "";
		var rightCheck = "checked";
		
		if(qa.a === true){
			leftCheck = "checked";
			rightCheck = "";
		}
		
		var toggler = $("<div class=\"switch-field\">\r\n\
		  <input type=\"radio\" id=\"switch_left_" + index + "\" name=\"switch_" + index + "\" value=\"yes\" " + leftCheck + "/>\r\n\
		  <label for=\"switch_left_" + index + "\">Yes</label>\r\n\
		  <input type=\"radio\" id=\"switch_right_" + index + "\" name=\"switch_" + index + "\" value=\"no\" " + rightCheck + "/>\r\n\
		  <label for=\"switch_right_" + index + "\">No</label>\r\n\
		</div>\r\n");
		
		toggler.click(function(){
			var yes = toggler.find("input")[0];
			if(qa.a != yes.checked){
				console.log("Changing answer to question <" + qa.q + "> from <" + qa.a + "> to <" + yes.checked + ">.");
				qa.a = yes.checked;
				enableSave();
			}
		})	
		var row = createTableRow(qa.q, toggler);
		table.append(row)
	});
	
	settingsSpan.append(table);
	
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
		var title = "RapidRapidPass Settings.  After you make a change, be sure to hit the save button at the bottom of this page.";
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