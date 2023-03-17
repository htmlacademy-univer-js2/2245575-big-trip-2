import dayjs from 'dayjs';

import {
  HOUR_MINUTES_COUNT,
  TOTAL_DAY_MINUTES_COUNT,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from './constants';

export const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDate = (date) => dayjs(date).format(DATE_FORMAT);

export const getTime = (date) => dayjs(date).format(TIME_FORMAT);

export const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

export const humanizePointDueDate = (date) => dayjs(date).format('DD MMM');

export const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor(
    (difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT
  );
  const restMinutes =
    difference -
    (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = days ? `${days}D` : '';
  const hoursOutput = restHours ? `${restHours}H` : '';
  const minutesOutput = restMinutes ? `${restMinutes}M` : '';

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};
