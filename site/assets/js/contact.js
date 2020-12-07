fetch("https://grahamsh-contact.glitch.me/", { mode: "no-cors" });
const version = new URL(location.href).searchParams.get("version");

const setStatus = (statusText, status) => {
  const element = document.querySelector("#contact-status");
  element.textContent = statusText;
  element.hidden = false;
  element.classList.remove([...element.classList].filter((className) => /alert-/.exec(className))[0]);
  element.classList.add(`alert-${status}`);
};

document.querySelector("#contact-form").onsubmit = async (event) => {
  event.preventDefault();
  setStatus("Sending...", "primary");

  document.querySelector("#contact-username").readOnly = true;
  document.querySelector("#contact-content").readOnly = true;
  document.querySelector("#contact-submit").disabled = true;

  // document.querySelector("#sending").style.display = "block";

  const body = {
    version,
    userAgent: navigator.userAgent,
    language: navigator.language,
    content: document.querySelector("#contact-content").value,
    username: document.querySelector("#contact-username").value,
  };

  try {
    const res = await fetch("https://grahamsh-contact.glitch.me/send", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw "";
    setTimeout(() => (document.querySelector("#contact-submit").disabled = false), 10000);
    setStatus("Sent! Thanks for the contact.", "success");
  } catch (err) {
    setStatus("Error sending contact! Try again?", "danger");
    document.querySelector("#contact-submit").disabled = false;
  }

  document.querySelector("#contact-username").readOnly = false;
  document.querySelector("#contact-content").readOnly = false;
};

window.addEventListener("load", () => document.querySelector("textarea").focus());
