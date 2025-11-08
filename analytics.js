document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("editProfileBtn");
  const profileForm = document.getElementById("profileForm");
  const profileView = document.querySelector(".profile-view");
  const saveBtn = document.getElementById("saveProfile");
  const cancelBtn = document.getElementById("cancelEdit");

  const nameField = document.getElementById("stuName");
  const emailField = document.getElementById("stuEmail");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");

  // Edit profile
  editBtn.addEventListener("click", () => {
    profileView.classList.add("hidden");
    profileForm.classList.remove("hidden");
  });

  // Save changes
  saveBtn.addEventListener("click", () => {
    nameField.textContent = nameInput.value;
    emailField.textContent = emailInput.value;

    profileForm.classList.add("hidden");
    profileView.classList.remove("hidden");
  });

  // Cancel edit
  cancelBtn.addEventListener("click", () => {
    nameInput.value = nameField.textContent;
    emailInput.value = emailField.textContent;

    profileForm.classList.add("hidden");
    profileView.classList.remove("hidden");
  });

  // Certification handling
  const certList = document.getElementById("certList");
  if (certList) {
    certList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-cert")) {
        e.target.closest(".cert-item").remove();
      }
    });
  }

  // Export portfolio
  const exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", () => {
    let portfolioText = `Instructor Portfolio\nName: ${nameField.textContent}\nEmail: ${emailField.textContent}\n\nCertifications:\n`;
    certList.querySelectorAll(".cert-info strong").forEach(cert => {
      portfolioText += `- ${cert.textContent}\n`;
    });

    const blob = new Blob([portfolioText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Portfolio_${nameField.textContent.replace(" ", "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Portfolio exported successfully!");
  });

  // Upload certificate
  const certUpload = document.getElementById("certUpload");
  certUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const li = document.createElement("li");
    li.className = "cert-item";
    li.innerHTML = `
      <div class="cert-info">
        <strong>${file.name}</strong>
        <span class="verified">Pending</span>
      </div>
      <div class="cert-actions">
        <button class="remove-cert">❌</button>
      </div>
    `;
    certList.appendChild(li);

    li.querySelector(".remove-cert").addEventListener("click", () => li.remove());

    alert(`Certificate "${file.name}" added successfully!`);
  });

  // Sign out
  const signOutBtn = document.getElementById("signOut");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      alert("You have been signed out.");
      window.location.href = "index.html";
    });
  }
});

