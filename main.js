// Updates the reviews in HTML
function updateReviews(Reviews){
  // Clears the review section
  document.getElementById('reviews').innerHTML = '';
  // Add your custom HTML for review section here
  var reviewBody = `<div class='media d-block d-sm-flex review'>
      <div class='media-body'>
        <h6 class='mt-2 mb-1'>{}</h6>
        <div class='mb-2'>
          <i class='fa fa-xs fa-star text-primary'></i>
          <i class='fa fa-xs fa-star text-primary'></i>
          <i class='fa fa-xs fa-star text-primary'></i>
          <i class='fa fa-xs fa-star text-primary'></i>
          <i class='fa fa-xs fa-star text-primary'></i>
        </div>
        <p class='text-muted text-sm'>{}</p>
      </div>
    </div>
    <hr>`

    for(var id in Reviews){
      var data = Reviews[id];
      var newReview = reviewBody.format(data["name"], data["msg"]);
      // New review on Top of the list
      document.getElementById('reviews').innerHTML = newReview + document.getElementById('reviews').innerHTML;
      // Uncomment following for New review to append at the Bottom of the list
      // document.getElementById('reviews').innerHTML += newReview;
    }
}

// Function to listen at path and call the callbackFunction on changes
readOnEvents('Reviews/', updateReviews);


// Function to submit Review form contents to Firebase
function addNewReview(formID){
  var form = document.forms[formID]
  var formData = new FormData(form);

  // Customize this based on your form fields
  var data = {
    name: formData.get('name'),
    email: formData.get('email'),
    rating: formData.get('rating'),
    msg: formData.get('review')
  }
  writeUserData('Reviews/', data);
  document.getElementById(formID).reset();
}
