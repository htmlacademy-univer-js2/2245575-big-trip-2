import { render } from '../render.js';
import EditPointView from '../view/edit-point-view';
import NewPointView from '../view/new-point-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';

export default class MainPresenter {
  constructor(containerListElement) {
    this.containerListElement = containerListElement;
  }

  init(pointsData, destinationsData, offersData) {
    const points = [...pointsData.getPoints()];
    const offers = offersData;
    const destinations = destinationsData;
    const tripSectionElement = document.querySelector('.trip-events');
    render(new SortView(), tripSectionElement);
    render(this.containerListElement, tripSectionElement);

    render(new NewPointView(), this.containerListElement.getElement());
    render(
      new EditPointView(points[0], offers, destinations),
      this.containerListElement.getElement()
    );

    for (const point of points) {
      render(
        new PointView(point, offers, destinations),
        this.containerListElement.getElement()
      );
    }
  }
}
