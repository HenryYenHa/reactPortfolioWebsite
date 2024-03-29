import fs from "fs";
const miniDebug = true;
//Manipulate these variables
const projectID = `P01`;
const numOfWP = 6;
const numOfBidsPerWP = 15;

//Extra Options
const supplyPriceMin = 15000;
const supplyPriceMax = 250000;
const installPriceMin = 15000;
const installPriceMax = 250000;
const daysForDeliveryMin = 2;
const daysForDeliveryMax = 8;
const daysForManufacturingMin = 2;
const daysForManufacturingMax = 10;
const daysForInstallMin = 3;
const daysForInstallMax = 15;
const doubleBidChance = 0.1;
const availDatesLeewayMin = 3;
const availDatesLeewayMax = 7;
//Estimate accuracy in %; class 5 accuracy is -20 to +50 ==> 80 to 150
const estimateAccuracyMin = 0.8;
const estimateAccuracyMax = 1.5;
//Number of WPs in each CWP, will generate CWP1 WPs first until depleted before moving to next
const numberOfCWP1WPs = 3;
const numberOfCWP2WPs = 2;
const numberOfCWP3WPs = 1;

//List of generated Constants for ease of project generation
const cwp1InstallDays = randomInteger(15, 30);
const cwp2InstallDays = randomInteger(15, 30);
const cwp1Day = new Date("Jan 1 2024");
const cwp2Day = shiftDateByXDays(cwp1Day, cwp1InstallDays);
const cwp3Day = shiftDateByXDays(cwp2Day, cwp2InstallDays);

//Generate ID of list of WP
const generatedWPList = generateListOfWP(projectID, numOfWP);
let bidReferrenceArray = [];
let wpReferrenceArray = [];
let bidIDRefferenceArray = [];
let refID = 0;

//Mini Debug
function print() {
  if (miniDebug) console.log(...arguments);
}

//Utility function to generate UUIDv4
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//Utility function to generate a random Integer within a range
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Utility function to generate a date object with changes in days
function shiftDateByXDays(givenDate, numberOfDays) {
  const millisecondsPerDay = 86400000;
  return new Date(Date.parse(givenDate) + numberOfDays * millisecondsPerDay);
}

//The primary function
function useThisFunctionToMake1FakeProject() {
  //Note: Projects data have nothing corresponding to the real deal in the database, it is only a list of the options used to generate the fake data
  const fakeProject = {
    id: projectID,
    listofWP: generatedWPList,
    zz01numOfWP: numOfWP,
    zz02numOfBidsPerWP: numOfBidsPerWP,
    zz03supplyPriceMin: supplyPriceMin,
    zz04supplyPrinceMax: supplyPriceMax,
    zz05installPriceMin: installPriceMin,
    zz06installPriceMax: installPriceMax,
    zz07AdaysForDeliveryMin: daysForDeliveryMin,
    zz07BdaysForDeliveryMax: daysForDeliveryMax,
    zz08AdaysForManufacturingMin: daysForManufacturingMin,
    zz08BdaysForManufacturingMax: daysForManufacturingMax,
    zz09daysForInstallMin: daysForInstallMin,
    zz10daysForInstallMax: daysForInstallMax,
    zz11doubleBidChance: doubleBidChance,
    zz12availDatesLeewayMin: availDatesLeewayMin,
    zz13availDatesLeewayMax: availDatesLeewayMax,
    zz14estimateAccuracyMin: estimateAccuracyMin,
    zz15estimateAccuracyMax: estimateAccuracyMax,
    zz16numberOfCWP1WPs: numberOfCWP1WPs,
    zz17numberOfCWP2WPs: numberOfCWP2WPs,
    zz18numberOfCWP3WPs: numberOfCWP3WPs,
    zz19cwp1InstallDays: cwp1InstallDays,
    zz20cwp2InstallDays: cwp2InstallDays,
    zz21cwp1Day: cwp1Day,
    zz22cwp2Day: cwp2Day,
    zz23cwp3Day: cwp3Day,
  };
  //Create list of WP objects
  const generatedWPObjects = generateWPObjects(
    projectID,
    generatedWPList,
    numOfBidsPerWP
  );
  //Manipulate bidReferenceArray to hold Bids
  for (let wpObj of generatedWPObjects) {
    bidReferrenceArray.push(generateAssociatedBids(wpObj));
    bidIDRefferenceArray.push(wpObj.submittedBids);
  }

  const outputData = JSON.stringify(bidReferrenceArray, null, 2);
  const filename = "bidOutputs.json";
  fs.writeFile(filename, outputData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log(`Bid data has been written to ${filename}`);
    }
  });

  print(`BidIDList: ${JSON.stringify(bidIDRefferenceArray)}`);
  // print(`Project: ${JSON.stringify(fakeProject)}`);

  const outputData2 = JSON.stringify(bidReferrenceArray, null, 2);
  const filename2 = "workpackageOutput.json";
  fs.writeFile(filename2, outputData2, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log(`Workpackage data has been written to ${filename2}`);
    }
  });

  let outputData3 = JSON.stringify(fakeProject, null, 2);
  outputData3 = ",".concat(outputData3);
  const filename3 = "loggedFakeProjects.json";
  fs.appendFile(filename3, outputData3, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log(`Project data has been written to ${filename3}`);
    }
  });
}

//Subfunction to generate List of WP
function generateListOfWP(pID, numberOfWPs) {
  let returnArray = [];
  for (let i = 0; i < numberOfWPs; i++) {
    let printI = String(i);
    printI = printI.padStart(2, "0");
    returnArray.push(`${pID}-WP${printI}`);
  }
  return returnArray;
}

//Subfunction to Generate WP of Objects
function generateWPObjects(pID, genWPList, numberOfBids) {
  print("genWPLIST", genWPList);
  //Local reference to check how many WPs for each CWPs to make
  let wpCountPerCWP = [numberOfCWP1WPs, numberOfCWP2WPs, numberOfCWP3WPs];

  let returnArray = [];
  //Check which CWP the WP belongs to
  for (let wpID of genWPList) {
    let cwpID = 0;
    let cwpAntiDate = new Date(0);
    //Make WPs corresponding to CWPs;
    if (wpCountPerCWP[0] > 0) {
      wpCountPerCWP[0]--;
      cwpID = 1;
      //Randomize Date by about install date
      cwpAntiDate = shiftDateByXDays(
        cwp1Day,
        randomInteger(0, daysForInstallMax)
      );
    } else if (wpCountPerCWP[1] > 0) {
      wpCountPerCWP[1]--;
      cwpID = 2;
      cwpAntiDate = shiftDateByXDays(
        cwp2Day,
        randomInteger(0, daysForInstallMax)
      );
    } else if (wpCountPerCWP[2] > 0) {
      wpCountPerCWP[2]--;
      cwpID = 3;
      cwpAntiDate = shiftDateByXDays(
        cwp3Day,
        randomInteger(0, daysForInstallMax)
      );
    } else {
      console.log("ERROR: NOT ENOUGH CWP-WP ASSIGNED");
      if (miniDebug) break;
    }
    let generatedListOfBids = generateListOfBids(wpID, numberOfBids); //Calculate install date as the date afterwards
    let cwpAntiDate2 = shiftDateByXDays(cwpAntiDate, 1);

    //CWP does not exist (yet); it's also basically the Uniformat code
    returnArray.push({
      id: `${wpID}`,
      projectID: pID,
      cwp99: cwpID,
      anticipatedDateForDelivery99: cwpAntiDate,
      anticipatedDateToCommenceInstall99: cwpAntiDate2,
      submittedBids: generatedListOfBids,
    });
  }
  return returnArray;
}

//SubSubfunction that generates a list of IDs
function generateListOfBids(wpID, numOfBids) {
  let returnArray = [];
  for (let i = 0; i < numOfBids; i++) {
    let printI = String(i);
    printI = printI.padStart(3, "0");
    returnArray.push(`${wpID}-B${printI}`);
  }
  return returnArray;
}

//Subfunction that generates bids given an WP Object
function generateAssociatedBids(wpObj) {
  let returnArray = [];
  // Bools to ensure they return at least one bid with either value
  let hasSupply = false;
  let hasInstall = false;

  for (let bidID of wpObj.submittedBids) {
    refID++; //99
    let supplyVal = false;
    let installVal = false;
    // If they only have 1 submittedBid generate a double bid otherwise make sure it has at least 1 bid of each type
    if (wpObj.submittedBids.length == 1) {
      supplyVal = true;
      installVal = true;
    } else if (hasSupply == false) {
      hasSupply = true;
      supplyVal = true;
      installVal = Math.random() < doubleBidChance ? true : false;
    } else if (hasInstall == false) {
      hasInstall = true;
      installVal = true;
      supplyVal = Math.random() < doubleBidChance ? true : false;
    } else {
      const randomVal = Math.random();
      const x = 0.5 + doubleBidChance / 2;
      const y = 0.5 - doubleBidChance / 2;
      if (randomVal < x && randomVal >= y) {
        supplyVal = true;
        installVal = true;
      } else if (randomVal >= x) {
        supplyVal = true;
        installVal = false;
      } else if (randomVal < y) {
        supplyVal = false;
        installVal = true;
      } else {
        console.log("ERROR: Invalid bid. DoubleBidChance");
        if (miniDebug) break;
      }
    }
    // Calculate dates and prices
    let checklist = generateBidDateInfo(supplyVal, installVal, wpObj);
    returnArray.push({
      id: bidID,
      workPackage: wpObj.id,
      installPrice: randomInteger(installPriceMin, installPriceMax),
      supplyPrice: randomInteger(supplyPriceMin, supplyPriceMax),
      isEstimate: Math.random() < 0.5 ? true : false,
      estimateAccuracy:
        randomInteger(estimateAccuracyMin, estimateAccuracyMax) / 100 + 1,
      submittedBy: uuidv4(),
      isSupply: supplyVal,
      isInstall: installVal,
      supplyPrice99: checklist.supPrice,
      installPrice99: checklist.instPrice,
      daysForFabrication: checklist.fabDay,
      daysForDelivery: checklist.delDay,
      daysForInstall: checklist.instDay,
      availableDates9: [checklist.availDateMin, checklist.availDateMax],
      availStart99: checklist.availDateMin,
      availEnd99: checklist.availDateMax,
      sumID99: refID,
    });
  }
  return returnArray;
}

//Subsubfunction to generate bid date info to be plugged into bids; returns object with information
function generateBidDateInfo(supply, install, wpObj) {
  let returnObj = {};
  if (supply) {
    returnObj.supPrice = randomInteger(supplyPriceMin, supplyPriceMax);
    const fabDay = randomInteger(
      daysForManufacturingMin,
      daysForManufacturingMax
    );
    returnObj.fabDay = fabDay;
    const delDay = randomInteger(daysForDeliveryMin, daysForDeliveryMax);
    returnObj.delDay = delDay;
    const supDays = fabDay + delDay;
    returnObj.availDateMin = shiftDateByXDays(
      wpObj.anticipatedDateForDelivery99,
      -(supDays + randomInteger(availDatesLeewayMin, availDatesLeewayMax))
    );
    returnObj.availDateMax = shiftDateByXDays(
      wpObj.anticipatedDateForDelivery99,
      randomInteger(availDatesLeewayMin, availDatesLeewayMax)
    );
  }
  if (install) {
    const instDays = randomInteger(daysForInstallMin, daysForInstallMax);
    returnObj.instPrice = randomInteger(installPriceMin, installPriceMax);
    returnObj.instDay = instDays;
    //If it is a double bid, fix the end date
    returnObj.availDateMax = shiftDateByXDays(
      wpObj.anticipatedDateToCommenceInstall99,
      randomInteger(availDatesLeewayMin, availDatesLeewayMax) + instDays
    );
    // If it is not a double bid, fix the start date
    if (!supply) {
      returnObj.availDateMin = shiftDateByXDays(
        wpObj.anticipatedDateToCommenceInstall99,
        -randomInteger(availDatesLeewayMin, availDatesLeewayMax)
      );
    }
  }
  return returnObj;
}

useThisFunctionToMake1FakeProject();

// //Upgrades to consider:
// - blackout dates
// - workdays
// - spotted Available Dates instead of 1 solid Range
// - finished WPs

// //Note that the following are modified:
// - availDates are all modified

// //Data has built-in limited considerations for:
// - over-run days
// - has supply and install already
// - bids that don't honor anticipatedDates (DONT EXIST?)
// - supplies that tries to finish early (DONT EXIST?)
// - installs that try to start late (DONT EXIST?)
// - WPs without sufficient bids
