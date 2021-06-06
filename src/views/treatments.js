import $ from "jquery";

export const treatments = () => {
  const fragment = $('<div id="treatmentsView"></div>');
  const title = $(`<h1>Nasze zabiegi</h1>`);
  const section = $(`<section>Ładowanie...</section>`);

  fetch("http://localhost:3000/treatments", {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(arr => {
      const articles = arr.map(treatment => {
        const { id, name, price } = treatment;

        const button = $(`<button>Wyświetl szczegóły</button>`);
        button.on("click", e => {
          e.preventDefault();

          const navigationEvent = new CustomEvent("navigation", {
            detail: {
              view: "treatments-details",
              treatmentId: id
            }
          });
          document.dispatchEvent(navigationEvent);
        });

        const article = $(`
                        <article>
                        <p>${name}<p>
                        <p>${price} PLN</p>
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
