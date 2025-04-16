const loginClick = () => {
  window.location.href = "./../files/login.html";
};

document.getElementById("create-account")?.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!name || !username || !email || !phone || !password) {
    alert("Please fill out all fields.");
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
      console.log(response);
      console.log("Registration successful:", response);
      alert("Registration successful! You can now log in.");
      // Optionally redirect
      window.location.href = "./../files/login.html";
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    });
});

// const regClick = () => {};

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

      alert(`Welcome ${user.username}! You are logged in`);
      // Optionally redirect
      window.location.href = "./../files/home.html";
    })
    .catch((error) => {
      console.error("Login Error:", error);
      alert("Invalid username or password.");
    });
});

const handleLogout = () => {
  window.location.href = "./../index.html";
};
