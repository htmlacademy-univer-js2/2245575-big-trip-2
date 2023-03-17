import { getRandomNumber } from '../utils.js';
import dayjs from 'dayjs';
import {
  POINT_TYPES,
  DESTINATION_NAMES,
  DESCRIPTIONS,
  ELEMENTS_COUNT,
  PRICE,
  PICTURE_NUMBER,
} from '../constants';

const generateDescription = () => {
  let description = '';
  for (
    let i = 0;
    i < getRandomNumber(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX);
    i++
  ) {
    description += ` ${
      DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)]
    }`;
  }
  return description.trim();
};

const generatePicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomNumber(
    PICTURE_NUMBER.MIN,
    PICTURE_NUMBER.MAX
  )}`,
  description: generateDescription(),
});

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: DESTINATION_NAMES[id],
  pictures: Array.from(
    { length: getRandomNumber(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX) },
    generatePicture
  ),
});

const getDestinations = () =>
  Array.from({ length: DESTINATION_NAMES.length }).map((value, index) =>
    generateDestination(index)
  );

const generateOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`,
  price: getRandomNumber(PRICE.MIN, PRICE.MAX),
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({
    length: getRandomNumber(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX),
  }).map((value, index) => generateOffer(index + 1, pointType)),
});

const getOffersByType = () =>
  Array.from({ length: POINT_TYPES.length }).map((value, index) =>
    generateOffersByType(POINT_TYPES[index])
  );

export const destinations = getDestinations();
export const offers = getOffersByType();

export const generatePoint = (pointId) => {
  const offersByTypePoint = offers[getRandomNumber(0, offers.length - 1)];
  const offerIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRandomNumber(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs()
      .add(getRandomNumber(-3, 0), 'day')
      .add(getRandomNumber(-2, 0), 'hour')
      .add(getRandomNumber(-59, 0), 'minute'),
    dateTo: dayjs()
      .add(getRandomNumber(0, 2), 'hour')
      .add(getRandomNumber(0, 59), 'minute'),
    destinationId: destinations[getRandomNumber(0, destinations.length - 1)].id,
    id: pointId,
    isFavorite: Boolean(getRandomNumber()),
    offerIds: Array.from({
      length: getRandomNumber(0, offerIdsByTypePoint.length),
    }).map(
      () =>
        offerIdsByTypePoint[getRandomNumber(0, offerIdsByTypePoint.length - 1)]
    ),
    type: offersByTypePoint.type,
  };
};
