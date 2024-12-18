document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(input => {
  input.addEventListener('input', updatePreview);
});

function updatePreview() {
  // Collect input values
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

  // Update the preview for each field
  document.getElementById("display-name").textContent = name;
  document.getElementById("display-email").textContent = email;
  document.getElementById("display-phone").textContent = phone;
  document.getElementById("display-address").textContent = address;
  document.getElementById("display-education").textContent = education;

  // Update the skills list
  const skillsList = document.getElementById("display-skills");
  skillsList.innerHTML = ""; // Clear existing list items
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });

  // Display the profile image if uploaded
  if (profileImage) {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById("display-image").src = reader.result;
    };
    reader.readAsDataURL(profileImage);
  }

  // Update the languages list
  const languagesList = document.getElementById("display-languages");
  languagesList.innerHTML = ""; // Clear existing list items
  languages.forEach(language => {
    const li = document.createElement("li");
    li.textContent = language.trim();
    languagesList.appendChild(li);
  });

  // Update the work experience list
  const workExperienceList = document.getElementById("display-workExperience");
  workExperienceList.innerHTML = ""; // Clear existing list items
  workExperience.forEach(experience => {
    const li = document.createElement("li");
    li.textContent = experience.trim();
    workExperienceList.appendChild(li);
  });

  // Update the profile and references
  document.getElementById("display-profile").textContent = profile;
  document.getElementById("display-references").textContent = references;

  // Ensure the resume section is visible
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
// });