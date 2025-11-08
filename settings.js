document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('editBtn');
  const saveBtn = document.getElementById('saveBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const inputs = document.querySelectorAll('#profileForm input');

  editBtn.addEventListener('click', () => {
    inputs.forEach(input => input.disabled = false);
    saveBtn.disabled = false;
  });

  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach(input => input.disabled = true);
    saveBtn.disabled = true;
    alert('Profile changes saved successfully!');
  });

  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
