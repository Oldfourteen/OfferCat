/**
 * 获取招聘赛季文本
 * @param {Date} [date=new Date()] - 可选日期，默认为当前日期
 * @returns {string} - “春招” 或 “秋招”
 */
export function getRecruitmentSeason(date = new Date()) {
  // `getMonth` 返回 0-11，这里转成自然月份后判断春招/秋招。
  const month = date.getMonth() + 1;
  if (month >= 2 && month <= 8) {
    return '春招';
  }
  return '秋招';
}

/**
 * 获取当前年份
 * @param {Date} [date=new Date()] - 可选日期，默认为当前日期
 * @returns {number}
 */
export function getCurrentYear(date = new Date()) {
  return date.getFullYear();
}
