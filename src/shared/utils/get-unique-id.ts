import {getRandomNumber} from 'shared/utils/get-random-number';

export const getUniqueId = () => {
    return `${Date.now()}_${getRandomNumber()}`;
};
