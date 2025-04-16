const loginClick = () => {
  window.location.href = "./../files/login.html";
};

const regClick = () => {
  window.location.href = "./../files/registration.html";
};

document.getElementById("create-account")?.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!name || !username || !email || !phone || !password) {
    // alert("Please fill out all fields.");
    Swal.fire({
      icon: "Please fill out all fields.",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    return;
  }

  const data = {
    name,
    username,
    email,
    phone,
    password,
  };

  fetch("http://45.143.198.44:8070/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log(response);
      // console.log("Registration successful:", response);

      // alert("Registration successful! You can now log in.");

      Swal.fire({
        title: "Registration successful! You can now log in.",
        icon: "success",
        draggable: true,
      });
      // Optionally redirect
      window.location.href = "./../files/login.html";
    })
    .catch((error) => {
      // alert("Registration failed. Please try again.");

      Swal.fire({
        icon: "Registration failed. Please try again.",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
});

document.getElementById("login-press")?.addEventListener("click", (e) => {
  e.preventDefault();

  let username = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  const data = {
    username: username,
    password: pass,
  };

  fetch("http://45.143.198.44:8070/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((response) => {
      const token = response.token;
      const user = response.user;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // alert(`Welcome ${user.username}! You are logged in`);
      Swal.fire({
        title: `Welcome ${user.username}! You are logged in`,
        icon: "success",
        draggable: true,
      });
      // Optionally redirect
      window.location.href = "./../files/home.html";
    })
    .catch((error) => {
      // alert("Invalid username or password.");
      Swal.fire({
        icon: "Invalid username or password.",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
});

const handleLogout = () => {
  window.location.href = "./../index.html";
};
