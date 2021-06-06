import $ from "jquery";

export const header = () => {
  return $(`
        <header>
            <span class="logo">
            <span id="logotitle"> Coding SPA </span>
                <i class="fas fa-spa"></i>
                </span>
            <nav></nav>
        </header>
    `);
};
