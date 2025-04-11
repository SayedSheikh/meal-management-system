const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("border-blue-500", "text-blue-500");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("border-blue-500", "text-blue-500");
    }
  });
});
