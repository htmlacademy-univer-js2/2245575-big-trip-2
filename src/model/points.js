import { generatePoint } from '../mock/points';

export default class Points {
  #points = []

  constructor() {
    this.#points = Array.from({ length: 10 }).map((value, index) =>
      generatePoint(index + 1)
    );
  }

  get points() {
    return this.#points;
  }
}
