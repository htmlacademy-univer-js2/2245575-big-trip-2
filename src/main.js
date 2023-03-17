import MainPresenter from './presenters/main-presenter';
import { render } from './render';
import MenuView from './view/menu-view.js';
import FiltersView from './view/filters-view.js';
import TripView from './view/trip-view';
import Points from './model/points';
import { destinations, offers } from './mock/points';

const navigationContainerElement = document.querySelector(
  '.trip-controls__navigation'
);
const filtersContainerElement = document.querySelector(
  '.trip-controls__filters'
);
const tripContainerElement = new TripView();
const points = new Points();

render(new MenuView(), navigationContainerElement);
render(new FiltersView(), filtersContainerElement);

const mainPresenter = new MainPresenter(tripContainerElement);

mainPresenter.init(points, destinations, offers);
