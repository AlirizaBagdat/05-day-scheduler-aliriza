// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
 


  var today = dayjs();
  $('#currentDay').text(today.format('dddd DD MMM, YYYY'));
  var currentHour = dayjs().hour();
  
  console.log(currentHour)

  startTime = 9; //9AM START
  endTime = 17; //5PM END
  
  var dayScheduler = document.getElementById('day-scheduler');
   
  // Create hour blocks matching day
  for (var hour = startTime; hour <= endTime; hour++) {
    var hourBlock = document.createElement('div');
    hourBlock.id = `hour-${hour}`;
    console.log(hourBlock.id)
    hourBlock.className = `row time-block ${hour < currentHour ? 'past' : (hour === currentHour ? 'present' : 'future')}`;
      
  
    hourBlock.innerHTML = `
      <div class="col-2 col-md-1 hour text-center py-3">${hour % 12 === 0 ? '12' : hour % 12}${hour < 12 ? 'AM' : 'PM'}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    `;
    dayScheduler.appendChild(hourBlock);
  }
  

   
  dayScheduler.addEventListener('click', function (event) {
      if (event.target.classList.contains('saveBtn')) {
      var textarea = event.target.parentElement.querySelector('.description');
      var text = textarea.value;

    // Get the ID of the time block 
      var timeBlockId = textarea.parentElement.id;

    // Create an object to store the text
      var eventObject = {
        text: text
      };
    // Convert the object to a JSON string
      var jsonEvent = JSON.stringify(eventObject);
    // Store the JSON string in local storage 
      localStorage.setItem(timeBlockId, jsonEvent);
  }
});

  // Function to load saved events from local storage 
function loadEventsFromLocalStorage() {
  var timeBlocks = document.querySelectorAll('.time-block');
  
  timeBlocks.forEach(function(block) {
    var timeBlockId = block.id;
    var savedEventData = localStorage.getItem(timeBlockId);
    
    if (savedEventData) {
      var eventObject = JSON.parse(savedEventData);
      var textarea = block.querySelector('.description');
      textarea.value = eventObject.text;
    }
  });
}

// Call the function to load saved events when the page loads
loadEventsFromLocalStorage();

// Rest of your existing code...


  
});


