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
    link.classList.remove("border-pink-500", "text-pink-500");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("border-pink-500", "text-pink-500");
    }
  });
});
