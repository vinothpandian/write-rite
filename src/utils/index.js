export const validateEmail = (email) => {
  let errorMessage;

  if (!email) {
    errorMessage = 'Required';
  }

  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail = re.test(String(email).toLowerCase());

  if (!isEmail) {
    errorMessage = 'Invalid email address';
  }

  return errorMessage;
};

export const validateField = (value) => {
  let errorMessage;

  if (!value) {
    errorMessage = 'Required';
  }
  return errorMessage;
};
