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
}
