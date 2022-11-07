export const showConfirmationMessage = (className, response, message) => {
  const messageContainer = document.querySelector("." + className);
  messageContainer.classList.remove("success");
  messageContainer.classList.remove("error");
  messageContainer.classList.remove("hidden");

  if (!response.ok) {
    messageContainer.innerHTML =
      "A apărut o prpblemă. Te rugăm sa încerci din nou.";
    messageContainer.classList.add("error");
  } else {
    messageContainer.innerHTML = message;
    messageContainer.classList.add("success");
  }

  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 3000);
};
