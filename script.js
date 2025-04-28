const navigation = document.getElementById("navigation");
const startBtn = document.getElementById("startBtn");
const formSection = document.getElementById("formSection");
const welcomeSection = document.getElementById("welcome");
const aboutSection = document.getElementById("about");
const contactSection = document.getElementById("contact");
const cardContainer = document.getElementById("cardContainer");
const studentCardForm = document.getElementById("studentCardForm");
const downloadBtn = document.getElementById("downloadBtn");

startBtn.addEventListener("click", function () {
  navigation.style.display = "none";
  welcomeSection.style.display = "none";
  aboutSection.style.display = "none";
  contactSection.style.display = "none";
  formSection.style.display = "block";
});

studentCardForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const field = document.getElementById("field").value;
  const cin = document.getElementById("cin").value;
  const massar = document.getElementById("massar").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const photoFile = document.getElementById("photo").files[0];

  document.getElementById("cardFirstName").textContent = firstName;
  document.getElementById("cardLastName").textContent = lastName;
  document.getElementById("cardField").textContent = field;
  document.getElementById("cardCIN").textContent = cin;
  document.getElementById("cardMassar").textContent = massar;
  document.getElementById("cardEmail").innerHTML = `<strong>${email}</strong>`;
  document.getElementById("cardEmail").style.color = `black`;
  document.getElementById("cardPhone").innerHTML = `<strong>${phone}</strong>`;
  document.getElementById("cardPhone").style.color = `black`;

  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("cardPhoto").src = e.target.result;
    };
    reader.readAsDataURL(photoFile);
  }

  formSection.style.display = "none";
  cardContainer.style.display = "block";
});

downloadBtn.addEventListener("click", () => {
  const node = document.querySelector(".student-card");
  domtoimage
    .toPng(node, { width: node.offsetWidth, height: node.offsetHeight })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "carte-etudiant.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error("Erreur de génération :", err));
});


// for darck mode btn 

const modeBtn = document.getElementById("darkMode");
let mode = "Switch to Night";
modeBtn.innerText = mode ;
function toggleMode() { 
  if (mode === "Switch to Night") {
    document.body.style.background = "linear-gradient(135deg, var(--bg-dark1) 10%, var(--bg-dark2) 100%)";
    document.body.style.color = "var(--text-dark)";
    mode = "Switch to Day";
    modeBtn.innerText = "Switch to Day";
  } else {
    document.body.style.background = "linear-gradient(135deg, var(--bg-light1) 10%, var(--bg-light2) 100%)";
    document.body.style.color = "var(--text-light)";
    mode = "Switch to Night";
    modeBtn.innerText = "Switch to Night";
  }
}
