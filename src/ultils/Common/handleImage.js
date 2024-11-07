import _ from 'lodash';

export const convertImage = (array) => {
    var temp = array.map((item) => item.response);
    return temp;
};
