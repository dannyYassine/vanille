export class Vanille {
    styles: string = '';
    directives = {};

    setStyles(styles: string): void {
        this.styles = styles;
    }

    setDirective(name, value) {
        this[name] = value;
    }

    getDirective(name) {
        return this[name];
    }

    getStyles(): string {
        return this.styles;
    }
}

export default new Vanille();