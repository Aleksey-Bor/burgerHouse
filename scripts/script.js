//Плавная прокрутка страницы к разделу "Выберите свой бургер" при нажатии на кнопку "Смотреть меню"
document.getElementById("main-action-button").onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

//Плавная прокрутка страницы к соответсвующим разделам при нажатии ссылок меню
let links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    document
      .getElementById(links[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  };
}

//По умолчанию скрываем кнопки "Дополнить заказ" и "Отменить заказ"
let orderFormControlsElem = document.getElementsByClassName(
  "order-form-controls"
)[0];
orderFormControlsElem.style.display = "none";

//Плавная прокрутка к форме заказа при нажатии кнопки продукта и атоматическое заполнение формы "Ваш заказ"
let buttons = document.getElementsByClassName("product-button");
let burgerInput = document.getElementById("burger");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    // Aвтоматическое заполнение формы
    burgerInput.value += this.getAttribute("data-burger");
    orderFormControlsElem.style.display = "flex";
  };
}

//Плавная прокрутка к разделу "Выберите свой бургер" при нажатии на кропку "Дополнить заказ"
let addOrderButton = document.getElementById("addOrder");
addOrderButton.onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

//Показываем кнопки "Дополнить заказ" и "Отменить заказ" в зависиомсти от заполнения формы "Ваш заказ"
burgerInput.onchange = function () {
  if (burgerInput.value) {
    orderFormControlsElem.style.display = "flex";
    isHidden = true;
  } else orderFormControlsElem.style.display = "none";
};

//Стираем содержимое формы "Ваш заказ" и скрываем кнопки "Дополнить заказ" и "Отменить заказ" при нажатии кнопки "Отменить заказ"
document.getElementById("cancelOrder").onclick = function () {
  burgerInput.value = "";
  orderFormControlsElem.style.display = "none";
};

//Меняем валюту в стоимости бургеров
let prices = document.getElementsByClassName("product-item-price");
prices = Array.from(prices);
document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;
  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "BYN";
    coefficient = 3.3;
  } else if (currentCurrency === "BYN") {
    newCurrency = "€";
    coefficient = 0.92;
  } else if (currentCurrency === "€") {
    newCurrency = "¥";
    coefficient = 7.2;
  } else if (currentCurrency === "¥") {
    newCurrency = "₽";
    coefficient = 93;
  }

  e.target.innerText = newCurrency;

  prices.forEach((el) => {
    console.log(el.getAttribute("data-base-prise"));
    el.innerText =
      +(el.getAttribute("data-base-prise") * coefficient).toFixed(0) +
      " " +
      newCurrency;
  });
};

//Анимация главной картинки и картинк в разделе заказ при движени мышкой экрану
let mainImageStyle = document.getElementById("main-image").style;
let orderImageStyle = document.getElementById("order-image").style;
document.onmousemove = function (e) {
  orderImageStyle.transform =
    "translate(-" +
    (e.clientX * 0.3) / 8 +
    "px,-" +
    (e.clientY * 0.3) / 8 +
    "px)";
  mainImageStyle.transform =
    "translate(-" +
    (e.clientX * 0.3) / 8 +
    "px,-" +
    (e.clientY * 0.3) / 8 +
    "px)";
};

//отправляем запрос на сервер
//Валидация форм. Проверяем только заполнена форма или нет.
document
  .getElementById("order-action")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    let order = document.getElementById("burger");
    let customerName = document.getElementById("customerName");
    let phone = document.getElementById("phone");

    let data = {
      order: order.value,
      name: customerName.value,
      phone: phone.value,
    };

    let hasError = false;

    [order, customerName, phone].forEach((item) => {
      if (!item.value) {
        item.parentElement.parentElement.style.background = "red";
        hasError = true;
      } else {
        item.parentElement.parentElement.style.background = "";
      }
    });

    if (!hasError) {
      fetch("https://testologia.site/burgers-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => {
          alert(error.message);
        });

      [burger, customerName, phone].forEach((item) => {
        item.value = "";
      });
    }
  });
