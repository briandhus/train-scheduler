var config = {
    apiKey: "AIzaSyBpBJkQgYTOKkbglkvSNURvg63ccNB0_6k",
    authDomain: "train-scheduler-93c58.firebaseapp.com",
    databaseURL: "https://train-scheduler-93c58.firebaseio.com",
    projectId: "train-scheduler-93c58",
    storageBucket: "train-scheduler-93c58.appspot.com",
    messagingSenderId: "1021068320957"
  };

    firebase.initializeApp(config);

    // variable to link to database
    var database = firebase.database();

    // global variables
    var name = "";
    var destination = "";
    var firstTrain = "";
    var rate = "";

    // on click function
    $('#submit').on('click', function(event){

    	event.preventDefault;

    	// get inputs
  		name = $('#name').val();
  		destination = $('#destination').val();
  		firstTrain = $('#firstTrain').val();
  		rate = $('#rate').val();

  		// push variables to firebase
  		database.ref().push({
  			name: name,
  			destination: destination,
  			firstTrain: firstTrain,
  			rate: rate
  		});

      

    })

    // pull back down from firebase
    database.ref().on('child_added', function(snapshot) {
      
      // variables to hold the values form the variables sent up to firebase
      // retrieve through snapshot
      var entryName = snapshot.val().name;
      var entryDestination = snapshot.val().destination;
      var entryRate = Number(snapshot.val().rate);

      var tableRow = $('<tr>').append($('<td>').text(entryName)).append($('<td>').text(entryDestination)).append($('<td>').text(entryRate)).append($('<td>').text(firstTrain));

      $('#entries').append(tableRow);

      // break down down time into minutes and hours
      var timeValues = snapshot.val().firstTrain.split(':');

      var firstHours = timeValues[0];
      var firstMinutes = timeValues[1];

      // change hours to minutes
      var firstDeparture = (firstHours * 60) + firstMinutes;

      //variable for current hour 
      var currentHour = moment().format('H');
      console.log(currentHour);
      //variable for current minute
      var currentMinute = moment().format('mm');
      //convert hours to minutes
      var current = (currentHour * 60) + currentMinute;
      //difference between time now and time of first departure
      var difference = current - firstDeparture;
      //how many trains have left since first departure?
      var numberOfTrains = difference % entryRate;
      //
      var minutesAway = entryRate - numberOfTrains;
      //convert minutes back to hours and minutes
      var arrivalTime = moment().add(minutesAway,'minutes').format('HH:mm');

      tableRow.append('<td>' + arrivalTime + '<td>');
      tableRow.append('<td>' + minutesAway + '<td>');

    });









