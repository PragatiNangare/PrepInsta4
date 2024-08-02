
// Variable to store the alarm time
let alarmTime = null;

// Get the audio element
const beepSound = document.getElementById('beepSound');

// Function to update the current time display
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to check if the current time matches the alarm time
function checkAlarm() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    if (currentTime === alarmTime) {
        alert('Alarm ringing!');
        // Clear the alarm time to stop the alert after it has rung
        alarmTime = null;
        document.getElementById('status').textContent = 'No alarm set.';
    }
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Set an interval to check the alarm every second
setInterval(checkAlarm, 1000);

// Handle the form submission to set the alarm
document.getElementById('alarmForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alarmTime = document.getElementById('alarmTime').value;
    document.getElementById('status').textContent = `Alarm set for ${alarmTime}.`;
});
