export const stringToArray = (string = '') => {
  return string.replace(/ /g, '').split(',');
};

export const mergeArrays = (...arrays) => {
  arrays = arrays.filter(a => a !== undefined);
  return Array.from(new Set([].concat(...arrays)));
};

export const pickProps = (object, ...props) => (
  props.reduce((a, x) => {
    if (object.hasOwnProperty(x)) a[x] = object[x];
    return a;
  }, {})
);

export const omitProps = (object, ...props) => {
  const no = {...object};
  props.forEach(p => delete no[p]);
  return no;
};

export const isEmpty = (object = {}) => (
  object.constructor === Object && Object.keys(object).length === 0
);
