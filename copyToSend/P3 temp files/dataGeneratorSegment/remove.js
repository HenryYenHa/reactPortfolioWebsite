// imports
import firebase from "./databaseConnectionFiles/Firebase.js";

const firestore = firebase.firestore();

const commandLineInput = process.argv.slice(2);

console.log("REMOVING PROJECT: ", commandLineInput);

//Kill a document
async function killDocument(projectID) {
  // const res = await db.collection('cities').doc('DC').delete();
  var kill_queryProjects = firestore
    .collection("generatedProjects")
    .where("id", "==", projectID);
  kill_queryProjects.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });
}

killDocument(commandLineInput);
