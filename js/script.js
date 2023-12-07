"use strict"

window.addEventListener("load", windowLoad)

function windowLoad() {
  document.addEventListener("click", documentActions)
}

function documentActions(e) {
  const targetElement = e.target
  // scroll
  if (targetElement.hasAttribute("data-goto")) {
    const gotoElement = document.querySelector(`${targetElement.dataset.goto}`)
    const header = document.querySelector(".header")
    const headerHeight = header ? header.offsetHeight : 0

    if (gotoElement) {
      window.scrollTo({
        top: gotoElement.offsetTop - headerHeight,
        behavior: "smooth",
      })
    }

    e.preventDefault()
  }
  // tabs
  if (
    targetElement.classList.contains("tabs-works__button") &&
    !targetElement.classList.contains("active")
  ) {
    const activeElement = document.querySelector(".tabs-works__button.active")
    const elements = document.querySelectorAll(".tabs-works__item")
    const elementType = targetElement.dataset.workType

    activeElement.classList.remove("active")
    targetElement.classList.add("active")

    elements.forEach((element) => {
      !elementType || element.dataset.workType === elementType
        ? (element.hidden = false)
        : (element.hidden = true)
    })
  }
}

// ----- submit form to google sheet --------------
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwK419bjvsrY4fr_40TU6XyKqs6BdcVMnj90ePeKbKDgkrpw6N_5gBnc3-kgI5hCNp5/exec"
const form = document.forms["submit-to-google-sheet"]

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(form)

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      if (response.ok) {
        // Form submitted successfully
        showSuccessMessage("Form submitted successfully!")
        form.reset()
      } else {
        // Error submitting form
        showErrorMessage(
          "An error occurred while submitting the form. \nPlease try again."
        )
        console.error("Error!", response.status)
      }
    })
    .catch((error) => {
      // Error submitting form
      showErrorMessage("An unexpected error occurred. \nPlease try again.")
      console.error("Error!", error.message)
    })
})

function showSuccessMessage(message) {
  var successOverlay = document.getElementById("success-overlay")
  var successMessageElement = document.getElementById("success-message")

  successOverlay.style.display = "flex"
  successMessageElement.innerText = message

  setTimeout(function () {
    successOverlay.style.display = "none"
  }, 5000)
}

function showErrorMessage(message) {
  var overlay = document.getElementById("overlay")
  var errorMessageElement = document.getElementById("error-message")

  overlay.style.display = "flex"
  errorMessageElement.innerText = message

  setTimeout(function () {
    overlay.style.display = "none"
  }, 5000)
}

function closePopup() {
  document.getElementById("overlay").style.display = "none"
  document.getElementById("success-overlay").style.display = "none"
}
// ----- END OF submit form to google sheet --------------
