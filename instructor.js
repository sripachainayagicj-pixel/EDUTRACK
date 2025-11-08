document.addEventListener("DOMContentLoaded", function() { 
  // ===== View All Classes Toggle ===== 
  const viewAllBtn = document.querySelector(".today-classes .view-all"); 
  const allClasses = document.querySelectorAll(".today-classes .class-card"); 

  viewAllBtn.addEventListener("click", () => { 
    allClasses.forEach(card => { 
      card.style.display = card.style.display === "block" ? "none" : "block"; 
    }); 
    viewAllBtn.textContent = viewAllBtn.textContent === "View All" ? "Collapse" : "View All"; 
  }); 

  // ===== Quick Actions Alerts ===== 
  const quickActions = document.querySelectorAll(".action-card"); 
  quickActions.forEach(action => { 
    action.addEventListener("click", () => { 
      alert(`${action.querySelector("h3").textContent} clicked!`); 
    }); 
  }); 

  // ===== New Class Modal ===== 
  const newClassBtn = document.getElementById("newClassBtn"); 
  const modal = document.getElementById("newClassModal"); 
  const closeBtn = modal.querySelector(".close-btn"); 
  const newClassForm = document.getElementById("newClassForm"); 
  const todayClassesSection = document.querySelector(".today-classes"); 

  // Open modal 
  newClassBtn.addEventListener("click", () => modal.classList.remove("hidden")); 

  // Close modal by close button 
  closeBtn.addEventListener("click", () => modal.classList.add("hidden")); 

  // Close modal by clicking outside 
  window.addEventListener("click", (e) => { 
    if (e.target === modal) modal.classList.add("hidden"); 
  }); 

  // Handle form submission (simple class card) 
  newClassForm.addEventListener("submit", (e) => { 
    e.preventDefault(); // stop page reload 

    // Get values from form inputs 
    const className = newClassForm.querySelector("#className").value; 
    const classTime = newClassForm.querySelector("#classTime").value; 

    // Create new class element 
    const classCard = document.createElement("div"); 
    classCard.classList.add("class-card"); 
    classCard.innerHTML = `
      <h3>${className}</h3>
      <p>Time: ${classTime}</p>
    `; 

    // Append to today's classes section 
    todayClassesSection.appendChild(classCard); 

    // Reset form and close modal 
    newClassForm.reset(); 
    modal.classList.add("hidden"); 
  }); 

  // ===== Handle new class submission (full structure with QR) ===== 
  newClassForm.addEventListener("submit", (e) => { 
    e.preventDefault(); 

    const subject = document.getElementById("subjectName").value; 
    const date = document.getElementById("classDate").value; 
    const time = document.getElementById("classTime").value; 
    const students = document.getElementById("studentCount").value; 

    // Format date 
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); 

    // Create new class card 
    const card = document.createElement("div"); 
    card.className = "class-card upcoming"; 
    card.innerHTML = `
      <h3>${subject}</h3>
      <p>${time} • Room TBD</p>
      <p>Students: ${students}</p>
      <p>Date: ${formattedDate}</p>
      <span class="status">upcoming</span>
      <button class="qr-btn">Generate QR</button>
    `; 

    todayClassesSection.appendChild(card); 

    // QR button for new class 
    card.querySelector(".qr-btn").addEventListener("click", () => { 
      alert(`Attendance QR code generated for ${subject}!`); 
    }); 

    newClassForm.reset(); 
    modal.classList.add("hidden"); 
  }); 
});

