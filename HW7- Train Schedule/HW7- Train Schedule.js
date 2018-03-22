// Initialize Firebase
var config = {
    apiKey: "AIzaSyAfdvQVLnrYZA_W_SnPPK9QKrRUWc-29eg",
    authDomain: "train-schedule-2627b.firebaseapp.com",
    databaseURL: "https://train-schedule-2627b.firebaseio.com",
    projectId: "train-schedule-2627b",
    storageBucket: "",
    messagingSenderId: "847060709513"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var trainNext = moment($("#first-train-input").val().trim(), "HH:mm").format('HH:mm');

    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency,
        trainNext: trainNext
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainFrequency);
    console.log(newTrain.trainNext);
  
    // Alert
    alert("Train added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var trainFrequency = childSnapshot.val().trainFrequency;
    var trainNext = childSnapshot.val().trainNext;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainNext);

    //Next train formatting ?????????????????

    // var trainNextFormat = moment(trainNext).format("HH:mm")
    // var trainNextFormat = moment(trainNext).format("LT")

    var firstTimeConverted = moment(trainNext,"HH:mm")
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
//var trainMinAway = moment().toNow(trainNext - trainFrequency)

    console.log(tMinutesTillTrain);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency +  "</td><td>" + trainNext + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });
  
 
  