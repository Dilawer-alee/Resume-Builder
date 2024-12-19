document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(input => {
  input.addEventListener('input', updatePreview);
});

function updatePreview() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const languages = document.getElementById("languages").value.split(",");
  const profileImage = document.getElementById("profileImage").files[0];
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value.split(",");
  const workExperience = document.getElementById("workExperience").value.split(",");
  const profile = document.getElementById("profile").value;
  const references = document.getElementById("references").value;

  document.getElementById("display-name").textContent = name;
  document.getElementById("display-email").textContent = email;
  document.getElementById("display-phone").textContent = phone;
  document.getElementById("display-address").textContent = address;
  document.getElementById("display-education").textContent = education;

  const skillsList = document.getElementById("display-skills");
  skillsList.innerHTML = ""; 
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });

  if (profileImage) {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById("display-image").src = reader.result;
    };
    reader.readAsDataURL(profileImage);
  }

  const languagesList = document.getElementById("display-languages");
  languagesList.innerHTML = ""; 
  languages.forEach(language => {
    const li = document.createElement("li");
    li.textContent = language.trim();
    languagesList.appendChild(li);
  });

  const workExperienceList = document.getElementById("display-workExperience");
  workExperienceList.innerHTML = ""; 
  workExperience.forEach(experience => {
    const li = document.createElement("li");
    li.textContent = experience.trim();
    workExperienceList.appendChild(li);
  });

  document.getElementById("display-profile").textContent = profile;
  document.getElementById("display-references").textContent = references;

  document.getElementById("resume").classList.remove("hidden");
}
document.getElementById('downloadPDF').addEventListener('click', function () {
  html2canvas(document.getElementById('resume')).then(function (canvas) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10);
    pdf.save('resume.pdf');
  });
});
