const THEMES = {
  light: {
    className: 'light',
    backgroundColor: 'white',
    fontColor: 'black',
  },
  dark: {
    className: 'dark',
    backgroundColor: 'black',
    fontColor: 'white',
  },
};

localStorage.setItem('THEMES', JSON.stringify(THEMES));

export default THEMES;
