// Updates the reviews in HTML
function updateReviews(Reviews){
  // Clears the review section
  document.getElementById('reviews').innerHTML = '';
  // Add your custom HTML for review section here
  var reviewBody = `<div class='media d-block d-sm-flex review'>
      <div class='media-body'>
        <h6 class='mt-2 mb-1'>{} &nbsp; <small class='text-muted'>{}</small></h6>
        <div class='mb-2' id='{}'>
          <!-- Rating comes here -->
        </div>
        <p class='text-muted text-sm'>{}</p>
      </div>
    </div>
    <hr>`
  var star = "<i class='fa fa-xs fa-star text-primary'></i>";
  var nostar = "<i class='fa fa-xs fa-star text-text-gray-200'></i>";

  for(var id in Reviews){
    var data = Reviews[id];
    var newReview = reviewBody.format(data['name'], data['date'], id, data['msg']);
    // New review on Top of the list
    document.getElementById('reviews').innerHTML = newReview + document.getElementById('reviews').innerHTML;
    // Uncomment following for New review to append at the Bottom of the list
    // document.getElementById('reviews').innerHTML += newReview;

    // Adding Stars based on rating count.
    var rating = Number(data['rating']);
    var newRating = '';
    for(var i=0; i<5; i++) {
      if(rating > 0) {
        newRating += star;
        rating -= 1;
      }
      else {
        newRating += nostar;
      }
    }
    document.getElementById(id).innerHTML = newRating;
  }
}

// Updates the contact data in HTML
function updateContactResponses(Responses){
  // Clears the table to load entries again
  document.getElementById('tableBody').innerHTML = '';
  // Add your custom HTML for review section here
  var reviewBody = `<tr>
              <th scope='row'>{}</th>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>`

    var count = 0;
    for(var id in Responses){
      count += 1;
      var data = Responses[id];
      var newReview = reviewBody.format(count, data['name'], data['contact'], data['email'], data['msg'], data['date']);
      // New review on Top of the list
      document.getElementById('tableBody').innerHTML += newReview;
    }
}

// Function to listen at path and call the callbackFunction on changes
readOnEvents('Reviews/', updateReviews);
readOnEvents('contactResponses/', updateContactResponses);


// Function to submit Review form contents to Firebase
function addNewReview(formID){
  var form = document.forms[formID]
  var formData = new FormData(form);

  // Customize this based on your form fields
  var data = {
    name: formData.get('name'),
    email: formData.get('email'),
    rating: formData.get('rating'),
    msg: formData.get('review'),
    date: getCurrentDate()
  }
  writeUserData('Reviews/', data);
  document.getElementById(formID).reset();
}


// Function to submit Review form contents to Firebase
function addContactData(formID){
  var form = document.forms[formID]
  var formData = new FormData(form);

  // Customize this based on your form fields
  var data = {
    name: formData.get('name'),
    email: formData.get('email'),
    contact: formData.get('contact'),
    msg: formData.get('message'),
    date: getCurrentDate()
  }
  writeUserData('contactResponses/', data);
  document.getElementById(formID).reset();
  alert('Your data has been stored successfully!');
}


// Return current date in MON DD, YYYY format eg. Nov 16, 2020
function getCurrentDate() {
  var date = (new Date()).toString().split(' ');  // ['Mon', 'Nov', '16', '2020', '18:29:01', 'GMT+0530', '(India', 'Standard', 'Time)']
  date = date[1] + ' ' + date[2] + ', ' + date[3]; // Nov 16, 2020
  return date;
}
