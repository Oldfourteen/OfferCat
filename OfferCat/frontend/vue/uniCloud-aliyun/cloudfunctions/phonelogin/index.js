exports.main = async (event, context) => {
  const { access_token } = event;
  
  try {
    const res = await uniCloud.getPhoneNumber({
      provider: 'univerify',
      access_token: access_token
    });

    return {
      code: 0,
      phone: res.phoneNumber
    };
  } catch (err) {
    return {
      code: -1,
      msg: '获取手机号失败',
      err: err
    };
  }
};
