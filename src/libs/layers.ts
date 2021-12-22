import findLast from 'lodash/findLast';
import { DOMWindow } from 'jsdom';

enum LayerType {
  dropdown = 'dropdown',
  modal = 'modal'
}

type Trigger = Element | null;

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Layer = {
  type: LayerType;
  // TODO убрать опциональность element и метод
  // addElement, после перепила vue модалки
  // сейчас, в виду особенности реализации, у нее нет element'a
  // до начала показа
  element?: Element;
  trigger: Trigger;
  id: string;
  parentId: string | null;
  hide: (a: Event | void) => void | boolean;
};

type RawLayer = PartialBy<Omit<Layer, 'type'>, 'parentId' | 'trigger'>;

const CLASS_NO_SCROLL = 'no-scroll';
const IGNORE_OUTSIDE_CLICK_ATTR = 'data-ignore-outside-click';

export class Layers {
  constructor(window: DOMWindow, root: Element | void) {
    this.$document = window.document.documentElement;
    this.window = window;
    this.root = root || this.$document;

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.addHandeKeyboard(window.document);
    this.addHandleClick();
  }

  private lastClickedElement: Element | undefined = undefined;
  private $document: Element;
  private root: Element;
  private window: DOMWindow;
  private stack: Array<Layer> = [];
  private needAddClass = true;

  private get length() {
    return this.stack.length;
  }

  private get lastModal() {
    return findLast(this.stack, ({ type }) => type === LayerType.modal);
  }

  private get lastLayer(): Layer | undefined {
    return this.stack[this.length - 1];
  }

  private addHandleClick() {
    this.root.addEventListener('click', this.handleClick, {
      capture: true
    });
    this.root.addEventListener('mousedown', this.handleMouseDown);
    this.root.addEventListener('mouseup', this.handleMouseUp);
  }

  private removeHandleClick() {
    this.tempTarget = undefined;
    this.dragged = false;
    this.root.removeEventListener('click', this.handleClick, {
      capture: true
    });
    this.root.removeEventListener('mousedown', this.handleMouseDown);
    this.root.removeEventListener('mouseup', this.handleMouseUp);
  }

  private dragged = false;
  private tempTarget: Element | undefined;
  private handleMouseDown(e: Event) {
    this.dragged = false;
    if (e.target instanceof this.window.Element) {
      this.tempTarget = e.target;
    }
  }

  private handleMouseUp(e: Event) {
    if (this.tempTarget !== e.target) {
      this.dragged = true;
    }
  }

  private handleClick({ target }: Event) {
    if (!(target instanceof this.window.Element)) {
      return;
    }

    if (target.closest(`[${IGNORE_OUTSIDE_CLICK_ATTR}]`)) {
      return;
    }

    this.lastClickedElement = target;

    if (!this.lastLayer) return;
    if (this.dragged) return;

    const outsideClick =
      (this.lastLayer.element?.contains(this.lastClickedElement) ?? false) === false;

    // Приоритетно обрабатываем flow через add
    setTimeout(() => {
      if (!this.lastClickedElement || !this.lastLayer) {
        return;
      }

      if (outsideClick) {
        this.removeLast();
      }
    });
  }

  private addHandeKeyboard(document: Document) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Holly crap.. we have ESC-handling logic in modal-next component
        // (close confirmation logic)
        const lastLayer = this.lastLayer;
        if (!lastLayer?.element?.getAttribute('data-ignore-escape')) {
          this.remove(lastLayer);
        }
      }
    });
  }

  private hideModal(modal: Layer | undefined) {
    // TODO
    // Когда полностью перейдем на backbone, можно эту логику спрятать
    // во vue modal
    modal?.element?.classList.add('g-hidden');
  }

  private showModal(modal: Layer | undefined) {
    modal?.element?.classList.remove('g-hidden');
  }

  private removeFromStack(item: Layer) {
    const index = this.stack.indexOf(item);
    if (item && index > -1) {
      this.stack.splice(index, 1);
    }
  }

  private validateLastClicked() {
    if (!this.lastClickedElement) {
      return;
    }
    if (!this.root.contains(this.lastClickedElement)) {
      this.lastClickedElement = undefined;
    }
  }

  private returnTrigger(rawTrigger: Trigger | undefined): Trigger {
    if (rawTrigger) {
      return rawTrigger;
    }
    this.validateLastClicked();

    if (this.lastClickedElement) {
      return this.lastClickedElement;
    }

    return this.lastLayer?.element ?? null;
  }

  private makeLayer(config: RawLayer, type: LayerType): Layer {
    const { trigger: rawTrigger, parentId } = config;

    const trigger = this.returnTrigger(rawTrigger);

    return {
      ...config,
      type,
      trigger,
      parentId: parentId || this.findParentId(trigger)
    };
  }

  private toggleNoScroll(toggle: boolean) {
    this.$document.classList.toggle(CLASS_NO_SCROLL, toggle);
  }

  private removeOutsideLayers(item: Layer): boolean {
    let outsideParent: Layer | null = null;
    for (let index = this.length - 1; index >= 0; index -= 1) {
      const oldLayer = this.stack[index];
      if (item.parentId === oldLayer.id) {
        break;
      }

      outsideParent = oldLayer;
    }
    if (!outsideParent) {
      return true;
    }

    return this.removeById(outsideParent.id);
  }

  private findParentId(trigger: Trigger) {
    return (
      this.stack
        .slice()
        .reverse()
        .find((layer) => layer.element?.contains(trigger))?.id ?? null
    );
  }

  private add(item: Layer): Layer | false {
    this.lastClickedElement = undefined;

    if (this.has(item.id)) {
      return false;
    }

    if (!this.removeOutsideLayers(item)) {
      return false;
    }

    if (this.needAddClass && item.type === LayerType.modal) {
      this.toggleNoScroll(true);
    }

    if (item.type === LayerType.modal) {
      this.hideModal(this.lastModal);
    }

    this.stack.push(item);

    return item;
  }

  private remove(item: Layer | void, event: Event | void) {
    if (!item) {
      return true;
    }
    this.lastClickedElement = undefined;

    const closed = item.hide(event);
    if (closed === false) {
      return false;
    }

    if (event) {
      event.stopPropagation();
    }

    this.removeFromStack(item);

    this.showModal(this.lastModal);

    this.toggleNoScroll(Boolean(this.lastModal));

    return true;
  }

  private getById(id: string): Layer | undefined {
    return this.stack.find((layer) => layer.id === id);
  }

  public removeLast(event: Event | void) {
    return this.remove(this.lastLayer, event);
  }

  public removeById(id: string, event: Event | void) {
    const index = this.stack.findIndex((el) => el.id === id);
    if (index === -1) {
      return false;
    }

    const layer = this.stack[index];

    if (this.lastLayer === layer) {
      return this.remove(layer, event);
    }

    const removeStack = this.stack.slice(index).reverse();

    let i = 0;
    while (i !== removeStack.length && this.removeById(removeStack[i].id)) {
      i += 1;
    }

    return i === removeStack.length;
  }

  public has(id: string): boolean {
    return Boolean(this.getById(id));
  }

  public addModal(config: RawLayer) {
    return this.add(this.makeLayer(config, LayerType.modal));
  }

  public addDropdown(config: RawLayer) {
    return this.add(this.makeLayer(config, LayerType.dropdown));
  }

  // TODO private
  public top() {
    return this.lastLayer;
  }

  /**
   * Event для backbone, не будет backbone, не нужен будет
   * @deprecated
   */
  public dismiss(event: Event | void): boolean {
    return this.removeLast(event);
  }

  // Для модалок, которые рендерется только после добавления
  public addElement(id: string, element: Element): boolean {
    const layer = this.getById(id);

    if (!layer) {
      return false;
    }

    layer.element = element;

    return true;
  }

  public clear(): boolean {
    while (this.removeLast() && this.length !== 0) {
      // условия хватает :-)
    }
    return this.length === 0;
  }

  public disableBodyClass() {
    this.needAddClass = false;
  }

  public changeRoot(root: Element) {
    this.removeHandleClick();
    this.root = root;
    this.addHandleClick();
  }

  public ignoreOutsideClick(node: Element, value: boolean | undefined) {
    const shouldIgnore = value ?? true;
    if (shouldIgnore) {
      node.setAttribute(IGNORE_OUTSIDE_CLICK_ATTR, 'true');
    } else {
      node.removeAttribute(IGNORE_OUTSIDE_CLICK_ATTR);
    }
  }
}

export default new Layers(window as any);
