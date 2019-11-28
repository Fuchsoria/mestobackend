const checkErrorStatus = (err) => (err.message.includes('|') ? err.message.split('|')[0] : err.status || 500);
const checkErrorMessage = (err) => (err.message.includes('|') ? err.message.split('|')[1] : err.message || err);

module.exports = { checkErrorStatus, checkErrorMessage };
