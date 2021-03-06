/**  Copyright (c) 2020 Mastercard
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 
*/

window.zappMerchantApi = window.zappMerchantApi || {};
const cdnUrl = "https://zts3.co.uk/merchantApiCdnFiles/sbibanks"; // CDN location to fetch the CFI logos

zappMerchantApi.cfiDetail = {}; // Object containing CFI id, name and logo
cfiMetaDataList = {}; // CFI metadata object

/* Function to read JSON file from CDN and store CFI details in zapp objects*/
zappMerchantApi.getCfiDetails = new Promise(function (resolve, reject) {
  fetch(cdnUrl)
    .then(function (response) {
      if (response.status !== 200) {
        postError("MC1001", "Technical error occurred. " + response.status);
        return;
      }
      return response.text();
    })
    .then(function (text) {
      let decodedRes = JSON.parse(atob(text));
      zappMerchantApi.cfiCount = decodedRes.length;
      for (let i = 0; i < zappMerchantApi.cfiCount; i++) {
        cfiJsonObj = {};
        cfiJsonObj.cfiUniqueId = decodedRes[i].cfiUniqueId;
        cfiJsonObj.cfiName = decodedRes[i].cfiName;
        cfiJsonObj.cfiLogo = decodedRes[i].cfiLogo;
        zappMerchantApi.cfiDetail[i] = cfiJsonObj;
        cfiMetaDataList[decodedRes[i].cfiUniqueId] = decodedRes[i];
      }
      resolve(true);
    })
    .catch(function (err) {
      postError("MC1002", " Technical error occurred. " + err);
    });
});

/* Function to invoke the banking app*/
zappMerchantApi.invokeApp = function (cfiId, aptrId, productType) {
  try {
    if (typeof cfiId == "undefined") {
      throw new Error("S1001");
    } else if (typeof aptrId == "undefined") {
      throw new Error("S1002");
    } else if (typeof productType == "undefined") {
      throw new Error("S1003");
    } else if (cfiId == null || cfiId.length == 0) {
      throw new Error("S1004");
    } else if (aptrId == null || aptrId.length == 0) {
      throw new Error("S1005");
    } else if (productType == null || productType.length == 0) {
      throw new Error("S1006");
    } else if (typeof cfiMetaDataList[cfiId] == "undefined") {
      throw new Error("S1007");
    } else {
      let appUrl =
        cfiMetaDataList[cfiId].cfiUniversalLink +
        "?aptrId=" +
        aptrId +
        "&productType=" +
        productType;
      window.open(appUrl, "_blank");
    }
  } catch (e) {
    switch (e.message) {
      case "S1001":
        postError(e.message, "CFI Id is undefined");
        break;
      case "S1002":
        postError(e.message, "AptrId is undefined");
        break;
      case "S1003":
        postError(e.message, "Product Type is undefined");
        break;
      case "S1004":
        postError(e.message, "CFI Id is null or empty");
        break;
      case "S1005":
        postError(e.message, "AptrId is null or empty");
        break;
      case "S1006":
        postError(e.message, "Product Tpye is null or empty");
        break;
      case "S1007":
        postError(e.message, "No data present for CFI Id");
        break;
      default:
        postError("MC1004", "Technical error occurred");
        break;
    }
  }
};

/* Function to post error message */
function postError(eId, eDesc) {
  var timeStamp = new Date();
  var errorData = {
    errorId: eId,
    errorDesc: eDesc,
    errorTimestamp: timeStamp.toUTCString(),
  };

  postData = {
    eventType: "zappMerchantApiError",
    data: errorData,
  };
  console.log(postData.eventType + ": " + JSON.stringify(errorData));
  window.parent.postMessage(postData, "*");
}
