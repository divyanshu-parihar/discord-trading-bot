function handleError(func) {
  try {
    func();
  } catch (e) {
    return Error(e);
  }
}

module.exports = handleError;
