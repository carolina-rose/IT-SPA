import $ from "jquery";

export const roomsDetails = roomId => {
  const section = $(`<section id="roomsDetailsView">Ładowanie...</section>`);
  let now = new Date();
  let date = now.toISOString().split("T")[0];

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts
        .pop()
        .split(";")
        .shift();
    } else {
      return undefined;
    }
  };

  const setCookie = (cookieObject, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `reservationList=${cookieObject}; ${expires}`;
  };

  fetch(`http://localhost:3000/rooms/${roomId}`)
    .then(response => response.json())
    .then(room => {
      const { id, name, beds, guests, price, description } = room;

      let img;

      if (id === 1) {
        img = `${require("../../../static/unarny.jpg")}`;
      } else if (id === 2) {
        img = `${require("../../../static/binarny.jpg")}`;
      } else if (id === 3) {
        img = `${require("../../../static/trojkowy.jpg")}`;
      } else {
        img = `${require("../../../static/czworkowy.jpg")}`;
      }

      section.empty().append(
        $(`<h2>${name}</h2>`),
        $(`<img src="${img}"/>`),
        $(`<p><strong>Łóżka</strong> ${beds} | <strong>Goście</strong> ${guests}</p>`),
        $(`<p>${description}</p>`),
        $(`<p><strong>${price} PLN</strong></p>`),
        $("<i>Zarezerwuj pokój</i>"),
        $(`<form id="room">
        <label for="arrival-date">Data przyjazdu:</label>
        <input type="date" required name="arrival-date" id="arrival-date" min="${date}"></input>
        <label for="leaving-date">Data wyjazdu:</label>
        <input type="date" required name="leaving-date" id="leaving-date"></input>
        <label for="guests">Liczba gości:</label>
        <input type="number" required name="guests" id="guests" min="1"></input>
        <button type="submit" class="reserve">Zarezerwuj</button>
        </form>`)
      );

      $("#arrival-date").change(() => {
        $("#leaving-date").val("");

        let year = parseFloat($("#arrival-date").val().slice(0, 4)) + 1;
        let maxDate = year + $("#arrival-date").val().slice(4);

        $("#leaving-date").attr("max", `${maxDate}`);

        let minDate = $("#arrival-date").val();
        $("#leaving-date").attr("min", `${minDate}`);
      });

      $("#room").submit(e => {
        e.preventDefault();

        let formObject = {
          id,
          roomName: name,
          arrivalDate: $("#arrival-date").val(),
          leavingDate: $("#leaving-date").val(),
          guests: $("#guests").val(),
          price
        };

        let cookieArray = [formObject];

        if (getCookie("reservationList") === undefined) {
          setCookie(JSON.stringify(cookieArray), 365);
          section.before(
            '<div class="alert alert-success">Dodano do koszyka!</div>'
          );
        } else if (getCookie("reservationList").includes(formObject.roomName && formObject.arrivalDate)) {
          section.before(
            '<div class="alert alert-fail">Pokój w tym terminie jest już w koszyku</div>'
          );
        } else {
          let cookie = JSON.parse(getCookie("reservationList"));
          let newCookie = cookie.concat(formObject);
          setCookie(JSON.stringify(newCookie), 365);
          section.before(
            '<div class="alert alert-success">Dodano do koszyka!</div>'
          );
        }

        setTimeout(() => {
          $(".alert").remove();
        }, 1500);
        
      });
    })
    .catch(err => console.log(err));

  return section;
};
