const MODE = 'devlopment';
// const MODE = 'production';
const PRODUCTION_PREFIX = 'https://www.jevescript.com/liuyinshe/api';
const DEVELOPMENT_PREFIX = 'http://localhost:3000/api';
const VERSION = 'V0.0.1';
const PRODUCTION_APPID = 6;
const PREFIX =  ( MODE === 'production' ) ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;
export default {
  MODE: MODE,
  version: VERSION,
  wxlogin: `${PREFIX}/miniprogram/wxlogin`,
  wxbind: `${PREFIX}/miniprogram/wxbind`,
  class: (user_id) => `${PREFIX}/miniprogram/user/${user_id}/class`,

  classItem: (user_id, class_id) => `${PREFIX}/miniprogram/user/${user_id}/class/${class_id}`,
  leaveApply: (id) => `${PREFIX}/miniprogram/user-lesson/${id}/leave-apply`,
  courseAll: `${PREFIX}/course`,
}