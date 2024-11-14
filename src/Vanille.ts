export class Vanille {
    styles: string = '';

    setStyles(styles: string): void {
        this.styles = styles;
    }

    getStyles(): string {
        return this.styles;
    }
}

export default new Vanille();