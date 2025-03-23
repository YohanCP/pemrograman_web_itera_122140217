function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (name.length < 3) {
      alert('Nama harus lebih dari 3 karakter');
      return false;
    }
  
    if (!validateEmail(email)) {
      alert('Email tidak valid');
      return false;
    }
  
    if (password.length < 8) {
      alert('Password harus minimal 8 karakter');
      return false;
    }
  
    alert('Form berhasil dikirim');
    return true;
  }
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  