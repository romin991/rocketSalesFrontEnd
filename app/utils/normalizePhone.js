const normalizePhone = (value) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');

    if (onlyNums.length <= 4) {
        return onlyNums;
    }
    if (onlyNums.length > 4 && onlyNums.length <= 7) {
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 7);
    }
    if (onlyNums.length > 7 && onlyNums.length <= 10) {
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 10);
    }
    if (onlyNums.length > 10 && onlyNums.length <= 13) {
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 10) + '-' + onlyNums.slice(10, 13);
    }
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 10) + '-' + onlyNums.slice(10, 13) + '-' + onlyNums.slice(13, 16);
};

export default normalizePhone;
