import $ from "jquery";

export const treatmentsDetails = treatmentId => {
  const section = $(
    `<section id="treatmentsDetailsView">Ładowanie...</section>`
  );

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
    document.cookie = `treatmentsList=${cookieObject}; ${expires}`;
  };

  fetch(`http://localhost:3000/treatments/${treatmentId}`)
    .then(resp => resp.json())
    .then(treatment => {
      const { id, name, area, time, price, amount } = treatment;

      section.empty().append(
        $(`<h2>${name}</h2>`),
        $(`<p><strong>Zabieg na:</strong> ${area} | <strong>Czas zabiegu:</strong> ${time} min</p>`),
        $(`<p><strong>${price} PLN</strong></p>`),
        $(`<form id="treatment">
                        <button type="submit">Dodaj do koszyka</button>
                        </form>`)
      );

      $("#treatment").submit(e => {
        e.preventDefault();

        let formObject = {
          id,
          treatmentName: name,
          price,
          amount
        };

        let cookieArray = [formObject];
        if (getCookie("treatmentsList") === undefined) {
          setCookie(JSON.stringify(cookieArray), 365);
          section.before(
            '<div class="alert alert-success">Dodano do koszyka!</div>'
          );
        } else if (getCookie("treatmentsList").includes(formObject.treatmentName)) {
          section.before('<div class="alert alert-fail">Zabieg jest już w koszyku</div>');
        } else {
          let cookie = JSON.parse(getCookie("treatmentsList"));
          let newCookie = cookie.concat(formObject);
          setCookie(JSON.stringify(newCookie), 365);
          section.before(
            '<div class="alert alert-success">Dodano do koszyka!</div>'
          );
        }

        setTimeout(() => {
          $(".alert").remove();
        }, 1000);
        
      });
    })
    .catch(err => console.log(err));

  return section;
};
