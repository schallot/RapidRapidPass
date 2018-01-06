// Assumes that rapidrapidsettings.js has already been loaded.

console.log('Starting RapidRapidPass, version 1.0.1.');
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
		// Grab the page's question, and search through our list of answers for a match.
		var question = $("#MainContent_lblQuestion").text();
		console.log("{q:\"" + question + "\", a:false},");
		
		config.responses.forEach(function(qa){
			if(qa.q == question){
				// If the user answered yes, click the yes button
				if(qa.a === true){
					$("#MainContent_btnYes").click();
				}
				// If the user answered no, click the no button.
				else if(qa.a === false){
					$("#MainContent_btnNo").click();	
				}
			}
		});
	}	
});
