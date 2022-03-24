export function dateFormatting(dateIso) {
  const date = new Date(dateIso);

  const YY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  const hh = date.getHours();
  const mm = date.getMinutes();

  return `${DD}‒${MM}‒${YY} ${hh}:${mm}`;
}