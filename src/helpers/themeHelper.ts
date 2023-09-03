const loadTheme = (theme: string) => {
  const mainElement = document.querySelector("html") as HTMLElement;
  if (theme === "light") {
    if (mainElement.classList.contains("dark")){
      mainElement.classList.remove("dark");
      mainElement.classList.add("light");
    }
  } else {
    mainElement.classList.add("dark");
    mainElement.classList.remove("light");
  }
};


export {loadTheme};