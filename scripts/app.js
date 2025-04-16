const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
let cartItem = [];

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

const handleProfile = () => {
  const token = localStorage.getItem("token");

  if (token) {
    fetch("http://45.143.198.44:8070/api/customers/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        displayProfile(data);

        // You can display this on your page if needed
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  } else {
    console.warn("No token found in localStorage.");
    // Optionally redirect to login
    // window.location.href = "/login.html";
  }
};

const displayProfile = (data) => {
  let modal = document.getElementById("my_modal_1");
  modal.innerHTML = "";

  modal.innerHTML = `
  <div class="modal-box">
        <div class="p-6 bg-white rounded-2xl shadow-lg border border-blue-200">
          <h2 class="text-xl font-bold text-blue-500 mb-4 text-center">
            User Profile
          </h2>

          <div class="space-y-2">
            <p><span class="font-semibold">Name:</span> ${data.name}</p>
            <p><span class="font-semibold">Username:</span> ${data.username}</p>
            <p><span class="font-semibold">Email:</span> ${data.email}</p>
            <p><span class="font-semibold">Phone:</span> ${data.phone}</p>
            <p><span class="font-semibold">Balance:</span> $${data.balance}</p>
            <p><span class="font-semibold">ID:</span> ${data.id}</p>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </div>
  `;
  my_modal_1.showModal();
};

const loadMenuItems = (typee) => {
  const token = localStorage.getItem("token");

  fetch("http://45.143.198.44:8070/api/menu", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch menu items");
      }
      return res.json();
    })
    .then((data) => {
      displayMenuItems(data, typee);
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Could not load menu items. Please try again.");
    });
};

const displayMenuItems = (data, typee) => {
  let newData = [];

  if (typee === "breakfast") {
    newData = data.filter((el) => el.category.toLowerCase() === "breakfast");
  } else if (typee === "dinner") {
    newData = data.filter((el) => el.category.toLowerCase() === "dinner");
  } else if (typee === "launch") {
    newData = data.filter((el) => el.category.toLowerCase() === "lunch");
  } else if (typee === "snacks") {
    newData = data.filter((el) => el.category.toLowerCase() === "snacks");
  } else if (typee === "ice-cream") {
    newData = data.filter((el) => el.category.toLowerCase() === "ice-cream");
  }

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  newData.forEach((item) => {
    item.quantity = 1; // default quantity

    cardContainer.innerHTML += `
      <div class="card bg-base-100 w-70 shadow-sm hover:scale-[1.04] transition-all duration-200">
        <figure>
          <img src="${item.image_url}" alt="${
      item.name
    }" class="w-full h-[180px] object-cover" />
        </figure>
        <div class="card-body p-[12px]">
          <h2 class="card-title flex justify-between font-bold">
            <span>${item.name}</span> 
            <span class="text-green-600">$${item.price}</span>
          </h2>
          <p class="text-start">${item.description}</p>
          <div class="flex justify-start items-center border border-gray-400 rounded-sm w-[45%] mt-[10px]">
            <p class="font-semibold cursor-pointer px-2" onclick='decreaseQuantity(${JSON.stringify(
              item
            )})'>-</p>
            <p id="quantity-${
              item.id
            }" class="border-l border-r border-gray-400 font-bold px-2">${
      item.quantity
    }</p>
            <p class="font-semibold cursor-pointer px-2" onclick='increaseQuantity(${JSON.stringify(
              item
            )})'>+</p>
          </div>
          <div class="card-actions justify-end">
            <button onclick='handleAddToCart(${JSON.stringify(
              item
            )})' class="h-[30px] w-full btn btn-primary text-[12px] px-[15px] py-[0px]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

const handleAddToCart = (item) => {
  const existingItem = cartItem.find((cart) => cart.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItem.push({ ...item, quantity: 1 });
  }

  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  let badge = document.getElementById("badge");
  badge.innerText = totalQuantity;

  let totalPrice = cartItem.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  let cartBody = document.getElementById("cart-body");
  cartBody.innerHTML = `
    <span class="text-lg font-bold">${totalQuantity} Items</span>
    <span class="text-info">Subtotal: $${totalPrice.toFixed(2)}</span>
    <div class="card-actions">
      <button id='viewCart' class="btn btn-primary btn-block">View cart</button>
    </div>
  `;

  // ✅ Reattach the event listener
  document.getElementById("viewCart").addEventListener("click", () => {
    let modal = document.getElementById("my_modal_2");
    let grandTotal = cartItem.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price),
      0
    );

    modal.innerHTML = `
      <div class="modal-box block w-[70%] space-y-4">
        <table border="1" class='bg-white w-full mx-auto border-collapse'>
          <thead>
            <tr class='border-b-2 py-[10px]'>
              <th scope="col" class="py-[10px]">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${cartItem
              .map((item) => {
                const unitPrice = parseFloat(item.price);
                const totalPrice = unitPrice * item.quantity;
                return `<tr class='text-center border-b'>
                  <td><img class='mx-auto py-[10px]' src="${
                    item.image_url
                  }" alt="${item.name}" width="100"></td>
                  <td>${item.name}</td>
                  <td>${unitPrice.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td>${totalPrice.toFixed(2)}</td>
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>
    
        <div class="flex justify-between items-center mt-4">
          <h2 class="text-lg font-semibold">Grand Total: $${grandTotal.toFixed(
            2
          )}</h2>
          <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button onclick='orderConfirm()' id="confirmOrder" class="btn btn-success">Confirm Order</button>
        </div>
      </div>
    `;

    modal.showModal();
  });

  console.log(cartItem);
};

const orderConfirm = () => {
  const orderData = {
    items: cartItem.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
    })),
  };

  fetch("http://45.143.198.44:8070/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((response) => {
      console.log("Order confirmed:", response);
      alert("Order placed successfully!");
      clearUI();
    })
    .catch((error) => {
      console.error("Order Error:", error);
      alert("Error confirming order. Please try again.");
    });
};

const clearUI = () => {
  cartItem = [];
  let modal = document.getElementById("my_modal_2");
  modal.innerHTML = "";

  let badge = document.getElementById("badge");
  badge.innerText = 0;

  let cartBody = document.getElementById("cart-body");
  cartBody.innerHTML = `
    <span class="text-lg font-bold">0 Items</span>
    <span class="text-info">Subtotal: $0</span>
    <div class="card-actions">
      <button id='viewCart' class="btn btn-primary btn-block">View cart</button>
    </div>
  `;
};

// console.log(sections);
// console.log(navLinks);
