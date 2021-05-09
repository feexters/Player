import moment from 'moment';

export default function timeAgo(date: number) {
  const currentDate = moment();

  const diff = moment.duration(currentDate.diff(moment(date)));

  // Years
  let dateAgo = diff.years();
  if (dateAgo) {
    if (dateAgo > 1) {
      return `${dateAgo} years`;
    }
    return `${dateAgo} year`;
  }

  // Months
  dateAgo = diff.months();
  if (dateAgo) {
    if (dateAgo > 1) {
      return `${dateAgo} months`;
    }
    return `${dateAgo} month`;
  }

  // Hours
  dateAgo = diff.days();
  if (dateAgo) {
    if (dateAgo > 1) {
      return `${dateAgo} days`;
    }
    return `${dateAgo} day`;
  }

  //Hours
  dateAgo = diff.hours();
  if (dateAgo) {
    if (dateAgo > 1) {
      return `${dateAgo} hours`;
    }
    return `${dateAgo} hour`;
  }

  //Minutes
  dateAgo = diff.minutes();
  if (dateAgo) {
    if (dateAgo > 1) {
      return `${dateAgo} minutes`;
    }
    return `${dateAgo} minute`;
  }

  //Seconds
  dateAgo = diff.seconds();
  if (dateAgo > 1) {
    return `${dateAgo} seconds`;
  }
  return `${dateAgo} second`;
}
