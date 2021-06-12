export default function exceedCharName(): string {
  let name = '';
  for (let index = 0; index < 130; index += 1) {
    name += 'i';
  }
  return name;
}
