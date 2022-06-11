const byDate = (a, b) => {
  if (new Date(a.dateTimeGMT).valueOf() > new Date(b.dateTimeGMT).valueOf()) {
    return -1;
  } else if (
    new Date(b.dateTimeGMT).valueOf() > new Date(a.dateTimeGMT).valueOf()
  ) {
    return 1;
  } else {
    return 0;
  }
};

const byDateRev = (a, b) => {
  if (new Date(a.dateTimeGMT).valueOf() < new Date(b.dateTimeGMT).valueOf()) {
    return -1;
  } else if (
    new Date(b.dateTimeGMT).valueOf() < new Date(a.dateTimeGMT).valueOf()
  ) {
    return 1;
  } else {
    return 0;
  }
};

export { byDate, byDateRev };
