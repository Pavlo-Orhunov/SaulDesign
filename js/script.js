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
