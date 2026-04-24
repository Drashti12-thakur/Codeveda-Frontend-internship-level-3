const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btnText");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    msg.innerText = "Please fill all fields";
    msg.className = "error";
    return;
  }

  if (!email.match(emailPattern)) {
    msg.innerText = "Enter valid email";
    msg.className = "error";
    return;
  }

  // Show loader
  loader.classList.remove("hidden");
  btnText.innerText = "Sending...";

  emailjs.send("service_dz4f5f8", "template_e3dfin6", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    msg.innerText = "✅ Message sent successfully!";
    msg.className = "success";

    form.reset();
  })
  .catch(() => {
    msg.innerText = "❌ Failed to send message";
    msg.className = "error";
  })
  .finally(() => {
    loader.classList.add("hidden");
    btnText.innerText = "Send";
  });

});
