# Web Merchant API 
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Overview
The Web Merchant API SDK is written in JavaScript. It can be included on any Website by following a few simple steps The Web Merchant API enables distributors to get details of banks and to invoke the bank apps using the SDK. The SDK is provided by Zapp and is ready to implement. 
### Audience
SDK intended to be used by external Participants to support the implementation and subsequent use of the Web Merchant API.

## Integration and Implementation of the Web Merchant API

## Contents
- [Functional overview](#functional-overview)
  - [Introduction](#functional-overview)
  - [Flow Diagram](#flow-diagram)
  - [User Journey](#user-journey)
  - [Certified Browsers and Devices](#certified-browsers-and-devices)
  - [Sequence Diagram](#sequence-diagram)
- [Technical overview](#technical-overview)
  - [Introduction](#technical-overview)
  - [Pre- requisites](#pre--requisites)
  - [Availability of Web Merchant API SDK](#availability-of-web-merchant-api-sdk)
  - [Folder Components](#folder-components)
  - [Guidelines to Integrate the Web Merchant API](#guidelines-to-integrate-the-web-merchant-api)
    - [General requirements](#general-requirements)
    - [Integration Steps](#integration-steps)
  - [Web Merchant API Interface](#web-merchant-api-interface)
    - [Implementation Steps](#implementation-steps)
- [Appendices](#appendices)
  - [Template file](#template-file)
  - [Error Codes](#error-codes)
- [Troubleshooting](#troubleshooting)
 
## Functional overview
### Introduction
The Web Merchant API is a web library that enables a merchant/distributor to enable payments through a consumer selected CFI on a single device.
The Web Merchant API enables the merchant to get information about the CFIs supported by Mastercard for PBA-RFP. This CFI information can be used by the merchant to display supported CFIs on their website during an invoice presentment. A consumer can see the available banks and select and launch a CFI he wants to pay with. 

### Flow Diagram
<img src="https://user-images.githubusercontent.com/51792552/106197173-467f1400-61aa-11eb-8dc9-a35004949540.png" width="552" height="568"/>

##### Figure 1: Flow diagram of user journey 

### User Journey

<img src="https://user-images.githubusercontent.com/51792552/106196037-db810d80-61a8-11eb-91ef-06c44804ebb5.png" width="1050" height="400"/>

##### Figure 2: User journey 

##### User journey steps:
 1. User on merchant website selects a CFI during an invoice presentment.
 2. CFI app is launched with Account details. User confirms the payment on the CFI App.
 3. User is presented the Order confirmation on the CFI App.
 4. User is redirected back to the success page on Merchant website on successful payment.

### Certified Browsers and Devices
Zapp has certified the Web Merchant API SDK to work with the following browsers and respective devices:

|Mobile (iOS)	| Operating System/ Browser | OS Version | Comments |
|---------------|---------------------------| -----------| -------- |
| iPhone X |	Chrome, Safari, Firefox|13.6.1	|           |
|iPhone 6 |	Safari and Chrome |	12.4	|           |
|iPhone 6S Plus| Safari and Chrome |	13.3	|           |

##### Table 1: 	Certified Browsers and devices

### Sequence Diagram

![sequence](https://user-images.githubusercontent.com/51792552/106197177-4717aa80-61aa-11eb-823b-09550b5d9802.png)

##### Figure 3: 	Sequence diagram 

## Technical overview
### Introduction
This chapter provides instructions on the implementation of the Web Merchant API SDK.

### Pre- requisites
Please ensure that the Mastercard process of distributor/merchant on boarding has been completed.

### Availability of Web Merchant API SDK
After completing the on boarding with Mastercard, download the Web Merchant API SDK from the below location.
 [Placeholder for github location ]
 
|File Name / Version |	Hosted On |  Version   | Download Location |
|--------------------|------------| -----------| ----------------- |
|Web_merchant_api.zip |		  | 1.0.0      |                   |

##### Table 2: 	Web Merchant API SDK Library download location

### Folder Components
The Web Merchant API SDK is a JavaScript based product. It consists of a JavaScript file and a template file in a folder. 
The overall folder structure is represented in Figure below and contains:
1. A versioned **zapp-merchant-api-artefact-1.0.0.js** file.
2. A **zapp-merchant-api-externalJs.template** file which contains sample code explaining the use of the library and how to invoke the APIs.
3. A License for the SDK
4. A CONTRIBUTING.md file which contains a description for how developers can contribute the project
5. A README.md file which contains a brief description about the SDK.
6. A CHANGELOG.md file which contains a curated, chronologically ordered list of notable changes for each version of a project.

![image](https://user-images.githubusercontent.com/51792552/106197084-251e2800-61aa-11eb-9333-fe6690447349.png)

##### Figure 4:	Web Merchant API SDK folder structure 

### Guidelines to Integrate the Web Merchant API 
#### General requirements
The following table shows the general requirements to setup the Web Merchant API SDK.

|Component |                                    	Version                   |
|----------|----------------------------------------------------------------------|
| JQuery   |	3.5.1                                                             |

##### Table 3: 	Web Merchant API SDK – Setup requirements

JQuery is used by the Web Merchant API SDK to perform various operations. It should be the first script to be imported in the project. JQuery can be included by printing the following HTML script tag in the parent HTML page in the header section:

```javascript
<head>
…
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
…
</head>
```

This will import the JQuery plugins in to the project.

**Note:** This version of JQuery is the current certified version for Web Merchant API functioning on the supported browsers and devices. Support for the latest version of JQuery is on the Web Merchant API Product Roadmap and will be considered for future releases of this SDK.
 
#### Integration Steps
Follow the below mentioned steps to include the Web Merchant API in the Merchant website.
1. Extract the Web_merchant_api.zip and add the **zapp-merchant-api-artefact-1.0.0.js** in the project.
2. Import the JavaScript library zapp-merchant-api-artefact-1.0.0.js in the parent page where the bank list needs to be displayed by adding the script tag in the html page.

##### Example:

```javascript
<html>
    <head>
    	<script src="../zapp_merchant_api_assets/zapp-merchant-api-artefact-1.0.0.js"></script>
    </head>
</html>
```
 
### Web Merchant API Interface
The Web Merchant API SDK interface exposes the following functions to be integration by the merchant. 
1. **getCfiDetails**: This function retrieves the list of supported CFIs for PBA-RFP by Mastercard. This list contains the names, the logo and the unique id assigned to the CFI by Zapp. 
2. **invokeApp**: This function is used to invoke the consumer selected banking app using the unique universal link for the CFI.

#### Implementation Steps 
Use the following steps to invoke the SDK’s API in the Merchant website.

- Invoke the **zappMerchantApi.getCfiDetails** function in the merchant website specific external js file used on the page where bank list is to be displayed. This function returns a promise with a value true when resolved, merchant can then use the **zappMerchantApi.cfiDetails** object to display the bank list with additional bank information like name and logo on their page. This function must be invoked as soon as the page's Document Object Model (DOM) becomes ready.

##### Example:

```javascript
$(document).ready(function() {
	
	var merchantFunctionToInvokeGetCFIDEtailsApi= function () {
        	zappMerchantApi.getCfiDetails.then(function(result) {

	/* Promise is resolved, use the zappMerchantApi objects to display the bank details. 
	   Two zappMerchantApi objects are:

	1. zappMerchantApi.cfiDetails – A list of banks with the following details.
		i. cfiLogo: "https://cdn/..../bankName-bank.png"
		ii. cfiName: "Bank name"
		iii. cfiUniqueId: "Bank Unique Id"
 
	2. zappMerchantApi.cfiCount – Total number of banks */
	
	})
        .catch(function (error) {
		// Merchant specific code
        });
};
```

Sample **zappMerchantApi.cfiDetails** object which contains information of four Banks:

```javascript
0: {cfiUniqueId: "273841", cfiName: "bankName1", cfiLogo: "https://cdn/..../bankName1-bank.png"}
1: {cfiUniqueId: "902738", cfiName: "bankName2", cfiLogo: "https://cdn/..../bankName2-bank.png"}
2: {cfiUniqueId: "829456", cfiName: "bankName3", cfiLogo: "https://cdn/..../bankName3-bank.png"}
3: {cfiUniqueId: "126488", cfiName: "bankName4", cfiLogo: "https://cdn/..../bankName4-bank.png"}
```

- Invoke the zappMerchantApi.invokeApp function to open the user selected Bank App. This API must be called when consumer selects one of the banks from the list displayed by the Merchant on the page. This API requires three parameters.
  - CFI Unique Id – This is the cfiUniqueId of the selected bank. This value is Zapp assigned unique id available in zappMerchantApi.cfiDetails object.
  - AptrId – It is returned by Zapp in response to SubmitRFP API triggered by the Merchant on selection of a bank by the consumer.
  - Product Type – The value of this parameter must be PBA-RFP. This is not case sensitive.

##### Example:

```javascript
function paymentRequestToMechantServer(clickedBtn) {

// Merchant’s logic to invoke the Submit RFP API. After successful response AptrId is received by merchant.
// Use the same as one of the parameter to invoke the zappMerchantApi.invokeApp function. 

	zappMerchantApi.invokeApp(cfiUniqueId, aptrId, 'PBA-RFP'); 
				
}
```

- Register a listener to capture the error log event returned from the SDK. The event returns an error log data which contains error Id, error description and error time stamp.  Please ensure that the event name is used exactly the way it is mentioned below. Refer the section Error Codes for more details. 

##### Example:

```javascript
function listener(event) {
	var evData =event.data;
	if(evData.eventType == "zappMerchantApiError" ){
		console.log(evData.data)
	}	
}
```

## Appendices
### Template file
The **zapp-merchant-api-externalJs.template** file contains the sample code to demonstrate the use of the Web Merchant API SDK.  This code also depicts the implementation of the custom method to post payment request to the Merchant Server. This file resides in the Web Merchant API SDK folder along with the zapp-merchant-api-artefact-1.0.0.js file.
**Note**	Any data elements and comments in Italic are a Merchant specific data element which must be provided by the Merchant.
**Assumption**	This is the JS file used on the Merchant’s website.


##### Sample code:

```javascript	
$(document).ready(function() {
		
		var invokeSbiCfiApi= function () {
		// Web Merchant API function to get the bank details. 
		zappMerchantApi.getCfiDetails.then(function(result) {
            /*  Promise is resolved, use the zappMerchantApi objects to display the bank details.
	    	Two zappMerchantApi objects are:

		1. zappMerchantApi.cfiDetails – This object contains the list of banks with the following details.
		   i.	 cfiLogo: "https://cdn/..../bankName-bank.png"
		  ii.	 cfiName: "Bank name"
		  iii. cfiUniqueId: "Bank Unique Id"
				 
		2. zappMerchantApi.cfiCount – It contains the number of banks present in the CDN file */

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
		//Web Merchant API function to invoke Bank APP. These three parameters are required for opening the bank app
		zappMerchantApi.invokeApp(cfiID, response.aptrId, 'PBA-RFP');  
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
```


### Error Codes
The Web Merchant API SDK captures the error while executing the **zappMerchantApi.getCfiDetails** and **zappMerchantApi.invokeApp** functions. The SDK returns and event with the error Id, error description and a timestamp. Below mentioned table describes all the Error Codes defined in SDK.
##### Sample error object:

```javascript
zappMerchantApiError:{
“errorDesc”: "Error Description",
“errorId”: "Sxxx",
“errorTimestamp”: "Mon, 24 Aug YYYY 00:09:02 GMT" }
```

Error codes|Error description|Cause of the error
-----------|-----------------|------------------
S1001|CFI Id is undefined|When **zappMerchantApi.invokeApp** function is invoked without CFI Id.<br><br>Example: **zappMerchantApi.invokeApp(undefined,aptrId,’PBA-RFP’)**|
S1002|AptrId is undefined|When **zappMerchantApi.invokeApp** function is invoked without AptrId.<br><br>Example: **zappMerchantApi.invokeApp(cfiId,undefined,’PBA-RFP’)**
S1003|Product Type is undefined|When **zappMerchantApi.invokeApp** function is invoked without product type.<br><br>Example: **zappMerchantApi.invokeApp(cfiId,aptrId,undefined)**
S1004|CFI Id is null or empty|When **zappMerchantApi.invokeApp** function is invoked with empty CFI Id or with null value.<br><br>Example: **zappMerchantApi.invokeApp(‘’,aptrId,’PBA-RFP’)**<br>Or<br>**zappMerchantApi.invokeApp(null,aptrId,’PBA-RFP’)**
S1005|AptrId is null or empty|When **zappMerchantApi.invokeApp** function is invoked with empty Aptr Id or with null value.<br><br>Example: **zappMerchantApi.invokeApp(cfiId,’’,’PBA-RFP’)**<br>Or<br>**zappMerchantApi.invokeApp(cfiId,null,’PBA-RFP’)**
S1006|Product Tpye is null or empty|When **zappMerchantApi.invokeApp** function is invoked with empty productType or with null value.<br><br>Example: **zappMerchantApi.invokeApp(cfiId, aptrId,’’)**<br>Or<br>**zappMerchantApi.invokeApp(cfiId, aptrId,null)**
S1007|No data present for CFI Id|When **zappMerchantApi.invokeApp** function is invoked with empty productType or with null value.
S9997|Unknown error has occured|When an unknown error occurs while invoking the **zappMerchantApi.invokeApp** function
S9998|An error has occurred while reading the JSON file.<br> Error Type: errTyp . Error Text: errTxt|When **zappMerchantApi.getCfiDetails** function is invoked and an error occurs. 
S9999|An unknown error has occurred|When an unknown error occurs while invoking the **zappMerchantApi.getCfiDetails** function

##### Table 4: 	Web Merchant API SDK – Error Codes
---
## Troubleshooting
This section covers the different troubleshooting scenarios and the behaviour of the Web Merchant API. 
1. For the SDK to work as expected the default browser settings should allow pop ups to open on the mobile device.
2. If merchant is using jquery ajax call to invoke Submit RFP then merchant must wait for the ajax call to complete to invoke the **zappMerchantApi.invokeApp** function of the SDK. Alternatively merchant can use the async: false parameter when making an ajax call. Refer the template file in the SDK for an example.
3. The Web Merchant API SDK opens a new tab to redirect to the universal link provided by the bank. If the bank app is not installed on the consumer’s device then the page displayed on the new opened tab is handled by the bank. 

## Contributing
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License <a name="license"></a>
Copyright 2020 Mastercard

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at:

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
