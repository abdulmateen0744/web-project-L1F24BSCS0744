

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("cname");
const emailInput = document.getElementById("cemail");
const messageInput = document.getElementById("cmessage");
const sendBtn = document.getElementById("sendBtn");
const successMsg = document.getElementById("successMsg");

const nameMsg = document.getElementById("nameMsg");
const emailMsg = document.getElementById("emailMsg");
const countMsg = document.getElementById("countMsg");

// Mark a field as good or bad and show a short message
function setState(input, message, isValid, text) {
  const field = input.parentElement;
  field.classList.toggle("ok", isValid);
  field.classList.toggle("bad", !isValid);
  message.textContent = text;
}

function checkName() {
  const ok = nameInput.value.trim().length >= 3;
  setState(nameInput, nameMsg, ok, ok ? "Looks good" : "Name needs at least 3 letters");
  return ok;
}

function checkEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = pattern.test(emailInput.value.trim());
  setState(emailInput, emailMsg, ok, ok ? "Looks good" : "Enter a valid email address");
  return ok;
}

function checkMessage() {
  const length = messageInput.value.trim().length;
  const ok = length >= 10;
  const text = messageInput.value.length + " / 200" + (ok ? "" : " (write at least 10 characters)");
  setState(messageInput, countMsg, ok, text);
  return ok;
}


function updateButton() {
  const allValid = checkName() && checkEmail() && checkMessage();
  sendBtn.disabled = !allValid;
}

nameInput.addEventListener("input", updateButton);
emailInput.addEventListener("input", updateButton);
messageInput.addEventListener("input", updateButton);


form.addEventListener("submit", function (event) {
  event.preventDefault();
  successMsg.hidden = false;
  form.reset();
  sendBtn.disabled = true;
  document.querySelectorAll(".field").forEach(function (field) {
    field.classList.remove("ok", "bad");
  });
  nameMsg.textContent = "";
  emailMsg.textContent = "";
  countMsg.textContent = "0 / 200";
});