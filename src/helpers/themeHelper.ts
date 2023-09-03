const loadTheme = (theme: string) => {
  const mainElement = document.querySelector("html") as HTMLElement;
  if (theme === "light") {
    if (mainElement.classList.contains("dark"))
      mainElement.classList.remove("dark");
  } else {
    mainElement.classList.add("dark");
  }
};


export {loadTheme};