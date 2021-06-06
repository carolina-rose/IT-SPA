import $ from "jquery";

export const home = () => {
  const fragment = $(document.createDocumentFragment());
  const background = $(`<div class="mainContainer"></div>`);

  fragment.append(background);
  return fragment;
};
