import { render } from '../render.js';
import EditPointView from '../view/edit-point-view';
import NewPointView from '../view/new-point-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';

export default class MainPresenter {
  constructor(containerListElement) {
    this.containerListElement = containerListElement;
  }

  init() {
    const tripSectionElement = document.querySelector('.trip-events');
    render(new SortView(), tripSectionElement);
    render(this.containerListElement, tripSectionElement);

    render(new NewPointView(), this.containerListElement.getElement());
    render(new EditPointView(), this.containerListElement.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.containerListElement.getElement());
    }
  }
}
