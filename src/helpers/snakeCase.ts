export function snakeCase(name: string) {
  return name.split(/(?=[A-Z])/)
  .join('-')
  .toLowerCase();
}
