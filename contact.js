const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

const message = document.getElementById("msg");
const submit = document.getElementById("sub");
const contactForm = document.getElementById("contactForm");

submit.addEventListener("click", function () {
  if (
    firstName.checkValidity() &&
    lastName.checkValidity() &&
    message.checkValidity()
  ) {
    console.log(`First Name: ${firstName.value}`);
    console.log(`Last Name: ${lastName.value}`);

    console.log(`Message: ${message.value}`);
    const fNameArray = firstName.value.split(" ");
    document.querySelector("form").noValidate = true;
    firstName.value = lastName.value = message.value = "";

    contactForm.classList.add("success");
    contactForm.innerHTML = `<i class="fas fa-check" id="check"></i>  Thank you for contacting us, ${
      fNameArray[fNameArray.length - 1]
    }
    <i class="fas fa-window-close" id="close"></i>`;

    const close = document.getElementById("close");
    close.addEventListener("click", function () {
      contactForm.innerHTML = "";
      contactForm.classList.remove("success");
    });
  } else {
    document.querySelector("form").noValidate = false;
    const infoArray = [firstName, lastName, message];
    for (const info of infoArray) {
      if (info.checkValidity() === false) {
        info.classList.add("invalid");
      }

      info.addEventListener("keyup", function () {
        if (info.checkValidity()) {
          info.classList.remove("invalid");
        }
      });
    }
  }
});
