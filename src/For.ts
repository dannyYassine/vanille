import { render } from './jsx';
import { View } from './View';

export class AppFor extends View<{
  items: any[];
  key?: string;
  template: (item: any, index: number) => any;
}> {
  private markersByKey: Map<string, [Comment, Comment]> = new Map();
  private itemsByKey: Map<string, any> = new Map();

  connectedCallback() {
    if (!this.props?.items) return;

    const { items } = this.props;
    items.subscribe((newItems, oldItems) => {
      this.updateList(newItems, oldItems);
    });

    this.updateList(items.get(), []);
  }

  private getItemKey(item: any, index: number): string {
    return `item-${this.props?.key ? item[this.props.key] : index}`;
  }

  private shouldUpdateItem(item: any, oldItem: any): boolean {
    // Deep equality check for objects, simple equality for primitives
    if (typeof item !== 'object' || item === null) {
      return item !== oldItem;
    }
    return JSON.stringify(item) !== JSON.stringify(oldItem);
  }

  private updateList(newItems: any[], oldItems: any[]) {
    const newItemsByKey = new Map();
    const processedKeys = new Set();

    // First pass: Update existing items and create new ones
    newItems.forEach((item, index) => {
      const key = this.getItemKey(item, index);
      newItemsByKey.set(key, item);
      processedKeys.add(key);

      if (!this.markersByKey.has(key)) {
        // Create new item with markers
        this.createNewItem(item, key, index);
      } else {
        // Update item only if it changed
        const oldItem = this.itemsByKey.get(key);
        if (this.shouldUpdateItem(item, oldItem)) {
          this.updateExistingItem(item, key, index);
        }
      }
    });

    // Second pass: Remove items that no longer exist
    for (const [key, markers] of this.markersByKey.entries()) {
      if (!processedKeys.has(key)) {
        this.removeItem(key);
      }
    }

    // Update our cache of items
    this.itemsByKey = newItemsByKey;
  }

  private createNewItem(item: any, key: string, index: number) {
    const startComment = document.createComment(`for-${key}`);
    const endComment = document.createComment(`/for-${key}`);
    this.markersByKey.set(key, [startComment, endComment]);

    this.shadowRoot.appendChild(startComment);

    if (this.props.template) {
      const template = this.props.template(item, index);
      const element = render(template, document);
      this.shadowRoot.appendChild(element);
    } else {
      this.shadowRoot.appendChild(document.createTextNode(String(item)));
    }

    this.shadowRoot.appendChild(endComment);
  }

  private updateExistingItem(item: any, key: string, index: number) {
    const [startMarker, endMarker] = this.markersByKey.get(key)!;
    const range = new Range();
    range.setStartAfter(startMarker);
    range.setEndBefore(endMarker);
    range.deleteContents();

    if (this.props.template) {
      const template = this.props.template(item, index);
      const element = render(template, document);
      range.insertNode(element);
    } else {
      range.insertNode(document.createTextNode(String(item)));
    }
  }

  private removeItem(key: string) {
    const [start, end] = this.markersByKey.get(key)!;
    const range = new Range();
    range.setStartBefore(start);
    range.setEndAfter(end);
    range.deleteContents();
    this.markersByKey.delete(key);
    this.itemsByKey.delete(key);
  }
}
