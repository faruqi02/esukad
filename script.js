var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: false, // Disable cursor grabbing
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    allowTouchMove: false, // Disable all touch-based sliding/swiping
});

// Get modal elements
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

// Open the modal
openModal.addEventListener('click', () => {
  modal.style.display = 'flex'; // Flex to center
});

// Close the modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Login form validation
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  // Validate credentials
  if (email === 'manager1@gmail.com' && password === '00000') {
    
    window.location.href = 'registerTeam.html';

  } else if (email === 'admin@gmail.com' && password === '00000'){
    // Redirect to registerTeam.html
    window.location.href = 'dashboard/index.html';
  } else {
    // Show an error message// Redirect to registerTeam.html
    alert('Invalid email or password. Please try again.');
  }
});
