const firebaseConfig = {
  apiKey: "AIzaSyDPKoD9V-f8PBnJBgt1shDnBbwg7wU_Mgc",
  authDomain: "travel-more-befb8.firebaseapp.com",
  databaseURL: "https://travel-more-befb8-default-rtdb.firebaseio.com",
  projectId: "travel-more-befb8",
  storageBucket: "travel-more-befb8.appspot.com",
  messagingSenderId: "846086815128",
  appId: "1:846086815128:web:9df4996094d68637f3ffed",
  measurementId: "G-P5YZN4R58V"
};


firebase.initializeApp(firebaseConfig);

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase
    .database()
    .ref(REF + randomID())
    .set(data);
}

function getArrayFromFirebase(REF) {
  let tempArray = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        tempArray.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return tempArray;
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(`${REF}`).remove();
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function getElementFromFirebaseByID(REF, id) {
  const tempArray = getArrayFromFirebase(REF);
  let temp = {};
  tempArray.forEach((element) => {
    if (element.userid === id) {
      temp = element;
    }
  });
  console.log(temp);
  return temp;
}

function changeDataOnFirebaseByID(REF, ID, data) {
  firebase
    .database()
    .ref(REF + "/" + ID)
    .set(data);
}
