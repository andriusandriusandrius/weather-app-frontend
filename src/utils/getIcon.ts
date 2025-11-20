export function getIcon(name: string | undefined) {
  if (!name) return "";
  return new URL(`../assets/weather/${name}.svg`, import.meta.url).href;
}
