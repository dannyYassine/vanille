export function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match: string, index: number) {
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace('-', '');
}
