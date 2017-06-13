export function formatIdr(nums) {
    return 'Rp' + ' ' + parseInt(nums, 10).toFixed(0).replace(/./g, function convert(c, i, a) {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c;
    });
}

const normalizeIdr = (value) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    return formatIdr(onlyNums);
};


export default normalizeIdr;
