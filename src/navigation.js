import $ from "jquery";
import { shoppingCartSummary } from "./views/details-views/shoppingCart-summary";

function callback(view) {
  return function(event) {
    event.preventDefault();

    const navigationEvent = new CustomEvent("navigation", {
      detail: {
        view: view
      }
    });
    document.dispatchEvent(navigationEvent);
  };
}

export const navigation = () => {
  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  };

  const nav = $("nav");

  const homeButton = $('<button type="button">Strona Główna</button>');
  homeButton.on("click", callback("home"));

  const homeButton2 = $(".logo");
  homeButton2.on("click", callback("home"));

  const aboutButton = $('<button type="button">O nas</button>');
  aboutButton.on("click", callback("about"));

  const roomsButton = $('<button type="button">Pokoje</button>');
  roomsButton.on("click", callback("rooms"));

  const treatmentsButton = $('<button type="button">Zabiegi</button>');
  treatmentsButton.on("click", callback("treatments"));

  const loginButton = $('<button type="button">Zaloguj</button>');
  loginButton.on("click", callback("login"));

  const logoutButton = $('<button type="button">Wyloguj</button>');
  const isLogged = getCookie("isLogged");

  const shoppingCartSummaryButton = $(
    '<button type="button" class="fas fa-shopping-basket"></button>'
  );

  logoutButton.on("click", () => {
    document.cookie = "isLogged= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    $("header").after('<div class="alert-info">Wylogowano</div>');
    location.reload();
  });

  shoppingCartSummaryButton.on("click", callback("shoppingCart"));
  shoppingCartSummaryButton.hover(
    () => nav.append(shoppingCartSummary()),
    () => $("#shoppingCartSummary").remove()
  );

  nav.append(
    homeButton,
    aboutButton,
    roomsButton,
    treatmentsButton,
    loginButton,
    shoppingCartSummaryButton
  );

  if (isLogged) {
    loginButton.replaceWith(logoutButton);
  }

  return nav;
};
