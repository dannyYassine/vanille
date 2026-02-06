export function snakeCase(name: string): string {
  return name.split(/(?=[A-Z])/)
  .join('-')
  .toLowerCase();
}
