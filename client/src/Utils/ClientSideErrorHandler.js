const ErrorHandlingForClientSideError = (result, seterrors, fieldArr) => {
  fieldArr.forEach((val) => {
    if (result?.message[val]) {
      seterrors((prev) => {
        return { ...prev, [val]: result.message[val].msg };
      });
    }
  });
};
export { ErrorHandlingForClientSideError };
