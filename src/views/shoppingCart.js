import $ from "jquery";

export const shoppingCart = () => {
  const fragment = $('<div id="shoppingCartView"></div>');
  const title = $(`<h1>Twój koszyk</h1>`);
  fragment.prepend(title);

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return JSON.parse(
        parts
          .pop()
          .split(";")
          .shift()
      );
  };

  const setCookie = (cookieName, cookieObject, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${cookieObject}; ${expires}`;
  };

  const roomsList = getCookie("reservationList");
  const treatmentsList = getCookie("treatmentsList");

  if ((!roomsList && !treatmentsList) || (roomsList === '[]' && treatmentsList === '[]') || (!roomsList && treatmentsList === '[]') || (!treatmentsList && roomsList === '[]')) {
    let empty = $('<p id="empty">Twój koszyk jest pusty.</p>');
    fragment.append(empty);
  } else if (roomsList && treatmentsList) {
    roomsList.map((object) => {
      let room = $(`
        <div class="shopping">
        <p class="shoppingCart">Pokój: ${object.roomName}</p>
        <p class="shoppingCart">Data przyjazdu: ${object.arrivalDate}</p>
        <p class="shoppingCart">Data wyjazdu: ${object.leavingDate}</p>
        <p class="shoppingCart">Liczba gości: ${object.guests}</p>
        <p>Cena: ${object.price} PLN</p>
        <button class="remove" data-name="${object.roomName}">X</button>
        </div>
          `);

      fragment.append(room);

      room.click(function(e) {
        if (e.target && e.target.classList.contains("remove")) {
          room.remove();

          const filteredArray = getCookie("reservationList").filter(function(value) {
            return (
              value.roomName !== object.roomName ||
              value.arrivalDate !== object.arrivalDate ||
              value.leavingDate !== object.leavingDate
            );
          });
          setCookie("reservationList", JSON.stringify(filteredArray), 365);
        }
      });
    });

    treatmentsList.map(object => {
      let treatment = $(`
          <div class="shopping">
          <p class="shoppingCart">Zabieg: ${object.treatmentName}</p>
          <div>
          <button class="plus">+</button>
          <p class="amount-${object.id}">Ilość: ${object.amount}</p>
          <button class="minus">-</button>
          </div>
          <p>Cena: ${object.price} PLN</p>
          <button class="remove">X</button>
          </div>
            `);

      fragment.append(treatment);

      treatment.click(function(e) {
        if (e.target && e.target.classList.contains("remove")) {
          treatment.remove();

          const filteredArray = getCookie("treatmentsList").filter(function(
            value
          ) {
            return value.treatmentName !== object.treatmentName;
          });

          setCookie("treatmentsList", JSON.stringify(filteredArray), 365);
        }
      });

      treatment.click(function(e) {
        if (e.target && e.target.classList.contains("plus")) {
          const addedArray = getCookie("treatmentsList").map(function(value) {
            if (value.treatmentName === object.treatmentName) {
              value.amount += 1;
              $(`.amount-${object.id}`).text('Ilość: ' + value.amount);
            }

            return value;
          });

          setCookie("treatmentsList", JSON.stringify(addedArray), 365);
        }
      });

      treatment.click(function(e) {
        if (e.target && e.target.classList.contains("minus")) {
          console.log();
          const minusArray = getCookie("treatmentsList").map(function(value) {
            if (value.treatmentName === object.treatmentName) {
              if(value.amount !== 1) {
                value.amount -= 1;
                $(`.amount-${object.id}`).text('Ilość: ' + value.amount);
              }
            }

            return value;
          });

          setCookie("treatmentsList", JSON.stringify(minusArray), 365);
        }
      });
    });
  } else {
    if (roomsList) {
      roomsList.map(object => {
        let room = $(`
          <div class="shopping">
          <p class="shoppingCart">Pokój: ${object.roomName}</p>
          <p class="shoppingCart">Data przyjazdu: ${object.arrivalDate}</p>
          <p class="shoppingCart">Data wyjazdu: ${object.leavingDate}</p>
          <p class="shoppingCart">Liczba gości: ${object.guests}</p>
          <p>Cena: ${object.price} PLN</p>
          <button class="remove">X</button>
          </div>
            `);

        fragment.append(room);

        room.click(function(e) {
          if (e.target && e.target.classList.contains("remove")) {
            room.remove();

            const filteredArray = getCookie("reservationList").filter(function(
              value
            ) {
              return (
                value.roomName !== object.roomName ||
                value.arrivalDate !== object.arrivalDate ||
                value.leavingDate !== object.leavingDate
              );
            });
            setCookie("reservationList", JSON.stringify(filteredArray), 365);
          }
        });
      });
    } else {
      treatmentsList.map(object => {
        let treatment = $(`
        <div class="shopping">
          <p class="shoppingCart">Zabieg: ${object.treatmentName}</p>
          <div>
          <button class="plus">+</button>
          <p class="amount-${object.id}">Ilość: ${object.amount}</p>
          <button class="minus">-</button>
          </div>
          <p>Cena: ${object.price} PLN</p>
          <button class="remove">X</button>
          </div>
          `);

        fragment.append(treatment);

        treatment.click(function(e) {
          if (e.target && e.target.classList.contains("remove")) {
            treatment.remove();

            const filteredArray = getCookie("treatmentsList").filter(function(
              value
            ) {
              return value.treatmentName !== object.treatmentName;
            });
            setCookie("treatmentsList", JSON.stringify(filteredArray), 365);
          }
        })

          treatment.click(function(e) {
            if (e.target && e.target.classList.contains("plus")) {
              console.log();
              const addedArray = getCookie("treatmentsList").map(function(
                value
              ) {
                if (value.treatmentName === object.treatmentName) {
                  value.amount += 1;
                  $(`.amount-${object.id}`).text('Ilość: ' + value.amount);
                }

                return value;
              });

              setCookie("treatmentsList", JSON.stringify(addedArray), 365);
            }
          });

          treatment.click(function(e) {
            if (e.target && e.target.classList.contains("minus")) {
              console.log();
              const minusArray = getCookie("treatmentsList").map(function(value) {
                if (value.treatmentName === object.treatmentName) {
                  value.amount -= 1;
                  $(`.amount-${object.id}`).text('Ilość: ' + value.amount);
                }
    
                return value;
              });
    
              setCookie("treatmentsList", JSON.stringify(minusArray), 365);
            }
          });

        });

      };
    }
    return fragment;
  }



