import { render } from '../render.js';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import NoPointsView from '../view/no-points-view';

export default class MainPresenter {
  #containerListElement = null;
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(containerListElement) {
    this.#containerListElement = containerListElement;
  }

  init(pointsData, destinationsData, offersData) {
    this.#points = [...pointsData.points];
    this.#offers = offersData;
    this.#destinations = destinationsData;
    const tripSectionElement = document.querySelector('.trip-events');
    if (this.#points.length === 0) {
      render(new NoPointsView(), tripSectionElement);
    } else {
      render(new SortView(), tripSectionElement);
      render(this.#containerListElement, tripSectionElement);

      for (const point of this.#points) {
        this.#renderPoint(point);
      }
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(
      point,
      this.#offers,
      this.#destinations
    );
    const pointEditComponent = new EditPointView(
      point,
      this.#offers,
      this.#destinations
    );

    const replacePointToEditForm = () => {
      this.#containerListElement.element.replaceChild(
        pointEditComponent.element,
        pointComponent.element
      );
    };

    const replaceEditFormToPoint = () => {
      this.#containerListElement.element.replaceChild(
        pointComponent.element,
        pointEditComponent.element
      );
    };

    const onEscKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', (e) => {
        e.preventDefault();
        replacePointToEditForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', (e) => {
        e.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent.element
      .querySelector('form')
      .addEventListener('submit', (e) => {
        e.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    render(pointComponent, this.#containerListElement.element);
  };
}
