/* eslint no-useless-escape:0 */
import { message } from 'antd';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

/**
 * 表单验证
 * @param props 组件的props
 * @param save 验证通过后的处理，需优化
 * @return {void | * | undefined}
 */
export const validateForm = (props, save) => {
  return props.form.validateFields(
    (error, values) => {
      if (error) {
        message.error(error[Object.keys(error)[0]].errors[0].message)
      } else {
        save(values);
      }
    },
  );
}
