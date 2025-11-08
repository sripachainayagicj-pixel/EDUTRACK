document.addEventListener('DOMContentLoaded', () => {
  const studentsByClass = {
    "Computer Science 101": [
      {name:"Aarav Kumar", pct:78}, {name:"Ishaan Patel", pct:88}, {name:"Meera Reddy", pct:92},
      {name:"Devika Nair", pct:81}, {name:"Arjun Menon", pct:95}, {name:"Rohit Das", pct:67},
      {name:"Sneha Choudhury", pct:84}, {name:"Kavya Sharma", pct:89}, {name:"Ritika Gupta", pct:76},
      {name:"Anaya Singh", pct:91}, {name:"Vedant Joshi", pct:85}, {name:"Tanvi Iyer", pct:87},
      {name:"Harsh Mehta", pct:82}, {name:"Diya Rathi", pct:79}, {name:"Aditya Rao", pct:94},
      {name:"Priya Sharma", pct:80}, {name:"Nikhil Sinha", pct:86}, {name:"Bhavna Desai", pct:83},
      {name:"Rohan Kapoor", pct:77}, {name:"Simran Kaur", pct:90}
    ],
    "Advanced Mathematics": [
      {name:"Kiran Gupta", pct:91}, {name:"Lavanya Iyer", pct:73}, {name:"Manish Verma", pct:86},
      {name:"Nikhil Rao", pct:64}, {name:"Priya Singh", pct:80}, {name:"Rahul Jain", pct:78},
      {name:"Tanvi Deshmukh", pct:90}, {name:"Siddharth Mehta", pct:83}, {name:"Anjali Nair", pct:88},
      {name:"Raghav Sharma", pct:81}, {name:"Diya Kapoor", pct:92}, {name:"Vedant Joshi", pct:75},
      {name:"Harshita Rathi", pct:79}, {name:"Arnav Sinha", pct:84}, {name:"Aisha Verma", pct:87},
      {name:"Ritika Das", pct:85}, {name:"Aditya Mehra", pct:76}, {name:"Simran Kaur", pct:89},
      {name:"Ishaan Reddy", pct:82}, {name:"Mira Sharma", pct:90}
    ],
    "Data Structures": [
      {name:"Arjun Iyer", pct:85}, {name:"Meera Kapoor", pct:91}, {name:"Rohan Sharma", pct:78},
      {name:"Tanvi Gupta", pct:87}, {name:"Ishaan Verma", pct:82}, {name:"Diya Nair", pct:90},
      {name:"Aditya Menon", pct:83}, {name:"Priya Reddy", pct:88}, {name:"Vedant Sharma", pct:79},
      {name:"Sahana Krishnan", pct:92}, {name:"Harsh Kumar", pct:76}, {name:"Kavya Rao", pct:84},
      {name:"Ritika Mehta", pct:81}, {name:"Simran Desai", pct:86}, {name:"Nikhil Sharma", pct:80},
      {name:"Bhavna Kapoor", pct:89}, {name:"Tanmay Joshi", pct:77}, {name:"Anaya Verma", pct:85},
      {name:"Rahul Iyer", pct:91}, {name:"Diya Sharma", pct:83}
    ]
  };

  const classSelect = document.getElementById('classSelect');
  const reportDate = document.getElementById('reportDate');
  const reportContainer = document.getElementById('reportContainer');

  reportDate.value = new Date().toISOString().split('T')[0]; // default today

  // Create Back button
  const backBtn = document.createElement('button');
  backBtn.id = 'backBtn';
  backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
  backBtn.style.marginBottom = '15px';
  reportContainer.parentElement.prepend(backBtn);

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  function loadReport() {
    reportContainer.innerHTML = '';
    const cls = classSelect.value;
    const students = studentsByClass[cls];

    const title = document.createElement('h3');
    title.className = 'class-title';
    title.textContent = `${cls} – ${reportDate.value}`;
    reportContainer.appendChild(title);

    const shuffled = [...students].sort(() => Math.random() - 0.5);

    // Create Present and Absent sections
    const presentSection = document.createElement('div');
    const absentSection = document.createElement('div');

    const presentTitle = document.createElement('h4');
    presentTitle.textContent = "Present Students";
    presentTitle.style.color = "#28a745";
    presentSection.appendChild(presentTitle);

    const absentTitle = document.createElement('h4');
    absentTitle.textContent = "Absent Students";
    absentTitle.style.color = "#dc3545";
    absentSection.appendChild(absentTitle);

    shuffled.forEach(s => {
      const item = document.createElement('div');
      item.className = 'student-item';
      item.innerHTML = `<span class="student-name">${s.name}</span>
                        <span class="attendance-pct">${s.pct}%</span>`;
      if(s.pct >= 80){
        presentSection.appendChild(item);
      } else {
        absentSection.appendChild(item);
      }
    });

    reportContainer.appendChild(presentSection);
    reportContainer.appendChild(absentSection);
  }

  document.getElementById('loadReportBtn').addEventListener('click', loadReport);
  document.getElementById('refreshReport').addEventListener('click', loadReport);

  document.getElementById('copyClipboard').addEventListener('click', () => {
    navigator.clipboard.writeText(reportContainer.innerText).then(() => {
      alert('Report copied to clipboard!');
    });
  });

  document.getElementById('printReport').addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`<pre>${reportContainer.innerText}</pre>`);
    printWindow.document.close();
    printWindow.print();
  });

  document.getElementById('downloadReport').addEventListener('click', () => {
    const blob = new Blob([reportContainer.innerText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_Report_${reportDate.value}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
