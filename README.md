






Web Merchant API 
Implementation Guide
August 2020
Version 1.0





















 
Copyright statement
The information contained in this document is confidential and proprietary to Vocalink Limited, its successors or assignees and (if applicable) its prospective or actual customers/partners. The copyright in this document is owned by Vocalink Limited, or its successors or assignees. This document shall not be used, disclosed or copied in whole or in part for any purposes without the express permission of the owner.
© Vocalink Limited 2017. All rights reserved




 
Document History
Version	Date	Summary of Changes
1.0	18-08-2020	Initial Draft
Contents
About this document	5
Introduction	5
Audience	5
Scope	5
Functional overview	6
Introduction	6
Sequence Diagram	7
Technical overview	8
Introduction	8
Certified Browsers and Devices	8
Download	8
Folder Components	8
Technical requirements	9
General requirements	9
Integration of Web Merchant API	10
Web Merchant API Setup	10
Implementation Steps	10
Appendices	13
Template file	13
Error Codes	15
Troubleshooting	16
About this document
Introduction
This document describes the Merchant API SDK for Web. The SDK is provided by Zapp and is ready to implement. 
Audience
This document is intended to be used by external Participants to support the implementation and subsequent use of the Web Merchant API.
Scope
The scope of this document covers integration and implementation of the Web Merchant API
 
Functional overview
Introduction
The Web Merchant API is a web library that enables a merchant/distributor to enable payments through a consumer selected CFI on a single device.
The Web Merchant API enables the merchant to get information about the CFIs supported by Mastercard for PBA-RFP. This CFI information can be used by the merchant to display supported CFIs on their website during an invoice presentment. A consumer can see the available banks and select and launch a CFI he wants to pay with. 

Flow diagram

 
Figure 1: Flow diagram of user journey 

User Journey

 
Figure 2: User journey 

User journey steps:
	User on merchant website selects a CFI during an invoice presentment.
	CFI app is launched with Account details. User confirms the payment on the CFI App.
	User is presented the Order confirmation on the CFI App.
	User is redirected back to the success page on Merchant website on successful payment.

Certified Browsers and Devices
Zapp has certified the Web Merchant API SDK to work with the following browsers and respective devices:
	Operating System/ Browser	OS Version	Comments
Mobile (iOS)			
 iPhone X	Chrome, Safari, Firefox	13.6.1	
iPhone 6	Safari and Chrome	12.4	
iPhone 6S Plus	Safari and Chrome	13.3	
Table 1: 	Certified Browsers and devices

Sequence Diagram

 
Figure 3: 	Sequence diagram 
Technical overview
Introduction
This chapter provides instructions on the implementation of the Web Merchant API SDK.
Pre- requisites
Please ensure that the Mastercard process of distributor/merchant on boarding has been completed.
Availability of Web Merchant API SDK
After completing the on boarding with Mastercard, download the Web Merchant API SDK from the below location.
 [Placeholder for github location ]
File Name / Version	Hosted On	Version	Download Location
Web_merchant_api.zip		1.0.0	
Table 2: 	Web Merchant API SDK Library download location
Folder Components
The Web Merchant API SDK is a JavaScript based product. It consists of a JavaScript file and a template file in a folder. 
The overall folder structure is represented in Figure below and contains:
1.	A versioned zapp-merchant-api-artefact-1.0.0.js file.
2.	A zapp-merchant-api-externalJs.template file which contains sample code explaining the use of the library and how to invoke the APIs.
3.	A License for the SDK
4.	A CONTRIBUTING.md file which contains a description for how developers can contribute the project
5.	A README.md file which contains a brief description about the SDK.
6.	A CHANGELOG.md file which contains a curated, chronologically ordered list of notable changes for each version of a project.

 
Figure 4:	Web Merchant API SDK folder structure 

Guidelines to Integrate the Web Merchant API 
General requirements
The following table shows the general requirements to setup the Web Merchant API SDK.
Component	Version
JQuery	3.5.1
Table 3: 	Web Merchant API SDK – Setup requirements
JQuery is used by the Web Merchant API SDK to perform various operations. It should be the first script to be imported in the project. JQuery can be included by printing the following HTML script tag in the parent HTML page in the header section:
<head>
…
<script src=" https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
…
</head>
This will import the JQuery plugins in to the project.
Note	This version of JQuery is the current certified version for Web Merchant API functioning on the supported browsers and devices. Support for the latest version of JQuery is on the Web Merchant API Product Roadmap and will be considered for future releases of this SDK.
Integration Steps
Follow the below mentioned steps to include the Web Merchant API in the Merchant website.
1.	Extract the Web_merchant_api.zip and add the zapp-merchant-api-artefact-1.0.0.js in the project.
2.	Import the JavaScript library zapp-merchant-api-artefact-1.0.0.js in the parent page where the bank list needs to be displayed by adding the script tag in the html page.
Example:
<html>
    <head>
    	<script src="../zapp_merchant_api_assets/zapp-merchant-api-artefact-1.0.0.js"></script>
    </head>
</html>

 
Web Merchant API Interface
The Web Merchant API SDK interface exposes the following functions to be integration by the merchant. 
1.  getCfiDetails: This function retrieves the list of supported CFIs for PBA-RFP by Mastercard. This list contains the names, the logo and the unique id assigned to the CFI by Zapp. 
2. invokeApp: This function is used to invoke the consumer selected banking app using the unique universal link for the CFI.
Implementation Steps 
Use the following steps to invoke the SDK’s API in the Merchant website.
•	Invoke the zappMerchantApi.getCfiDetails function in the merchant website specific external js file used on the page where bank list is to be displayed. This function returns a promise with a value true when resolved, merchant can then use the zappMerchantApi.cfiDetails object to display the bank list with additional bank information like name and logo on their page. This function must be invoked as soon as the page's Document Object Model (DOM) becomes ready.
Example:
$(document).ready(function() {
	
var merchantFunctionToInvokeGetCFIDEtailsApi= function () {
            zappMerchantApi.getCfiDetails.then(function(result) {

//Promise is resolved, use the zappMerchantApi objects to display the bank details. Two zappMerchantApi objects are:

1.	zappMerchantApi.cfiDetails – A list of banks with the following details.
i.	cfiLogo: "https://cdn/..../bankName-bank.png"
ii.	cfiName: "Bank name"
iii.	cfiUniqueId: "Bank Unique Id"
 

2.	zappMerchantApi.cfiCount – Total number of banks
            
        })
        .catch(function (error) {
// Merchant specific code
        });
	};


    Sample zappMerchantApi.cfiDetails object which contains information of four Banks:


0: {cfiUniqueId: "273841", cfiName: "bankName1", cfiLogo: "https://cdn/..../bankName1-bank.png"}
1: {cfiUniqueId: "902738", cfiName: "bankName2", cfiLogo: "https://cdn/..../bankName2-bank.png"}
2: {cfiUniqueId: "829456", cfiName: "bankName3", cfiLogo: "https://cdn/..../bankName3-bank.png"}
3: {cfiUniqueId: "126488", cfiName: "bankName4", cfiLogo: "https://cdn/..../bankName4-bank.png"}


•	Invoke the zappMerchantApi.invokeApp function to open the user selected Bank App. This API must be called when consumer selects one of the banks from the list displayed by the Merchant on the page. This API requires three parameters.
i.	CFI Unique Id – This is the cfiUniqueId of the selected bank. This value is Zapp assigned unique id available in zappMerchantApi.cfiDetails object.
ii.	AptrId – It is returned by Zapp in response to SubmitRFP API triggered by the Merchant on selection of a bank by the consumer.
iii.	Product Type – The value of this parameter must be PBA-RFP. This is not case sensitive.
Example:

function paymentRequestToMechantServer(clickedBtn) {

// Merchant’s logic to invoke the Submit RFP API. After successful response AptrId is received by merchant. Use the same as one of the parameter to invoke the zappMerchantApi.invokeApp function. 

 		zappMerchantApi.invokeApp(cfiUniqueId, aptrId, 'PBA-RFP'); 
				
}


•	Register a listener to capture the error log event returned from the SDK. The event returns an error log data which contains error Id, error description and error time stamp.  Please ensure that the event name is used exactly the way it is mentioned below. Refer the section Error Codes for more details. 
Example:

function listener(event) {
	var evData =event.data;
	if(evData.eventType == "zappMerchantApiError" ){
		console.log(evData.data)
	}
	
}




Appendices
Template file
The zapp-merchant-api-externalJs.template file contains the sample code to demonstrate the use of the Web Merchant API SDK.  This code also depicts the implementation of the custom method to post payment request to the Merchant Server. This file resides in the Web Merchant API SDK folder along with the zapp-merchant-api-artefact-1.0.0.js file.
Note	Any data elements and comments in Italic are a Merchant specific data element which must be provided by the Merchant.
Assumption	This is the JS file used on the Merchant’s website.


Sample code:

	
$(document).ready(function() {
		
		var invokeSbiCfiApi= function () {
		// Web Merchant API function to get the bank details. 
		zappMerchantApi.getCfiDetails.then(function(result) {
            //Promise is resolved, use the zappMerchantApi objects to display the bank details. Two zappMerchantApi objects are:

		//	1.	zappMerchantApi.cfiDetails – This object contains the list of banks with the following details.
		//	i.	cfiLogo: "https://cdn/..../bankName-bank.png"
		//	ii.	cfiName: "Bank name"
		//	iii.	cfiUniqueId: "Bank Unique Id"
				 
		//	2.	zappMerchantApi.cfiCount – It contains the number of banks present in the CDN file 

		merchantFunctionToRenderBankLogos(); //
            
        })
        .catch(function (error) {
            //Merchant specific code
        });
	};
	
	merchantFunctionToRenderBankLogos();
	
});




// Merchant specific implementation. 
merchantFunctionToRenderBankLogos = function(){
		for(i=0;i<zappMerchantApi.cfiCount;i++)
		{
			$("#merchantBankListContainer").append('<li><img src="'+
					zappMerchantApi.cfiDetails[i].cfiLogo+'" alt="'+zappMerchantApi.cfiDetails[i].cfiName+
					'"><span><p>'+zappMerchantApi.cfiDetails[i].cfiName+
					'</p> <span>Bank Account</span></span><a id="'+zappMerchantApi.cfiDetails[i].cfiUniqueId+
					'" href="#" onclick=submitRFP('+zappMerchantApi.cfiDetails[i].cfiUniqueId+')>Select</a></li>');		
		}
}; 


function merchantFunctionToInvokeGetCFIDEtailsApi(bankId) {
	var cfiID = bankId.id; // This must contain the CFI Unique id of the selected bank
	var response = '';
	var merchantRequestForPayPostData = {
		// Merchant Request for Payment Post Data 
	};
	
	jQuery.ajax({
	url : merchantRequestForPayPostOrder, ", //The merchant URL to post the Request for Payment
	dataType : "json",
	contentType : "application/json; charset=UTF-8",
	type : "put",
	async: false, 	// Keep it as it is
	data : JSON.stringify(merchantRequestForPayPostData),
	crossDomain : true,
	success : function(merchantRequestForPaymentResponseObject) {
		ajaxFlag = true; // flag to indicate that ajax call is completed successfully
		 response = {
			success : true,
			aptrId : merchantRequestForPaymentResponseObject.aptrId,
				//other details
			};				
		},
		error : function(merchantRequestForPaymentResponseObject) {
			// Merchant specific code to handle error
		}
	});
	
	// If the ajaxFlag is true then zappMerchantApi.invokeApp function is invoked.
	





	if (ajaxFlag == true){
		//Web Merchant API function to invoke Bank APP
		zappMerchantApi.invokeApp(cfiID, response.aptrId, 'PBA-RFP');  // These three parameters are required for opening the bank app
	 }

}

function listener(event) {
	var evData =event.data;
	// Check for zappMerchantApiError event for the Error details
	// event.data contains the Error object with the following information
	// 		errorDesc
	//		errorId
	//		errorTimestamp
	
	if(evData.eventType == "zappMerchantApiError" ){
		console.log(evData.data); // Merchant specific code to handle the errors
	}	
}

if(window.addEventListener){
	 addEventListener("message", listener, false)
} else {
	 attachEvent("onmessage", listener)
} 




Error Codes
The Web Merchant API SDK captures the error while executing the zappMerchantApi.getCfiDetails and zappMerchantApi.invokeApp functions. The SDK returns and event with the error Id, error description and a timestamp. Below mentioned table describes all the Error Codes defined in SDK.
Sample error object:

zappMerchantApiError:{
“errorDesc”: "Error Description",
“errorId”: "Sxxx",
“errorTimestamp”: "Mon, 24 Aug YYYY 00:09:02 GMT" }

Error codes	Error description	Cause of the error
S1001	CFI Id is undefined	When zappMerchantApi.invokeApp function is invoked without CFI Id. 
Example: zappMerchantApi.invokeApp(undefined,aptrId,’PBA-RFP’)
S1002	AptrId is undefined	When zappMerchantApi.invokeApp function is invoked without AptrId. 
Example: zappMerchantApi.invokeApp(cfiId,undefined,’PBA-RFP’)
S1003	Product Type is undefined	When zappMerchantApi.invokeApp function is invoked without product type. 
Example: zappMerchantApi.invokeApp(cfiId,aptrId,undefined)
S1004	CFI Id is null or empty	When zappMerchantApi.invokeApp function is invoked with empty CFI Id or with null value. 
Example: zappMerchantApi.invokeApp(‘’,aptrId,’PBA-RFP’)
Or
zappMerchantApi.invokeApp(null,aptrId,’PBA-RFP’)
S1005	AptrId is null or empty	When zappMerchantApi.invokeApp function is invoked with empty Aptr Id or with null value. 
Example: zappMerchantApi.invokeApp(cfiId,’’,’PBA-RFP’)
Or
zappMerchantApi.invokeApp(cfiId,null,’PBA-RFP’)
S1006	Product Tpye is null or empty	When zappMerchantApi.invokeApp function is invoked with empty productType or with null value. 
Example: zappMerchantApi.invokeApp(cfiId, aptrId,’’)
Or
zappMerchantApi.invokeApp(cfiId, aptrId,null)
S1007	No data present for CFI Id	When zappMerchantApi.invokeApp function is invoked with empty productType or with null value. 

S9997	Unknown error has occured	When an unknown error occurs while invoking the zappMerchantApi.invokeApp function
S9998	An error has occurred while reading the JSON file. Error Type: errTyp . Error Text: errTxt	When zappMerchantApi.getCfiDetails function is invoked and an error occurs. 
S9999	An unknown error has occurred	When an unknown error occurs while invoking the zappMerchantApi.getCfiDetails function
Table 4: 	Web Merchant API SDK – Error Codes

Troubleshooting
This section covers the different troubleshooting scenarios and the behaviour of the Web Merchant API. 
1.	For the SDK to work as expected the default browser settings should allow pop ups to open on the mobile device.
2.	If merchant is using jquery ajax call to invoke Submit RFP then merchant must wait for the ajax call to complete to invoke the zappMerchantApi.invokeApp function of the SDK. Alternatively merchant can use the async: false parameter when making an ajax call. Refer the template file in the SDK for an example.
3.	The Web Merchant API SDK opens a new tab to redirect to the universal link provided by the bank. If the bank app is not installed on the consumer’s device then the page displayed on the new opened tab is handled by the bank. 









	


