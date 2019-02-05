import moment from 'moment';

export function getTimeDate(ts: number): string {
  const now = moment();
  const momentTs = moment(ts);
  if (moment.duration(now.diff(momentTs)) < moment.duration(60 * 60 * 24 * 1000)) {
    return momentTs.fromNow();
  }
  return momentTs.format('MMMM Do YYYY');
}
