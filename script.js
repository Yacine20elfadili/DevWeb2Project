/**
 * Student Card Generator
 * Main JavaScript file to handle UI interactions and card generation
 * @author Mohamed Yacine Elfadili
 */

// DOM Elements
const startBtn = document.getElementById('startBtn');
const startBtnAbout = document.getElementById('startBtnAbout');
const backButton = document.getElementById('backButton');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const formSection = document.getElementById('formSection');
const welcomeSection = document.getElementById('welcome');
const cardContainer = document.getElementById('cardContainer');
const editCardBtn = document.getElementById('editCardBtn');
const downloadBtn = document.getElementById('downloadBtn');
const studentCardForm = document.getElementById('studentCardForm');
const fieldSelect = document.getElementById('field');
const otherField = document.getElementById('otherField');
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');
const loadingOverlay = document.getElementById('loadingOverlay');

// Form Fields
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const cinInput = document.getElementById('cin');
const massarInput = document.getElementById('massar');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Card Fields
const cardFirstName = document.getElementById('cardFirstName');
const cardLastName = document.getElementById('cardLastName');
const cardField = document.getElementById('cardField');
const cardCIN = document.getElementById('cardCIN');
const cardMassar = document.getElementById('cardMassar');
const cardEmail = document.getElementById('cardEmail');
const cardPhone = document.getElementById('cardPhone');
const cardPhoto = document.getElementById('cardPhoto');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme + '-mode';
  darkModeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
  
  // Animate sections on page load
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Set up event listeners
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Navigation menu toggle
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  // Dark mode toggle
  darkModeToggle.addEventListener('click', toggleDarkMode);
  
  // Start buttons
  startBtn.addEventListener('click', showFormSection);
  startBtnAbout.addEventListener('click', showFormSection);
  
  // Back button
  backButton.addEventListener('click', goBack);
  
  // Form field for "Other" option
  fieldSelect.addEventListener('change', handleFieldChange);
  
  // Photo upload
  photoInput.addEventListener('change', handlePhotoUpload);
  
  // Form submission
  studentCardForm.addEventListener('submit', handleFormSubmit);
  
  // Edit card button
  editCardBtn.addEventListener('click', editCard);
  
  // Download button
  downloadBtn.addEventListener('click', downloadCard);
  
  // Navigation links
  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMobileMenu();
      }
    });
  });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

// Toggle Dark Mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  document.body.className = isDarkMode ? 'light-mode' : 'dark-mode';
  darkModeToggle.setAttribute('aria-pressed', !isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
}

// Show Form Section
function showFormSection() {
  welcomeSection.classList.add('hidden');
  document.getElementById('about').classList.add('hidden');
  formSection.classList.remove('hidden');
  formSection.scrollIntoView({ behavior: 'smooth' });
}

// Go Back to Welcome Screen
function goBack() {
  formSection.classList.add('hidden');
  cardContainer.classList.add('hidden');
  welcomeSection.classList.remove('hidden');
  welcomeSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle Field Change
function handleFieldChange() {
  if (fieldSelect.value === 'Autre') {
    otherField.disabled = false;
    otherField.required = true;
  } else {
    otherField.disabled = true;
    otherField.required = false;
    otherField.value = '';
  }
}

// Handle Photo Upload
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  
  if (!file) return;
  
  if (!file.type.match('image.*')) {
    showError(photoInput, 'photoError', 'Veuillez sélectionner une image valide');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Photo preview">`;
    photoPreview.classList.add('has-image');
  };
  
  reader.readAsDataURL(file);
  clearError(photoInput, 'photoError');
}

// Form Validation
function validateForm() {
  let isValid = true;
  
  // Validate first name
  if (!firstNameInput.value.trim() || !firstNameInput.validity.valid) {
    showError(firstNameInput, 'firstNameError', 'Veuillez entrer un prénom valide');
    isValid = false;
  } else {
    clearError(firstNameInput, 'firstNameError');
  }
  
  // Validate last name
  if (!lastNameInput.value.trim() || !lastNameInput.validity.valid) {
    showError(lastNameInput, 'lastNameError', 'Veuillez entrer un nom valide');
    isValid = false;
  } else {
    clearError(lastNameInput, 'lastNameError');
  }
  
  // Validate field selection
  if (!fieldSelect.value) {
    showError(fieldSelect, 'fieldError', 'Veuillez sélectionner une filière');
    isValid = false;
  } else {
    clearError(fieldSelect, 'fieldError');
    
    // Validate "Other" field if selected
    if (fieldSelect.value === "Autre" && !otherField.value.trim()) {
      showError(otherField, 'fieldError', 'Veuillez préciser votre filière');
      isValid = false;
    }
  }
  
  // Validate CIN
  if (!cinInput.value.trim() || !cinInput.validity.valid) {
    showError(cinInput, 'cinError', 'Format CIN invalide (ex: AB123456)');
    isValid = false;
  } else {
    clearError(cinInput, 'cinError');
  }
  
  // Validate Massar code
  if (!massarInput.value.trim() || !massarInput.validity.valid) {
    showError(massarInput, 'massarError', 'Format code Massar invalide');
    isValid = false;
  } else {
    clearError(massarInput, 'massarError');
  }
  
  // Validate email
  if (!emailInput.value.trim() || !emailInput.validity.valid) {
    showError(emailInput, 'emailError', 'Veuillez entrer une adresse email valide');
    isValid = false;
  } else {
    clearError(emailInput, 'emailError');
  }
  
  // Validate phone
  if (!phoneInput.value.trim() || !phoneInput.validity.valid) {
    showError(phoneInput, 'phoneError', 'Format de téléphone invalide');
    isValid = false;
  } else {
    clearError(phoneInput, 'phoneError');
  }
  
  // Validate photo
  if (!photoInput.files || !photoInput.files[0]) {
    showError(photoInput, 'photoError', 'Veuillez sélectionner une photo');
    isValid = false;
  } else {
    clearError(photoInput, 'photoError');
  }
  
  return isValid;
}

// Show Error
function showError(inputElement, errorId, message) {
  inputElement.classList.add('invalid');
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Clear Error
function clearError(inputElement, errorId) {
  inputElement.classList.remove('invalid');
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = 'none';
}

// Handle Form Submit
function handleFormSubmit(event) {
  event.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  // Show loading overlay
  loadingOverlay.classList.remove('hidden');
  
  // Simulate loading (processing time)
  setTimeout(() => {
    generateStudentCard();
    loadingOverlay.classList.add('hidden');
    formSection.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    cardContainer.scrollIntoView({ behavior: 'smooth' });
  }, 1500);
}

// Generate Student Card
function generateStudentCard() {
  // Set student info on card
  cardFirstName.textContent = firstNameInput.value;
  cardLastName.textContent = lastNameInput.value;
  
  // Handle field display (regular or custom "Autre")
  cardField.textContent = fieldSelect.value === 'Autre' ? otherField.value : fieldSelect.value;
  
  cardCIN.textContent = cinInput.value;
  cardMassar.textContent = massarInput.value;
  cardEmail.textContent = emailInput.value;
  cardPhone.textContent = phoneInput.value;
  
  // Set photo
  const photoFile = photoInput.files[0];
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      cardPhoto.src = e.target.result;
    };
    reader.readAsDataURL(photoFile);
  }
}

// Edit Card
function editCard() {
  cardContainer.classList.add('hidden');
  formSection.classList.remove('hidden');
  formSection.scrollIntoView({ behavior: 'smooth' });
}

// Download Card
function downloadCard() {
  // Show loading overlay
  loadingOverlay.classList.remove('hidden');
  
  const studentCard = document.getElementById('studentCard');
  const studentName = `${lastNameInput.value}_${firstNameInput.value}`.replace(/\s+/g, '_');
  
  domtoimage.toJpeg(studentCard, { quality: 0.95 })
    .then(function (dataUrl) {
      // Create download link
      const link = document.createElement('a');
      link.download = `Carte_Etudiant_${studentName}.jpg`;
      link.href = dataUrl;
      link.click();
      
      // Hide loading overlay
      loadingOverlay.classList.add('hidden');
    })
    .catch(function (error) {
      console.error('Error generating card image:', error);
      alert('Une erreur est survenue lors de la génération de la carte. Veuillez réessayer.');
      loadingOverlay.classList.add('hidden');
    });
}

// Reset form on page load (prevent cached values in some browsers)
window.addEventListener('pageshow', function(event) {
  if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
    studentCardForm.reset();
    photoPreview.innerHTML = '';
    photoPreview.classList.remove('has-image');
  }
});

// Add input validation listeners
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('blur', function() {
    // Only validate if the field has been interacted with
    if (this.value) {
      if (!this.validity.valid) {
        const errorId = this.id + 'Error';
        showError(this, errorId, this.validationMessage || 'Ce champ est requis');
      } else {
        const errorId = this.id + 'Error';
        clearError(this, errorId);
      }
    }
  });
});