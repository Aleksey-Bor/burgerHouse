document.addEventListener("DOMContentLoaded", () => {
  // Сохраняем в переменной форму для ввода заказа
  let burgerInput = document.getElementById("burger");

  // Отправляем GET-запрос на сервер и загужаем данные о бургерах и  отображаем их на странице
  fetch("https://florentine-unruly-galliform.glitch.me/burgers-data?extra=black")
    .then((response) => response.json())
    .then((data) => {
      // Получаем контейнер для продуктов
      const productsContainer = document.querySelector(".products-items");

      // Проходим по всем полученным данным
      data.forEach((item) => {
        // Создаем элементы для отображения информации о бургере
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        const productImage = document.createElement("div");
        productImage.className = "product-item-image";
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        productImage.appendChild(img);

        const productTitle = document.createElement("h3");
        productTitle.className = "product-item-title";
        productTitle.textContent = item.title;

        const productText = document.createElement("p");
        productText.className = "product-item-text";
        productText.textContent = item.text;

        const productExtra = document.createElement("div");
        productExtra.className = "product-item-extra";

        const productInfo = document.createElement("div");
        productInfo.className = "product-item-info";
        const productPrice = document.createElement("div");
        productPrice.className = "product-item-price";
        productPrice.dataset.basePrice = item.basePrice;
        productPrice.textContent = `${item.price} $`;
        const productWeight = document.createElement("div");
        productWeight.className = "product-item-weight";
        productWeight.textContent = `${item.grams} гр`;
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productWeight);

        const productAction = document.createElement("div");
        productAction.className = "product-item-action";
        const button = document.createElement("button");
        button.className = "button product-button";
        button.dataset.burger = `${item.title} 🍔`;
        button.innerHTML =
          '<span>Заказать</span><span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 18.5C17.5304 18.5 18.0391 18.7107 18.4142 19.0858C18.7893 19.4609 19 19.9696 19 20.5C19 21.0304 18.7893 21.5391 18.4142 21.9142C18.0391 22.2893 17.5304 22.5 17 22.5C16.4696 22.5 15.9609 22.2893 15.5858 21.9142C15.2107 21.5391 15 21.0304 15 20.5C15 19.39 15.89 18.5 17 18.5ZM1 2.5H4.27L5.21 4.5H20C20.2652 4.5 20.5196 4.60536 20.7071 4.79289C20.8946 4.98043 21 5.23478 21 5.5C21 5.67 20.95 5.84 20.88 6L17.3 12.47C16.96 13.08 16.3 13.5 15.55 13.5H8.1L7.2 15.13L7.17 15.25C7.17 15.3163 7.19634 15.3799 7.24322 15.4268C7.29011 15.4737 7.3537 15.5 7.42 15.5H19V17.5H7C6.46957 17.5 5.96086 17.2893 5.58579 16.9142C5.21071 16.5391 5 16.0304 5 15.5C5 15.15 5.09 14.82 5.24 14.54L6.6 12.09L3 4.5H1V2.5ZM7 18.5C7.53043 18.5 8.03914 18.7107 8.41421 19.0858C8.78929 19.4609 9 19.9696 9 20.5C9 21.0304 8.78929 21.5391 8.41421 21.9142C8.03914 22.2893 7.53043 22.5 7 22.5C6.46957 22.5 5.96086 22.2893 5.58579 21.9142C5.21071 21.5391 5 21.0304 5 20.5C5 19.39 5.89 18.5 7 18.5ZM16 11.5L18.78 6.5H6.14L8.5 11.5H16Z" fill="#191411" /></svg></span>'; // Здесь должен быть SVG для иконки корзины

        //Плавная перемотка к форме заказа при нажатии на копку "Заказать"
        button.onclick = function () {
          document
            .getElementById("order")
            .scrollIntoView({ behavior: "smooth" });
          // Aвтоматическое заполнение формы
          burgerInput.value += this.getAttribute("data-burger");
          orderFormControlsElem.style.display = "flex";
        };

        productAction.appendChild(button);

        productExtra.appendChild(productInfo);
        productExtra.appendChild(productAction);

        // Добавляем все созданные элементы в элемент продукта
        productItem.appendChild(productImage);
        productItem.appendChild(productTitle);
        productItem.appendChild(productText);
        productItem.appendChild(productExtra);

        // Добавляем элемент продукта в контейнер продуктов
        productsContainer.appendChild(productItem);
      });
    })
    .catch((error) => console.error("Ошибка:", error));

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

    let prices = Array.from(
      document.getElementsByClassName("product-item-price")
    );

    prices.forEach((el) => {
      el.innerText =
        +(el.getAttribute("data-base-price") * coefficient).toFixed(0) +
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

  //Отправляем заказ на сервер
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

  // Настраиваем лоадер
  let loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hide");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 3000);
});
