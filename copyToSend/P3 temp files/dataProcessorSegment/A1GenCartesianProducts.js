import fs from "fs";
import firebase from "../dataGeneratorSegment/databaseConnectionFiles/Firebase.js";
const firestore = firebase.firestore();
import { demoListOfBids } from "./retrievedData/listOfBids.js";

// Global Variables of File
const miniDebug = true;
let listOfBids = demoListOfBids;

//Mini Debug
function print() {
  if (miniDebug) console.log(...arguments);
}

//Temporary grab of values

//Grab collection WORKINPROGRESS
// async function grabCollection(collect, id) {
//   const theDocument = await firestore.collection(collect).doc(id).get();
//   if (!theDocument.exists) {
//     console.error(
//       `Error: No such document with id ${id} exists in ${collect} collection.`
//     );
//   } else {
//     print("Document data: " + theDocument);
//     return theDocument;
//   }
// }

//Generate Cartesian Products of an array
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

//Generated Modified Bid for each WP to feed into the algorithm
function generateModifiedBid(arrayOfBids) {
  let returnArray = [];
  let tempDoubleArray = [];
  let tempSupplyArray = [];
  let tempInstallArray = [];
  //First look through arrayOfBids
  for (let bid of arrayOfBids) {
    if (bid.isSupply && bid.isInstall) {
      tempDoubleArray.push(bid);
    } else if (bid.isSupply) {
      tempSupplyArray.push(bid);
    } else if (bid.isInstall) {
      tempInstallArray.push(bid);
    } else {
      console.log("ERROR: Invalid bid! Neither Supply nor Install!");
      console.log("Problem Bid: ", bid.id);
      console.log("LOG: ", bid);
    }
  }

  //Compile half bids into doubleBids
  for (let bid of tempInstallArray) {
    for (let bid2 of tempSupplyArray) {
      returnArray.push({
        id: bid.id + bid2.id,
        //Original Data
        daysForDelivery: bid2.daysForDelivery,
        daysForFabrication: bid2.daysForFabrication,
        daysForInstall: bid.daysForInstall,
        installPriceSIMPLIFIED: bid.installPriceSIMPLIFIED,
        supplyPriceSIMPLIFIED: bid2.supplyPriceSIMPLIFIED,
        workPackage: bid.workPackage,
        //Install Data
        installID: bid.id,
        installEstimateAccuracy: bid.estimateAccuracy,
        installIsEstimate: bid.isEstimate,
        installSubmittedBy: bid.submittedBy,
        //Supply Data
        supplyID: bid2.id,
        supplyEstimateAccuracy: bid2.estimateAccuracy,
        supplyIsEstimate: bid2.isEstimate,
        supplySubmittedBy: bid2.submittedBy,
      });
    }
  }

  //Modified Double Bids
  for (let bid of tempDoubleArray) {
    let pushBid = JSON.stringify(String(bid));
    pushBid.installID = bid.id;
    pushBid.installEstimateAccuracy = bid.estimateAccuracy;
    pushBid.installIsEstimate = bid.isEstimate;
    pushBid.installSubmittedBy = bid.submittedBy;
    pushBid.supplyID = bid.id;
    pushBid.supplyEstimateAccuracy = bid.estimateAccuracy;
    pushBid.supplyIsEstimate = bid.isEstimate;
    pushBid.supplySubmittedBy = bid.submittedBy;
    returnArray.push(pushBid);
  }
  return returnArray;
}

let a1ProcessedBidArray = generateModifiedBid(listOfBids);

export { a1ProcessedBidArray };
//Upgrades required: estimate accuracy is currently using the install's accuracy over the supply's for combo-bids
