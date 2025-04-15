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
    link.classList.remove("border-blue-500", "text-blue-500", "text-gray-600");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("border-blue-500", "text-blue-500");
    }

    // console.log(link);
  });
  navLinks.forEach((link) => {
    if (link.getAttribute("href") !== `#${current}`) {
      link.classList.add("text-gray-600");
    }
  });
});

// console.log(sections);
// console.log(navLinks);
