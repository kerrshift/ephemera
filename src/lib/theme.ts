export const THEME_KEY = "ephemera-theme";

/** Runs before first paint (inlined in the layout's <head>) so a saved theme never flashes. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
