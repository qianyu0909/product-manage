'use strict';

module.exports = {
  success(data, message) {
    return {
      code: 200,
      data,
      message: message || '操作成功',
    };
  },
  error(message) {
    return {
      code: 500,
      message: message || '操作失败',
    };
  },
  auth(message) {
    return {
      code: 401,
      message: message || '没有权限',
    };
  },
};
