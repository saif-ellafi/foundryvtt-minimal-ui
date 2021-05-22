export const rootStyle = document.querySelector(':root').style;

export const debouncedReload = debounce(() => window.location.reload(), 100);