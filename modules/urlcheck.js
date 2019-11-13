module.exports.urlcheck = link => {
  const regex = /([http://]|[https://])(([www.]?[a-zA-Zа-яёА-ЯЁ0-9]{1,}\.[a-zA-Zа-яёА-ЯЁ0-9]{2,})|(([1-2]?[0-5]{1,2}\.){3}[1-2]?[0-5]{1,2}))(:\d{2,5})?([0-9a-zA-Z/])*#?$/;

  return regex.test(link);
};
