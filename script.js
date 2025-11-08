// --- modal handling ---
const studentBtn = document.getElementById("studentBtn");
const instructorBtn = document.getElementById("instructorBtn");
const studentModal = document.getElementById("studentModal");
const instructorModal = document.getElementById("instructorModal");
const closeButtons = document.querySelectorAll(".close");

studentBtn.onclick = () => (studentModal.style.display = "flex");
instructorBtn.onclick = () => (instructorModal.style.display = "flex");

closeButtons.forEach(btn => btn.onclick = () => {
  studentModal.style.display = "none";
  instructorModal.style.display = "none";
});

window.onclick = e => {
  if (e.target === studentModal) studentModal.style.display = "none";
  if (e.target === instructorModal) instructorModal.style.display = "none";
};

// --- student login ---
document.getElementById("studentForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  if (!name) return alert("Please enter your name");
  localStorage.setItem("studentName", name);
  window.location.href = "dashboard.html"; // student dashboard
});

// --- instructor login ---
document.getElementById("instructorForm").addEventListener("submit", e => {
  e.preventDefault();
  window.location.href = "instructor.html"; // instructor dashboard
});
