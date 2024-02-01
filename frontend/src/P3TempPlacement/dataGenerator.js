//The primary function
function useThisFunctionToMake1FakeProject(projID, numOfWP, numOfBidsPerWP) {
  //Generate ID of list of WP
  let listofWP = generateListofWPs(numOfWP);

  //Note: Projects are not suppose to have an array of WP, but we are putting one in anyways
  let fakeProject = {
    id: `P-${projID}`,
    listofWP: generatedListOfWP,
  };
}

// Generate bids
let bids = [];

// Iterate over workPackage values from "wp-301" to "wp-320"
for (let i = 301; i <= 320; i++) {
  let workPackage = `wp-${i}`;

  // Generate at least one bid with isSupply as true and at least one bid with isInstall as true
  for (let j = 0; j < 3; j++) {
    // Generate bid with isSupply as true
    let bidSupply = {
      bidSubmissionId: uuidv4(),
      id: uuidv4(),
      workPackage: workPackage,
      isEstimate: Math.random() < 0.5 ? true : false,
      estimateAccuracy: Math.random(),
      bidPrices: randomFloat(5000, 50000),
      submittedBy: uuidv4(),
      isSupply: true,
      isInstall: Math.random() < 0.5 ? true : false,
      elementGroupingPrice: randomFloat(5000, 50000),
      shippingFeeTotal: randomFloat(0, 10000),
      supplyFeeTotal: randomFloat(0, 10000),
      installFeeTotal: randomFloat(0, 10000),
      daysForFabrication: Math.floor(Math.random() * 20) + 1,
      daysForDelivery: Math.floor(Math.random() * 20) + 1,
      daysForInstall: Math.floor(Math.random() * 20) + 1,
    };
    bids.push(bidSupply);

    // Generate bid with isInstall as true
    let bidInstall = {
      bidSubmissionId: uuidv4(),
      id: uuidv4(),
      workPackage: workPackage,
      isEstimate: Math.random() < 0.5 ? true : false,
      estimateAccuracy: Math.random(),
      bidPrices: randomFloat(5000, 50000),
      submittedBy: uuidv4(),
      isSupply: Math.random() < 0.5 ? true : false,
      isInstall: true,
      elementGroupingPrice: randomFloat(5000, 50000),
      shippingFeeTotal: randomFloat(0, 10000),
      supplyFeeTotal: randomFloat(0, 10000),
      installFeeTotal: randomFloat(0, 10000),
      daysForFabrication: Math.floor(Math.random() * 20) + 1,
      daysForDelivery: Math.floor(Math.random() * 20) + 1,
      daysForInstall: Math.floor(Math.random() * 20) + 1,
    };
    bids.push(bidInstall);
  }
}

// Print the generated bids
// bids.forEach((bid) => console.log(bid));

// Function to generate UUIDv4
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// Function to generate a random float within a range
function randomFloat(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
