import $ from "jquery";
import { home } from "../views/home";
import { about } from "../views/about";
import { rooms } from "../views/rooms";
import { treatments } from "../views/treatments";
import { login } from "../views/login";
import { shoppingCart } from "../views/shoppingCart";
import { roomsDetails } from "../views/details-views/rooms-details";
import { treatmentsDetails } from "../views/details-views/treatments-details";

export const main = () => {
  const mainElement = $("<main></main>");
  mainElement.append(home());

  document.addEventListener("navigation", event => {
    const detail = event.detail;

    switch (detail.view) {
      case "home":
        mainElement.empty().append(home());

        break;
      case "about":
        mainElement.empty().append(about());

        break;
      case "rooms":
        mainElement.empty().append(rooms());

        break;
      case "treatments":
        mainElement.empty().append(treatments());

        break;
      case "login":
        mainElement.empty().append(login());

        break;
      case "shoppingCart":
        mainElement.empty().append(shoppingCart());

        break;
      case "rooms-details":
        const roomId = detail.roomId;
        mainElement.empty().append(roomsDetails(roomId));

        break;
      case "treatments-details":
        const treatmentId = detail.treatmentId;
        mainElement.empty().append(treatmentsDetails(treatmentId));
        
        break;

      default:
        const oops = $("<h2>Ooooops</h2>");
        mainElement.empty().append(oops);
    }
  });
  return mainElement;
};
