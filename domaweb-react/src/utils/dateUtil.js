import moment from 'moment';

const databaseTimeFomat = 'YYYY-MM-DDTHH:mm:ss';
const clockTime = 'HH:mm'; // The clock format for moment object
const dayTime = 'YYYY-MM-DD'; // The day tome format for moment object
const displayTime = 'DD.MM.YYYY';

// This returns the current time
export const startTime = () => moment().format(clockTime);

// This returns the current date
export const startDate = () => moment().format(dayTime);

// This return specifed date into day time format
export const getFormatedDate = date => moment(date).format(dayTime);

// This return specifed date into clockTime time format
export const getFormatedTime = date => moment(date).format(clockTime);

// To convert current time into databse time format
export const getTimeForDatabase = () => moment().format(databaseTimeFomat);

// To convert specified time into databse time format
export const convertTimeForDatabase = date => moment(date).format(databaseTimeFomat);

export const urlDate = date => moment(date).format(dayTime);

export const displayDate = (date) => {
  const momentDate = moment(date);
  return momentDate.isValid() ? momentDate.format(displayTime) : null;
};

export const currentDisplayDate = () => moment().format(displayTime);

export const getTimeDuration = (plannedStartTimeArg, plannedEndTimeArg) => {
  const plannedStartTime = moment(plannedStartTimeArg);
  const plannedEndTime = moment(plannedEndTimeArg);
  return plannedEndTime.diff(plannedStartTime, 'minutes');
};

export const getTimeDiff = (plannedStartTimeArg, plannedEndTimeArg) =>
  moment.duration(moment(plannedEndTimeArg).diff(plannedStartTimeArg));

export const addTime = (time, duration) =>
  moment(time).add(duration, 'hours').format(databaseTimeFomat);

export const getformatedTimeDuration = (plannedStartTime, plannedEndTime) => {
  const duration = getTimeDuration(plannedStartTime, plannedEndTime);
  const diffDuration = moment.duration(duration, 'minutes');
  const days = diffDuration.days();
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  const totalDays = days === 0 ? '' : (days > 1 ? `${days} days` : `${days} day`);
  const totalHours = hours === 0 ? '' : (hours > 1 ? `${hours} hours` : `${hours} hour`);
  const totalMinutes = minutes === 0 && hours === 0 ? '0 minutes' : (minutes > 1 ? `${minutes} minutes` : ``);

  return `${totalDays} ${totalHours} ${totalMinutes}`;
};

export const priceFormat = (price) => {
  if (price === 0) {
    return '0.00';
  } else if (price) {
    return price.toFixed(2);
  }
  return '-';
}
