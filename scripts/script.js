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

//Валидация форм. Проверяем только заполнена форма или нет.
let burger = document.getElementById("burger");
let customerName = document.getElementById("customerName");
let phone = document.getElementById("phone");

document.getElementById("order-action").onclick = function (event) {
  event.preventDefault();
  let hasError = false;

  [burger, customerName, phone].forEach((item) => {
    if (!item.value) {
      item.parentElement.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.parentElement.style.background = "";
    }
  });

  if (!hasError) {
    [burger, customerName, phone].forEach((item) => {
      item.value = "";
    });
    alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
  }
};

//Меняем валюту в стоимости бургеров
let prices = document.getElementsByClassName("product-item-price");
prices = Array.from(prices);
document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;
  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 93;
  } else if (currentCurrency === "₽") {
    newCurrency = "BYN";
    coefficient = 3.3;
  } else if (currentCurrency === "BYN") {
    newCurrency = "€";
    coefficient = 0.93;
  } else if (currentCurrency === "€") {
    newCurrency = "¥";
    coefficient = 7.2;
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
