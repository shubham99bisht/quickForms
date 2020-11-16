// Firebase Docs: https://firebase.google.com/docs/database/web/read-and-write

// Get a reference to the database service
var database = firebase.database();


// Reads data at a path and listens for changes.
// @param path [String]: takes reference path in Realtime DB
// @param callbackFunction [Function]: function which needs to be invoked with the data
function readOnEvents(path, callbackFunction) {
  var ref = firebase.database().ref(path);
  ref.on('value', function(snapshot) {
    if(callbackFunction instanceof Function) {
        callbackFunction(snapshot.val());
      }
    else {
      defaultCallback(snapshot.val());
    }
  });
};


// Reads the data once and passes it to callbackFunction
// @param path [String]: takes reference path in Realtime DB
// @param callbackFunction [Function]: function which needs to be invoked with the data
function readOnce(path, callbackFunction){
  var ref = firebase.database().ref(path);
  ref.once('value', function(snapshot) {
    if(callbackFunction instanceof Function) {
        callbackFunction(snapshot.val());
      }
    else {
      defaultCallback(snapshot.val());
    }
  });
};


// For basic write operations, we can use set() to save data to a specified reference,
// replacing any existing data at that path.
function writeUserData(path, data) {
  firebase.database().ref(path).push().set(data, function(error) {
    if (error) {
      alert('An Error Occurred, please try again :(');
    } else {
      // Data saved successfully!
      // alert('Thank you for your Response!');
    }
  });
}


function defaultCallback(data) {
    alert("callbackFunction passed wasn't and instanceof Function, falling to defaultCallback");
    console.log(data);
}

// Function to format HTML Strings for custom data
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};
