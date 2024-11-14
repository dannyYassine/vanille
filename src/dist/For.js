"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const jsx_1 = require("./jsx");
const View_1 = require("./View");
const ViewMode_1 = require("./ViewMode");
class For extends View_1.View {
    markersByKey = new Map();
    itemsByKey = new Map();
    constructor() {
        super(ViewMode_1.ViewMode.OPEN);
    }
    connectedCallback() {
        if (!this.props?.items)
            return;
        const { items } = this.props;
        items.subscribe((newItems, oldItems) => {
            this.updateList(newItems, oldItems);
        });
        this.updateList(items.get(), []);
    }
    getItemKey(item, index) {
        return `item-${this.props?.key ? item[this.props.key] : index}`;
    }
    shouldUpdateItem(item, oldItem) {
        // Deep equality check for objects, simple equality for primitives
        if (typeof item !== 'object' || item === null) {
            return item !== oldItem;
        }
        return JSON.stringify(item) !== JSON.stringify(oldItem);
    }
    updateList(newItems, oldItems) {
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
            }
            else {
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
    createNewItem(item, key, index) {
        const startComment = document.createComment(`for-${key}`);
        const endComment = document.createComment(`/for-${key}`);
        this.markersByKey.set(key, [startComment, endComment]);
        this.root.appendChild(startComment);
        if (this.props.template) {
            const template = this.props.template(item, index);
            const element = (0, jsx_1.render)(template);
            this.root.appendChild(element);
        }
        else {
            this.root.appendChild(document.createTextNode(String(item)));
        }
        this.root.appendChild(endComment);
    }
    updateExistingItem(item, key, index) {
        const [startMarker, endMarker] = this.markersByKey.get(key);
        const range = new Range();
        range.setStartAfter(startMarker);
        range.setEndBefore(endMarker);
        range.deleteContents();
        if (this.props.template) {
            const template = this.props.template(item, index);
            const element = (0, jsx_1.render)(template);
            range.insertNode(element);
        }
        else {
            range.insertNode(document.createTextNode(String(item)));
        }
    }
    removeItem(key) {
        const [start, end] = this.markersByKey.get(key);
        const range = new Range();
        range.setStartBefore(start);
        range.setEndAfter(end);
        range.deleteContents();
        this.markersByKey.delete(key);
        this.itemsByKey.delete(key);
    }
}
exports.For = For;
customElements.define('v-for', For);
//# sourceMappingURL=For.js.map