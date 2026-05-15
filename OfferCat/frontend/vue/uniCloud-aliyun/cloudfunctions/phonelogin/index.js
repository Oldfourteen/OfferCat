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
    const detail =
      (err && (err.errMsg || err.message || err.msg)) ||
      (typeof err === 'string' ? err : '');
    const code = err && (err.code || err.errCode) ? String(err.code || err.errCode) : '';
    const suffix = [code, detail].filter(Boolean).join(' ');
    const readableMsg = suffix ? `获取手机号失败：${suffix}` : '获取手机号失败';

    console.error('phonelogin getPhoneNumber failed', {
      code,
      detail,
      err
    });

    return {
      code: -1,
      msg: readableMsg,
      err: err
    };
  }
};
