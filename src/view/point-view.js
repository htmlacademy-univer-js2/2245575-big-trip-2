import { createElement } from '../render.js';
import {
  humanizePointDueDate,
  getDuration,
  getDate,
  getTime,
} from '../utils.js';

const renderOffers = (offers, checkedOffers) => {
  let result = '';
  offers.forEach((offer) => {
    if (checkedOffers.includes(offer.id)) {
      result = `${result}<li class="event__offer"><span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span></li>`;
    }
  });
  return result;
};

const createPointTemplate = (point, offers, destinations) => {
  const {
    basePrice,
    type,
    destinationId,
    isFavorite,
    dateFrom,
    dateTo,
    offerIds,
  } = point;
  const eventDuration = getDuration(dateFrom, dateTo);
  const startDate = dateFrom !== null ? humanizePointDueDate(dateFrom) : '';
  const endDate = dateTo !== null ? humanizePointDueDate(dateTo) : '';
  const pointTypeOffers = offers.find((offer) => offer.type === type);

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDate(dateFrom)}">${startDate}</time>
        <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
      </div>
      <h3 class="event__title">${type} ${destinations[destinationId].name}</h3>
      <div class="event__schedule">
        <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${startDate === endDate ? getTime(dateFrom) : startDate}</time>&mdash;
        <time class="event__end-time" datetime="${dateTo}">${startDate === endDate ? getTime(dateTo) : endDate}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderOffers(pointTypeOffers.offers, offerIds)}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      </div>
    </li>`;
};

export default class PointView {
  #point = null;
  #offers = null;
  #destinations = null;
  #element = null;

  constructor(pointData, offers, destinations) {
    this.#point = pointData;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
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
