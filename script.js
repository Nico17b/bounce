window.onload = function () {
  const image = document.getElementById('bouncing-image');
  const fileInput = document.getElementById('logo-upload');
  let x = 0;
  let y = 0;
  let xSpeed = 5;
  let ySpeed = 5;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  fileInput.addEventListener('change', handleLogoUpload);

  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
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
