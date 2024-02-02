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
const daysForSuppliesMin = 3;
const daysForSuppliesMax = 15;
const daysForInstallMin = 3;
const daysForInstallMax = 15;
//Number of WPs in each CWP, will generate CWP1 WPs first until depleted before moving to next
const numberOfCWP1WPs = 3;
const numberOfCWP2WPs = 2;
const numberOfCWP3WPs = 1;

//List of generated Constants for ease of project generation
const millisecondsPerDay = 86400000;
const cwp1InstallDays = randomInteger(15, 40);
const cwp2InstallDays = randomInteger(15, 40);
const cwp1Day = new Date("Jan 1 2024");
const cwp2Day = new Date(
  Date.parse(cwp1Day) + cwp1InstallDays * millisecondsPerDay
);
const cwp3Day = new Date(
  Date.parse(cwp2Day) + cwp2InstallDays * millisecondsPerDay
);

//Generate ID of list of WP
const generatedWPList = generateListOfWP(projectID, numOfWP);
let bidReferrenceArray = [];

//Mini Debug
function print() {
  if (miniDebug) console.log(...arguments);
}

// Function to generate UUIDv4
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to generate a random Integer within a range
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//The primary function
function useThisFunctionToMake1FakeProject() {
  //Note: Projects are not suppose to have an array of WP, but we are putting one in anyways
  const fakeProject = {
    id: projectID,
    listofWP: generatedWPList,
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
  }

  print(
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWorkPackage"
  );
  print(JSON.stringify(generatedWPObjects));

  print(
    "***************************************************************************"
  );
  print();
  print(
    "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPProject"
  );
  // print(`Project: ${JSON.stringify(fakeProject)}`);
}

//Subfunction to generate List of WP
function generateListOfWP(pID, numberOfWPs) {
  let returnArray = [];
  for (let i = 0; i < numberOfWPs; i++) {
    returnArray.push(`${pID}-WP${i}`);
  }
  return returnArray;
}

//Subfunction to Generate WP of Objects
function generateWPObjects(pID, genWPList, numberOfBids) {
  print("genWPLIST", genWPList);
  //Local reference to check how many WPs for each CWPs to make
  let wpCountPerCWP = [numberOfCWP1WPs, numberOfCWP2WPs, numberOfCWP3WPs];

  let returnArray = [];
  //Check which
  for (let wpID of genWPList) {
    let cwpID = 0;
    let cwpAntiDate = new Date(0);
    //Make WPs corresponding to CWPs;
    if (wpCountPerCWP[0] > 0) {
      wpCountPerCWP[0]--;
      cwpID = 1;
      cwpAntiDate = new Date(
        //Randomize Date by about install date
        Date.parse(cwp1Day) +
          randomInteger(0, daysForInstallMax) * millisecondsPerDay
      );
    } else if (wpCountPerCWP[1] > 0) {
      wpCountPerCWP[1]--;
      cwpID = 2;
      cwpAntiDate = new Date(
        Date.parse(cwp2Day) +
          randomInteger(0, daysForInstallMax) * millisecondsPerDay
      );
    } else if (wpCountPerCWP[2] > 0) {
      wpCountPerCWP[2]--;
      cwpID = 3;
      cwpAntiDate = new Date(
        //Randomize Date by about install date
        Date.parse(cwp3Day) +
          randomInteger(0, daysForInstallMax) * millisecondsPerDay
      );
    } else {
      console.log("ERROR: NOT ENOUGH CWP-WP ASSIGNED");
      if (miniDebug) break;
    }
    let generatedListOfBids = generateListOfBids(wpID, numberOfBids); //Calculate install date as the date afterwards
    let cwpAntiDate2 = new Date(Date.parse(cwpAntiDate) + millisecondsPerDay);

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
    returnArray.push(`${wpID}-B${i}`);
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
    let supplyVal = false;
    let installVal = false;
    // If they only have 1 submittedBid generate a double bid otherwise make sure it has at least 1 bid of each type; 10% chance to generate a double bid
    if (wpObj.submittedBids.length == 1) {
      supplyVal = true;
      installVal = true;
    } else if (hasSupply == false) {
      hasSupply = true;
      supplyVal = true;
      installVal = Math.random() < 0.1 ? true : false;
    } else if (hasInstall == false) {
      hasInstall = true;
      installVal = true;
      supplyVal = Math.random() < 0.1 ? true : false;
    } else {
      const randomVal = Math.random();
      if (randomVal > 0.55) {
        supplyVal = true;
        installVal = false;
      } else if (randomVal < 0.45) {
        supplyVal = false;
        installVal = true;
      } else {
        supplyVal = true;
        installVal = true;
      }
    }
    returnArray.push({
      id: bidID,
      workPackage: wpObj.id,
      isEstimate: Math.random() < 0.5 ? true : false,
      estimateAccuracy: randomInteger(-20, 50) / 100 + 1,
      submittedBy: uuidv4(),
      isSupply: supplyVal,
      isInstall: installVal,
      supplyPrice99: randomInteger(supplyPriceMin, supplyPriceMax),
      installPrice99: randomInteger(installPriceMin, installPriceMax),
      daysForDelivery9: randomInteger(daysForSuppliesMin, daysForSuppliesMax),
      daysForInstall: randomInteger(daysForInstallMin, daysForInstallMax),
      availableDates9: [(supplyVal == true ? wpObj.a)],
    });
  }//TODO IS ON THE AVAILABLE DATE9
  print(returnArray);
  return returnArray;
}

useThisFunctionToMake1FakeProject();

// print("cwp1Day", cwp1Day);
// print("cwp2Day", cwp2Day);
// print("cwp1InstallDays", cwp1InstallDays);
// print("random", uuidv4());
