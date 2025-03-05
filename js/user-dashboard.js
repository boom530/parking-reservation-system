document.addEventListener('DOMContentLoaded', function() {
    // Location filters functionality
    const locationFilters = document.querySelectorAll('.location-filter');
    locationFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            locationFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Here you would typically filter the map markers
            // based on the selected category
            console.log(`Filter selected: ${this.textContent}`);
        });
    });

    // Simulate loading parking map
    setTimeout(function() {
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.innerHTML = '<div id="actual-map">Map loaded successfully</div>';
            
            // This is where you would initialize your actual map
            // For example, Google Maps or Leaflet.js
            initMap();
        }
    }, 1500);

    // Reservation action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('view-btn') ? 'view' :
                          this.classList.contains('edit-btn') ? 'edit' :
                          this.classList.contains('cancel-btn') ? 'cancel' : '';
            
            const reservationCard = this.closest('.reservation-card');
            const locationName = reservationCard.querySelector('h4').textContent;
            
            if (action === 'view') {
                alert(`Viewing details for: ${locationName}`);
            } else if (action === 'edit') {
                alert(`Editing reservation for: ${locationName}`);
            } else if (action === 'cancel') {
                if (confirm(`Are you sure you want to cancel your reservation at ${locationName}?`)) {
                    // Here you would send an API request to cancel the booking
                    reservationCard.style.opacity = '0.5';
                    setTimeout(() => {
                        reservationCard.style.display = 'none';
                    }, 500);
                }
            }
        });
    });

    // New booking button
    const newBookingBtn = document.querySelector('.welcome-actions .action-btn');
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            // Scroll to the booking form
            const bookingForm = document.querySelector('.quick-book');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
                
                // Add a highlight effect to the form
                bookingForm.classList.add('highlight-form');
                setTimeout(() => {
                    bookingForm.classList.remove('highlight-form');
                }, 1500);
            }
        });
    }

    // Form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const location = this.querySelector('select:nth-of-type(1)').value;
            const date = this.querySelector('input[type="date"]').value;
            const duration = this.querySelector('select:nth-of-type(2)').value;
            
            if (!date) {
                alert('Please select a date for your booking.');
                return;
            }
            
            // Here you would send the booking request to your API
            alert(`Booking submitted!\nLocation: ${location}\nDate: ${date}\nDuration: ${duration}`);
            
            // Simulate successful booking
            addNewActivity();
        });
    }

    // Helper function to add a new activity to the list
    function addNewActivity() {
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <div class="activity-details">
                    <h4>Booking Confirmed</h4>
                    <p>Your reservation has been confirmed</p>
                    <small>Today, ${timeString}</small>
                </div>
            `;
            
            // Add new activity at the top
            activityList.insertBefore(newActivity, activityList.firstChild);
            
            // Add animation
            setTimeout(() => {
                newActivity.classList.add('animate-in');
            }, 10);
        }
    }

    // Map initialization function (placeholder)
    function initMap() {
        // This is where you would initialize your map
        console.log('Map initialization would happen here');
        
        // For example, with Google Maps:
        /*
        const map = new google.maps.Map(document.getElementById('actual-map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
        
        // Add markers for parking locations
        const parkingLocations = [
            { lat: -34.397, lng: 150.644, title: 'Parking A' },
            { lat: -34.4, lng: 150.65, title: 'Parking B' }
        ];
        
        parkingLocations.forEach(loc => {
            new google.maps.Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map: map,
                title: loc.title
            });
        });
        */
    }
});

// Add this to your CSS (via JavaScript for animation effects)
document.head.insertAdjacentHTML('beforeend', `
    <style>
    .highlight-form {
        animation: pulse 1.5s;
    }
    
    .activity-item {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
    }
    
    .activity-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(69, 162, 158, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(69, 162, 158, 0); }
        100% { box-shadow: 0 0 0 0 rgba(69, 162, 158, 0); }
    }
    </style>
`);
