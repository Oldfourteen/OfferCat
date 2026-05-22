exports.main = async (event, context) => {
  const { access_token, openid } = event;
  
  try {
    if (!access_token) {
      return {
        code: 50001,
        msg: 'Parameter access_token is required'
      };
    }

    const res = await uniCloud.getPhoneNumber({
      provider: 'univerify',
      appid: context.APPID,
      access_token: access_token,
      openid: openid
    });

    if (res.code !== 0) {
      return {
        code: res.code,
        msg: res.message || res.msg || res.errMsg || '获取手机号失败',
        err: res
      };
    }

    return {
      code: 0,
      phone: res.phoneNumber || res.phone
    };
  } catch (err) {
    const detail =
      (err && (err.errMsg || err.message || err.msg)) ||
      (typeof err === 'string' ? err : JSON.stringify(err));
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
