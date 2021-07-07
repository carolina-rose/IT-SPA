import $ from "jquery";

export const shoppingCartSummary = () => {
  const fragment = $('<div id="shoppingCartSummary"></div>');
  const title = $(`<p class="shopping">Podsumowanie koszyka:</p>`);
  fragment.prepend(title);

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  };

  const roomsList = getCookie("reservationList");
  const treatmentsList = getCookie("treatmentsList");

  if (!roomsList && !treatmentsList) {
    let empty = $('<p class"shopping">Twój koszyk jest pusty.</p>');
    fragment.append(empty);
  } else if (roomsList && treatmentsList) {
    JSON.parse(roomsList).map(object => {
      let shopping = $(`
          <div class="shopping">
            <p class="shoppingCart"> - ${object.roomName} (${object.price} PLN)</p>
          </div>
            `);

      fragment.append(shopping);
    });

    JSON.parse(treatmentsList).map(object => {
      let shopping1 = $(`
            <div class="shopping>
              <p class="shoppingCart"> - x${object.amount} ${object.treatmentName} (${object.price} PLN)</p>
            </div> 
              `);

      fragment.append(shopping1);
    });
  } else {
    if (roomsList) {
      JSON.parse(roomsList).map(object => {
        let shopping = $(`
            <div class="shopping">
              <p class="shoppingCart"> - ${object.roomName} (${object.price} PLN)</p>
            </div>
              `);

        fragment.append(shopping);
      });
    } else {
      JSON.parse(treatmentsList).map(object => {
        let shopping1 = $(`
              <div class"shopping">
                <p class="shoppingCart"> - x${object.amount} ${object.treatmentName} (${object.price} PLN)</p>
              </div>
                `);

        fragment.append(shopping1);
      });
    }
  }
  return fragment;
};
