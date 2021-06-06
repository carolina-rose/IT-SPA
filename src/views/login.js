import $ from "jquery";

export const login = () => {
  const fragment = $('<div id="loginView"></div>');

  const setCookie = (cookieName, cookieObject, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${cookieObject}; ${expires}`;
  };

  const log = $(`
    <form id="log">
      <h3>Zaloguj się</h3>
      <div>
        <label for="e-mail"><b>E-mail:</b></label>
      </div>
      <div>
        <input type="email" required name="e-mail" id="logEmail">
      </div>
      <div>
        <label for="password"><b>Hasło:</b></label>
      </div>
      <div>
        <input type="password" name="password" id="logPassword" requried>
      </div>
      <div>
        <button type="submit" class="login">Zaloguj</button>
      </div>
    </form>
`);

  const register = $(`
    <form id="register">
      <h3>Nie masz konta? Zarejestruj się!</h3>
      <div>
        <label for="e-mail"><b>E-mail:</b></label>
      </div>
      <div>
        <input type="email" required name="e-mail" id="regEmail">
      </div>
      <div>
        <label for="password"><b>Hasło:</b></label>
      </div>
      <div>
        <input minlength="8" type="password" name="password" id="regPassword" requried>
      </div>
      <div>
        <label for="password"><b>Powtórz Hasło:</b></label>
        <input minlength="8" type="password" name="password" id="regPassword1" requried>
      </div>
      <div>
        <button type="submit" class="login">Utwórz konto</button>
      </div>
    </form>
    `);

  const img = $(`<img src=${require("../../static/login.jpg")} />`);

  log.submit(e => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(arr => {
        if (
          arr.find(
            element =>
              element.email === $("#logEmail").val() &&
              element.password === $("#logPassword").val()
          )
        ) {
          fragment.before('<div class="alert alert-success">Zalogowano!</div>');

          setCookie("isLogged", "1", 365);

          location.reload();
        } else {
          fragment.before(
            '<div class="alert alert-fail">Nieprawidłowe hasło lub adres e-mail</div>'
          );
        }

        setTimeout(() => {
          $(".alert").remove();
        }, 1500);
      })
      .catch(err => console.log(err));
  });

  register.submit(e => {
    e.preventDefault();
    const html = $(
      `<div class="alert alert-fail">Ten adres e-mail jest już zajęty<div/>`
    );
    fetch("http://localhost:3000/users", {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(array => {
        if (array.find(element => element.email === $("#regEmail").val())) {
          fragment.before(html);

          setTimeout(() => {
            $(".alert").remove();
          }, 2000);
        } else if ($("#regPassword").val() === $("#regPassword1").val()) {
          const formData = {
            email: $("#regEmail").val(),
            password: $("#regPassword").val()
          };
          const html = $(`<div class="alert alert-success">Dodano konto<div/>`);
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
            .then(resp => resp.json())
            .catch(err => console.log(err));

          fragment.before(html);

          setTimeout(() => {
            $(".alert").remove();
          }, 2000);

          location.reload();
        } else if ($("#regPassword").val() !== $("#regPassword1").val()) {
          const html = $(
            `<div class="alert alert-fail">Hasła różnią się<div/>`
          );
          fragment.before(html);

          setTimeout(() => {
            $(".alert").remove();
          }, 1000);
        }
      })
      .catch(err => console.log(err));
  });

  fragment.append(log, register, img);
  return fragment;
};
