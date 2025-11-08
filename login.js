const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // For demo, we accept any username/password
  if(username && password){
    // Navigate to instructor dashboard
    window.location.href = 'dashboard.html';
  } else {
    alert('Please enter username and password');
  }
});
