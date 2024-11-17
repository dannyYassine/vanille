export function isPrimitive(child: any): boolean {
    return ['string', 'number'].includes(typeof child);
}