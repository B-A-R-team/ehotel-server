import moment from 'moment';

moment.locale('zh-cn');

/**
 * 日期格式化
 * @param {Date} date 日期
 * @param {Boolean} friendly 是否转为距离现在时间
 * @returns {Date} 格式化后的日期
 */
export function formatDate(date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }
}
