export function DateTransformer(value) {
  if(!value) return;

  let strDate = value.replace(/\./g, "-").replace(/\Z/,"");
  return new Date(strDate);
}