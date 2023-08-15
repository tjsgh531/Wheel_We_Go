const sections = document.querySelectorAll('.section');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');

let currentSectionIndex = 0;

nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    sections[currentSectionIndex].classList.remove('active');
    currentSectionIndex = index + 1;
    sections[currentSectionIndex].classList.add('active');
    updateButtonVisibility();
  });
});

prevButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    sections[currentSectionIndex].classList.remove('active');
    currentSectionIndex = index;
    sections[currentSectionIndex].classList.add('active');
    updateButtonVisibility();
  });
});

function updateButtonVisibility() {
  prevButtons.forEach(button => {
    button.style.display = currentSectionIndex === 0 ? 'none' : 'inline-block';
  });

  nextButtons.forEach(button => {
    button.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'inline-block';
  });
}

sections[currentSectionIndex].classList.add('active');
updateButtonVisibility();
