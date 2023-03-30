import { createElement } from '../render.js';

const createTripTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

export default class TripView {
  #element = null

  get template() {
    return createTripTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
