exports.formatPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

exports.checkAdminMerchant = (user) => {
    return user.merchant_id !== null && user.group_id === 1;
};
