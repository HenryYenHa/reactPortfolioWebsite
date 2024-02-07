import firebase from "./Firebase.js";

const firestore = firebase.firestore();

const col = "testGeneratedData";
const debug = true;

function miniDebug(words) {
  if (debug) {
    console.log(words);
  }
}

//Post function of document (Will replace if ID is identical)
async function postDocument(collect, document) {
  const collection = firestore.collection(collect);
  const docID = String(document.id);
  let collectionCheck;
  await collection
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      collectionCheck = data;
    })
    .catch((error) => {
      console.error(error);
    });
  //Checks if the collection specified exists
  if (!collectionCheck) {
    console.error(`Error: Collection "${collection}" is missing.`);
  } //Checks if document has ID
  else if (!docID) {
    console.error("Error: Document attempting to be posted lacks id.");
    miniDebug("Document: ", document);
  } //Post document if it passes
  else {
    await collection.doc(docID).set(document);
    miniDebug(`Document sent to ${collect} collection`);
  }
}

//Function that will attempt to create a new document; will not over-write existing documents
async function newDocument(collect, document) {
  const alreadyExists = await readDocument(collect, document.id);
  // Check if existing document exists
  if (!alreadyExists.exists) {
    miniDebug(`Posted new document ${document.id} in ${collect} collection.`);
    postDocument(collect, document);
  } else {
    console.error(
      `Error: Document ID ${document.id} in collection ${collect} already exists.`
    );
  }
}

//Function to read document
async function readDocument(collect, id) {
  const theDocument = await firestore.collection(collect).doc(id).get();
  if (!theDocument.exists) {
    console.error(
      `Error: No such document with id ${id} exists in ${collect} collection.`
    );
  } else {
    miniDebug("Document data: " + theDocument);
    return theDocument;
  }
}

//Function to update a document
async function updateDocument(collect, document) {
  const alreadyExists = await readDocument(collect, document.id);
  // Check if existing document exists
  if (!alreadyExists.exists) {
    console.error(
      `Error: Document ID ${document.id} in collection ${collect} does not exist.`
    );
  } else {
    miniDebug(`Updated document ${document.id} in ${collect} collection.`);
    postDocument(collect, document);
  }
}

// updateDocument(col, { id: "9979", cow: "yet" });

// module.exports = { updateDocument, readDocument, newDocument, postDocument };

export { updateDocument, readDocument, newDocument, postDocument };
