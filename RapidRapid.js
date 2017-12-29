// Assumes that rapidrapidsettings.js has already been loaded.

console.log('Starting RapidRapidPass, version 1.0.0.');
var firstNameControl = $('#MainContent_tbFN');

getConfigFromDatastore(function(config){
	console.log(config);
	if(config[rapidrapidkeys.powerswitch] == "disabled"){
		console.log("RapidRapidPass has been disabled.  Open the extension settings to reenable it.");
		return;
	}
	
	if(window.location.href.includes("www.redcrossblood.org/rapidpass")){
		
		var startRapidRapidAutofill = function(config){		
			var getRegionCode = function(data,zip){
				var i = 0;
				for(i = 0; i < data.length; i++){
					if(data[i].Zip===zip){
						return data[i].Code;
					}
				}
			};
			$.ajax({
				async: true,
				type: "GET",
				url: "/sites/arc/files/rcb-zip-reg-v2.csv",
				dataType: "text",
				success: function(data){
					var regions = Papa.parse(data,{delimeter:"", header:true});
					var regionCode = getRegionCode(regions.data,config[rapidrapidkeys.zipCode]);
					var rapidPassStartUrl =  'https://rapidpass.redcrossblood.org/RapidPass/iCASI.aspx?loc='+ regionCode +'&lng=US';
					window.location = rapidPassStartUrl;
				}
			});
		};	
		showRapidRapidSettingsModal(config, startRapidRapidAutofill);
	}
	else if(window.location.href.includes("Welcome.aspx"))
	{
		// Click start button.
		$("#MainContent_btnStart").click();
	}
	else if(window.location.href.includes("Complete.aspx"))
	{
		// Click complete button.
		$("#MainContent_btnEnd").click();
	}
	else if(window.location.href.includes("Finish.aspx"))
	{
		debugger;
		// Click complete button.
		$("#MainContent_btnEmail").click();
	}
	else if(window.location.href.includes("Email.aspx"))
	{
		// Click complete button.
		var email = config[rapidrapidkeys.email];
		if(!$("#MainContent_lblUpdateMessage").text().includes("sent")){
			// Click complete button.
			$("#MainContent_tbEmail1").val(email);
			$("#MainContent_tbEmail2").val(email);
			$("#MainContent_btnEmail").click();
		}
	}

	else if(firstNameControl.length >= 1){
		debugger;
		
		var formatDate = function(dateFromConfig){
			var split = dateFromConfig.split("-");
			if(split.length != 3) return "";
			var year = split[0];
			var month = split[1];
			var day = split[2];
			
			if(month.length == 1){
				month = "0" + month;
			}
			if(day.length == 1){
				day = "0" + day;
			}		
			result = month + "/" + day + "/" + year
			return result;
		}
		
		firstNameControl.val(config[rapidrapidkeys.firstName]);
		$('#MainContent_tbLN').val(config[rapidrapidkeys.lastName]);
		$('#MainContent_tbDOB').val(formatDate(config[rapidrapidkeys.birthdate]));
		if(config[rapidrapidkeys.gender] == "male"){
			$("#MainContent_rblGender_0").attr("checked", 'checked');
			$("#MainContent_btnSubmit").click();
		}
		else if(config[rapidrapidkeys.gender] == "female"){
			$("#MainContent_rblGender_1").attr("checked", 'checked');
			$("#MainContent_btnSubmit").click();
		}				
	}
	else{
		var question = $("#MainContent_lblQuestion").text();
		console.log("		case \"" + question + "\":\r\n			$(\"#MainContent_btnNo\").click();\r\n		break;")
		switch(question){
			case "Are you feeling healthy and well today?":
				$("#MainContent_btnYes").click();
			break;
			case "Are you currently taking an antibiotic?":
				$("#MainContent_btnNo").click();
			break;
			case "Are you currently taking any other medication for an infection?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you taken any medications on the Medication Deferral List in the time frames indicated? (Review the Medication Deferral List.)":
				$("#MainContent_btnNo").click();
			break;
			case "Have you read the educational materials today?":
				$("#MainContent_btnYes").click();
			break;
			case "In the past 72 hours have you taken aspirin or anything that has aspirin in it?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 8 weeks have you donated blood, platelets or plasma?":
				$("#MainContent_btnYes").click();
			break;		
			case "In the past 8 weeks, have you had any vaccinations or other shots?":
				$("#MainContent_btnYes").click();
			break;
			case "In the past 8 weeks, have you had contact with someone who was vaccinated for smallpox in the past 8 weeks?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 16 weeks have you donated a double unit of red cells using an apheresis machine?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had a blood transfusion?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had a transplant such as organ, tissue or bone marrow?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had a graft such as bone or skin?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you come into contact with someone else's blood?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had an accidental needle-stick?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had sexual contact with anyone who has HIV/AIDS or has had a positive test for the HIV/AIDS virus?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had sexual contact with a prostitute or anyone else who takes money or drugs or other payment for sex?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had sexual contact with anyone who has ever used needles to take drugs or steroids, or anything NOT prescribed by their doctor?":
				$("#MainContent_btnNo").click();
			break;
			case "Male Donors: In the past 12 months, have you had sexual contact with another male?":
				$("#MainContent_btnNo").click();
			break;
			case "Female donors: In the past 12 months have you had sexual contact with a male who had sexual contact with another male in the past 12 months?":
				$("#MainContent_btnNo").click();
			break;		
			case "In the past 12 months have you had sexual contact with a person who has hepatitis?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you lived with a person who has hepatitis?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had a tattoo?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had ear or body piercing?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you had or been treated for syphilis or gonorrhea?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 12 months have you been in juvenile detention, lockup, jail, or prison for more than 72 consecutive hours?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past three years have you been outside the United States or Canada?":
				$("#MainContent_btnYes").click();
			break;
			case "From 1980 through 1996, did you spend time that adds up to three (3) months or more in the United Kingdom? REVIEW LIST OF COUNTRIES IN THE U.K.":
				$("#MainContent_btnNo").click();
			break;
			case "From 1980 through 1996, were you a member of the U.S. military, a civilian military employee, or a dependent of a member of the U.S. military?":
				$("#MainContent_btnNo").click();
			break;
			case "From 1980 to the present, did you spend time that adds up to five (5) years or more in Europe? (Review list of countries in Europe.)":
				$("#MainContent_btnNo").click();
			break;
			case "From 1980 to the present, did you receive a blood transfusion in the United Kingdom or France? (Review countries list.)":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had a positive test for the HIV/AIDS virus?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever used needles to take drugs, steroids, or anything NOT prescribed by your doctor?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever received money, drugs, or other payment for sex?":
				$("#MainContent_btnNo").click();
			break;
			case "Female donors: Have you ever been pregnant or are you pregnant now?":
				$("#MainContent_btnNo").click();
			break;		
			case "Have you ever had malaria?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had Chagas' disease?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had Babesiosis?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever received a dura mater (or brain covering) graft or xenotransplantation product?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had any type of cancer, including leukemia?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had any problems with your heart or lungs?":
				$("#MainContent_btnNo").click();
			break;
			case "Have you ever had a bleeding condition or a blood disease?":
				$("#MainContent_btnNo").click();
			break;
			case "Have any of your relatives had Creutzfeldt-Jakob disease?":
				$("#MainContent_btnNo").click();
			break;
			case "In the past 4 months, have you been exposed to a local Hepatitis A Outbreak?":
				$("#MainContent_btnNo").click();
			break;
		}
	}	
});
