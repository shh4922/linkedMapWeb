import moment from 'moment'

export const forrmatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
}
