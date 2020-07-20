import { formatDate } from '../common/tools';

/**
 * 格式化日期
 * @param {Object} schema 模型
 */
export default function (schema) {
  schema.methods.create_at_ago = function () {
    return formatDate(this.create_at, true);
  };

  schema.methods.update_at_ago = function () {
    return formatDate(this.update_at, true);
  };
}
