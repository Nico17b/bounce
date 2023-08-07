window.onload = function () {
  const image = document.getElementById('bouncing-image');
  const fileInput = document.getElementById('logo-upload');
  const themeSwitcher = document.getElementById('theme-switcher');
  let isDarkTheme = false; // Set the default theme to false (default theme)
  let x = 0;
  let y = 0;
  let xSpeed = 5;
  let ySpeed = 5;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  fileInput.addEventListener('change', handleLogoUpload);
  themeSwitcher.addEventListener('click', toggleTheme);

  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.src = reader.result;

        img.onload = function () {
          if (img.width > screenWidth || img.height > screenHeight) {
            // Resize the image proportionally to fit within the screen
            const ratio = Math.min(screenWidth / img.width, screenHeight / img.height);
            image.width = img.width * ratio;
            image.height = img.height * ratio;
          } else {
            image.width = img.width;
            image.height = img.height;
          }

          // Reset x position to center
          x = screenWidth / 2 - image.width / 2;
          // Reset y position to center
          y = screenHeight / 2 - image.height / 2;

          // Set the resized image as the source for the bouncing image
          image.src = img.src;
        };
      };
      reader.readAsDataURL(file);
    }
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
      document.body.style.backgroundColor = '#222'; // Dark theme background color
      themeSwitcher.innerText = 'Default Theme';
    } else {
      document.body.style.backgroundColor = '#fff'; // Default theme background color
      themeSwitcher.innerText = 'Dark Theme';
    }
  }

  function animate() {
    x += xSpeed;
    y += ySpeed;

    if (x + image.width >= screenWidth || x <= 0) {
      xSpeed *= -1;
    }

    if (y + image.height >= screenHeight || y <= 0) {
      ySpeed *= -1;
    }

    image.style.left = x + 'px';
    image.style.top = y + 'px';

    requestAnimationFrame(animate);
  }

  animate();
};
