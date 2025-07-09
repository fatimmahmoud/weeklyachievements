function toggleMode() {
  const body = document.body;
  const icon = document.getElementById("mode-icon");
  if (body.classList.contains("day-mode")) {
    body.classList.remove("day-mode");
    body.classList.add("night-mode");
    icon.src = "moon.png";
    icon.alt = "الوضع الليلي";
  } else {
    body.classList.remove("night-mode");
    body.classList.add("day-mode");
    icon.src = "sun.png";
    icon.alt = "الوضع النهاري";
  }
}

window.onload = function () {
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
  savedCards.forEach(data => createCard(data.text, data.image));
};

function addCard() {
  createCard("", "");
}

function createCard(textValue, imageDataURL) {
  const container = document.getElementById("cards-container");

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  const inputText = document.createElement("textarea");
  inputText.rows = 3;
  inputText.style.resize = "vertical";
  inputText.placeholder = "اكتب وصف الإنجاز";
  inputText.value = textValue;
  inputText.disabled = true;

  const inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.accept = "image/*";

  const imgPreview = document.createElement("img");
  if (imageDataURL) {
    imgPreview.src = imageDataURL;
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️ تعديل";
  editBtn.onclick = () => {
    inputText.disabled = !inputText.disabled;
    editBtn.textContent = inputText.disabled ? "✏️ تعديل" : "✅ تم";
    if (inputText.disabled) saveAllCards();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️ حذف";
  deleteBtn.onclick = () => {
    cardContainer.remove();
    saveAllCards();
  };

  inputText.addEventListener("input", saveAllCards);

  inputImage.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.src = e.target.result;
        saveAllCards();
      };
      reader.readAsDataURL(file);
    }
  });

  const textControls = document.createElement("div");
  textControls.appendChild(inputText);
  textControls.appendChild(inputImage);
  textControls.appendChild(editBtn);
  textControls.appendChild(deleteBtn);

  cardContainer.appendChild(textControls);
  cardContainer.appendChild(imgPreview);

  container.appendChild(cardContainer);
}

function saveAllCards() {
  const container = document.getElementById("cards-container");
  const cardContainers = container.querySelectorAll(".card-container");
  const data = [];
  cardContainers.forEach(card => {
    const text = card.querySelector("textarea").value;
    const img = card.querySelector("img").src;
    data.push({ text, image: img });
  });
  localStorage.setItem("cards", JSON.stringify(data));
}
