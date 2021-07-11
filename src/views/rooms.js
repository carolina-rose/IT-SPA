import $ from "jquery";

export const rooms = () => {
  const fragment = $('<div id="roomView"</div>');
  const title = $(`<h1>Nasze pokoje</h1>`);
  const section = $(`<section>Ładowanie...</section>`);

  fetch("https://jakis-backend-hehexd.herokuapp.com/rooms")
    .then(resp => resp.json())
    .then(arr => {
      const articles = arr.map(room => {
        const { id, name, beds, guests, price } = room;

        const button = $(`<button>Wyświetl szczegóły</button>`);
        button.on("click", e => {
          e.preventDefault();

          const navigationEvent = new CustomEvent("navigation", {
            detail: {
              view: "rooms-details",
              roomId: id
            }
          });
          document.dispatchEvent(navigationEvent);
        });

        let img;

        switch (id) {
          case 1:
            img = `${require("../../static/unarny.jpg")}`;
            break;

          case 2:
            img = `${require("../../static/binarny.jpg")}`;
            break;

          case 3:
            img = `${require("../../static/trojkowy.jpg")}`;
            break;

          default:
            img = `${require("../../static/czworkowy.jpg")}`;
        }

        const article = $(`
          <article>
            <h2>${name}</h2>
            <img src="${img}"/>
            <p>${guests}-osobowy (ilość łóżek: ${beds})</p>
            <p>cena: ${price} PLN</p>
          </article>
        `);
        article.append(button);

        return article;
      });

      section.empty().append(articles);
    })
    .catch(err => console.log(err));

  fragment.append(title, section);
  return fragment;
};
