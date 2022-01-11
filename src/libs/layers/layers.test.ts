import { JSDOM, DOMWindow } from 'jsdom';
import { Layers } from './layers';

jest.useFakeTimers();

describe('Layers', () => {
  let document: Document;
  let window: DOMWindow;
  let layers: Layers;
  beforeEach(() => {
    window = createWindow();
    document = window.document;
    layers = new Layers(window);
  });
  it('add modal', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');

    expect(
      layers.addModal({
        id: '1',
        hide() {},
        parentId: null,
        element,
        trigger
      })
    ).toBeTruthy();

    expect(document.documentElement.className).toBe('no-scroll');
    expect(element.className).not.toBe('g-hidden');
  });
  it('has layer', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');

    layers.addModal({
      id: '1',
      hide() {},
      parentId: null,
      element,
      trigger
    });
    expect(layers.has('1')).toBeTruthy();
  });
  it('don`t has item', () => {
    expect(layers.has('1')).toBeFalsy();
  });
  it('add modal without no scroll class', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');
    layers.disableBodyClass();
    layers.addModal({
      id: '1',
      hide() {},
      parentId: null,
      element,
      trigger
    });

    expect(document.documentElement.className).not.toBe('no-scroll');
  });
  it('remove modal', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');
    const hide = jest.fn().mockReturnValue(true);

    layers.addModal({
      id: '1',
      hide,
      parentId: null,
      element,
      trigger
    });
    const event = new window.MouseEvent('click');
    const stopPropagation = jest.fn();
    event.stopPropagation = stopPropagation;

    expect(layers.removeById('1', event)).toBeTruthy();
    expect(stopPropagation.mock.calls).toHaveLength(1);
    expect(hide.mock.calls).toHaveLength(1);
    expect(document.documentElement.className).not.toBe('no-scroll');
  });
  it('when add second modal, first hidden', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');

    layers.addModal({
      id: '1',
      hide() {},
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');

    layers.addModal({
      id: '2',
      hide() {},
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    expect(firstElement.className).toBe('g-hidden');
  });
  it('when can`t add second modal, first stay show', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');

    layers.addModal({
      id: '1',
      hide() {},
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    const secondHide = jest.fn().mockReturnValue(false);

    layers.addDropdown({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');

    expect(
      layers.addDropdown({
        id: '3',
        hide() {},
        parentId: '1',
        element: thirdElement,
        trigger: thirdTrigger
      })
    ).toBeFalsy();

    expect(secondHide.mock.calls).toHaveLength(1);
    expect(firstElement.className).not.toBe('g-hidden');
  });
  it('when remove second modal, first shown', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');

    layers.addModal({
      id: '1',
      hide() {},
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');

    layers.addModal({
      id: '2',
      hide() {},
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    layers.removeById('2');

    expect(firstElement.className).not.toBe('g-hidden');
  });
  it('add dropdown', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');

    expect(
      layers.addDropdown({
        id: '1',
        hide() {},
        parentId: '1',
        element,
        trigger
      })
    ).toBeTruthy();
  });
  it('remove item when don`t possible', () => {
    const element = document.createElement('div');
    const trigger = document.createElement('div');
    const hide = jest.fn().mockReturnValue(false);
    layers.addModal({
      id: '1',
      hide,
      parentId: null,
      element,
      trigger
    });

    expect(layers.removeById('1')).toBeFalsy();
  });

  it('remove last item', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const hide = jest.fn();
    layers.addDropdown({
      id: '1',
      hide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');

    layers.addModal({
      id: '2',
      hide() {},
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });
    expect(layers.removeLast()).toBeTruthy();
    expect(hide.mock.calls).toHaveLength(0);
  });
  it('remove all items', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const hide = jest.fn();

    layers.addModal({
      id: '1',
      hide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');

    layers.addModal({
      id: '2',
      hide() {},
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    expect(layers.clear()).toBeTruthy();
    expect(hide.mock.calls).toHaveLength(1);
  });
  it('remove all items when dont`t can in the middle', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addModal({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    const secondHide = jest.fn().mockReturnValue(false);

    layers.addModal({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');
    const thirdHide = jest.fn();

    layers.addModal({
      id: '3',
      hide: thirdHide,
      parentId: '2',
      element: thirdElement,
      trigger: thirdTrigger
    });

    expect(layers.clear()).toBeFalsy();
    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
    expect(thirdHide.mock.calls).toHaveLength(1);
  });
  it('remove last when Escape key is pressed', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addModal({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    const secondHide = jest.fn();
    layers.addModal({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    dispatchEscape(window);

    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('remove item from middle stack', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addModal({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    const secondHide = jest.fn();
    layers.addModal({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');
    const thirdHide = jest.fn();

    layers.addModal({
      id: '3',
      hide: thirdHide,
      parentId: '2',
      element: thirdElement,
      trigger: thirdTrigger
    });

    layers.removeById('2');

    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
    expect(thirdHide.mock.calls).toHaveLength(1);
  });
  it('remove item when add new one to middle stack by parentId', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addModal({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    const secondHide = jest.fn();
    layers.addModal({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');
    const thirdHide = jest.fn();

    expect(
      layers.addModal({
        id: '3',
        hide: thirdHide,
        parentId: '1',
        element: thirdElement,
        trigger: thirdTrigger
      })
    ).toBeTruthy();

    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('remove item when add new one to middle stack by elements', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondTrigger = document.createElement('div');
    firstElement.appendChild(secondTrigger);

    const secondHide = jest.fn();
    layers.addDropdown({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secondTrigger
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');
    firstElement.appendChild(thirdTrigger);
    const thirdHide = jest.fn();

    expect(
      layers.addDropdown({
        id: '3',
        hide: thirdHide,
        element: thirdElement,
        trigger: thirdTrigger
      })
    ).toBeTruthy();

    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('set parentId and trigger for modal if he open after click in exist layer', () => {
    const firstElement = document.createElement('div');
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secontdTrigger = document.createElement('div');
    firstElement.appendChild(secontdTrigger);
    const secondElement = document.createElement('div');
    const secondHide = jest.fn();
    dispatchClick(secontdTrigger, window);

    const layer = layers.addModal({
      id: '3',
      hide: secondHide,
      element: secondElement
    });
    jest.runAllTimers();
    // Для ts'a, возможно стоит поменять возвращаемый тип
    if (!layer) {
      throw new Error('layer not added');
    }
    expect(layer.parentId).toBe('1');
    expect(layer.trigger === secontdTrigger).toBeTruthy();

    expect(firstHide.mock.calls).toHaveLength(0);
  });
  it('can`t add if don`t close outside items', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secontdTrigger = document.createElement('div');
    const secondElement = document.createElement('div');
    const secondHide = jest.fn().mockReturnValue(false);

    layers.addModal({
      id: '2',
      parentId: '1',
      hide: secondHide,
      trigger: secontdTrigger,
      element: secondElement
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');

    expect(
      layers.addDropdown({
        id: '3',
        hide() {},
        parentId: null,
        element: thirdElement,
        trigger: thirdTrigger
      })
    ).toBeFalsy();

    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('add outside item', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secontdTrigger = document.createElement('div');
    const secondElement = document.createElement('div');
    const secondHide = jest.fn();

    layers.addModal({
      id: '2',
      parentId: '1',
      hide: secondHide,
      trigger: secontdTrigger,
      element: secondElement
    });

    const thirdElement = document.createElement('div');
    const thirdTrigger = document.createElement('div');

    expect(
      layers.addDropdown({
        id: '3',
        hide() {},
        parentId: null,
        element: thirdElement,
        trigger: thirdTrigger
      })
    ).toBeTruthy();

    expect(firstHide.mock.calls).toHaveLength(1);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('set parentId for modal if he open after some action in last layer', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondHide = jest.fn();

    const layer = layers.addModal({
      id: '3',
      hide: secondHide,
      element: secondElement
    });
    // Для ts'a, возможно стоит поменять возвращаемый тип
    if (!layer) {
      throw new Error('layer not added');
    }
    expect(layer.parentId).toBe('1');
    expect(layer.trigger === firstElement).toBeTruthy();

    expect(firstHide.mock.calls).toHaveLength(0);
  });
  it('not set parentId for modal if he open after some action with empty stack', () => {
    const firstElement = document.createElement('div');
    const firstHide = jest.fn();

    const layer = layers.addModal({
      id: '1',
      hide: firstHide,
      element: firstElement
    });
    // Для ts'a, возможно стоит поменять возвращаемый тип
    if (!layer) {
      throw new Error('layer not added');
    }

    expect(layer.parentId).toBeNull();
    expect(layer.trigger).toBeNull();
  });
  it('don`t set parentId and trigger for modal if he open after click outside exist layer', () => {
    const firstElement = document.createElement('div');
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secontdTrigger = document.createElement('div');
    document.body.appendChild(secontdTrigger);
    const secondElement = document.createElement('div');
    const secondHide = jest.fn();
    dispatchClick(secontdTrigger, window);

    const layer = layers.addModal({
      id: '3',
      hide: secondHide,
      element: secondElement
    });
    // Для ts'a, возможно стоит поменять возвращаемый тип
    if (!layer) {
      throw new Error('layer not added');
    }
    expect(layer.parentId).toBeNull();
    expect(layer.trigger === secontdTrigger).toBeTruthy();
    expect(firstHide.mock.calls).toHaveLength(1);
  });
  // "E2E"
  it('remove only last item if click outside', () => {
    const firstElement = document.createElement('div');
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const triggerElement = document.createElement('div');
    document.body.appendChild(triggerElement);

    const secontdTrigger = document.createElement('div');
    const secondElement = document.createElement('div');
    const secondHide = jest.fn();

    layers.addDropdown({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement,
      trigger: secontdTrigger
    });
    dispatchClick(triggerElement, window);
    jest.runAllTimers();
    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(1);
  });
  it('add modale from closed dropdown', () => {
    const shadowDropdown = document.createElement('div');
    const firstElement = document.createElement('div');
    firstElement.appendChild(shadowDropdown);
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    const secondElement = document.createElement('div');
    const secondHide = jest.fn();
    dispatchMousedown(shadowDropdown, window);
    dispatchMouseup(shadowDropdown, window);
    dispatchClick(shadowDropdown, window);
    shadowDropdown.remove();
    const layer = layers.addModal({
      id: '2',
      hide: secondHide,
      parentId: '1',
      element: secondElement
    });
    if (!layer) {
      throw new Error('layer not added');
    }

    jest.runAllTimers();

    expect(Object.is(layer.trigger, firstElement)).toBeTruthy();
    expect(firstHide.mock.calls).toHaveLength(0);
    expect(secondHide.mock.calls).toHaveLength(0);
  });

  it('click to don`t exist element inside layer before when check outside', () => {
    const shadowDropdown = document.createElement('div');
    const firstElement = document.createElement('div');
    firstElement.appendChild(shadowDropdown);
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    dispatchMousedown(shadowDropdown, window);
    dispatchMouseup(shadowDropdown, window);
    dispatchClick(shadowDropdown, window);
    shadowDropdown.remove();

    jest.runAllTimers();

    expect(firstHide.mock.calls).toHaveLength(0);
  });

  it('click to default root don`t trigger outside after change root', () => {
    const newRoot = document.createElement('div');
    const someElement = document.createElement('div');

    const element = document.createElement('div');
    const trigger = document.createElement('div');
    const firstHide = jest.fn();

    newRoot.appendChild(trigger);
    newRoot.appendChild(element);

    document.body.appendChild(newRoot);
    document.body.appendChild(someElement);

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element,
      trigger
    });

    layers.changeRoot(newRoot);

    dispatchMousedown(someElement, window);
    dispatchMouseup(someElement, window);
    dispatchClick(someElement, window);

    jest.runAllTimers();

    expect(firstHide.mock.calls).toHaveLength(0);
  });

  it('click outside before added element', () => {
    const shadowDropdown = document.createElement('div');
    const firstElement = document.createElement('div');
    firstElement.appendChild(shadowDropdown);
    document.body.appendChild(firstElement);
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      trigger: firstTrigger
    });

    dispatchClick(shadowDropdown, window);
    shadowDropdown.remove();

    jest.runAllTimers();

    expect(firstHide.mock.calls).toHaveLength(1);
  });

  it('don`t add same id item', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement,
      trigger: firstTrigger
    });

    expect(
      layers.addDropdown({
        id: '1',
        hide: firstHide,
        parentId: null,
        element: firstElement,
        trigger: firstTrigger
      })
    ).toBeFalsy();
  });
  it('add item trigger when empty stack', () => {
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    document.body.appendChild(firstTrigger);
    const firstHide = jest.fn();

    dispatchClick(firstTrigger, window);
    jest.runAllTimers();

    const layer = layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement
    });

    if (!layer) {
      throw new Error('layer not added');
    }

    expect(Object.is(layer.trigger, firstTrigger));
  });
  it('don`t trigger outside click if was drag', () => {
    const outside = document.createElement('div');
    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement
    });

    document.body.appendChild(firstTrigger);
    document.body.appendChild(outside);

    dispatchMousedown(firstTrigger, window);
    dispatchMouseup(outside, window);
    dispatchClick(firstTrigger, window);
    jest.runAllTimers();

    expect(firstHide.mock.calls).toHaveLength(0);
  });

  it('don`t trigger outside click if has ignore data atribute', () => {
    const outsideContainer = document.createElement('div');
    outsideContainer.dataset.ignoreOutsideClick = '';

    const outside = document.createElement('div');
    outsideContainer.appendChild(outside);

    const firstElement = document.createElement('div');
    const firstTrigger = document.createElement('div');
    const firstHide = jest.fn();

    layers.addDropdown({
      id: '1',
      hide: firstHide,
      parentId: null,
      element: firstElement
    });

    document.body.appendChild(firstTrigger);
    document.body.appendChild(outsideContainer);

    dispatchClick(outside, window);
    jest.runAllTimers();

    expect(firstHide.mock.calls).toHaveLength(0);
  });

  it('add element for exist layer', () => {
    const firstElement = document.createElement('div');
    const firstHide = jest.fn();

    const layer = layers.addModal({
      id: '1',
      hide: firstHide,
      parentId: null
    });

    if (!layer) {
      throw new Error('layer not added');
    }

    expect(layers.addElement('1', firstElement)).toBeTruthy();
    expect(Object.is(layer.element, firstElement)).toBeTruthy();
  });
  it('don`t add element for exist element', () => {
    const firstElement = document.createElement('div');

    expect(layers.addElement('1', firstElement)).toBeFalsy();
  });
});

function createWindow() {
  const { window } = new JSDOM();
  return window;
}

function dispatchClick(element: HTMLElement, window: DOMWindow) {
  return element.dispatchEvent(
    new window.MouseEvent('click', {
      bubbles: true
    })
  );
}

function dispatchMousedown(element: HTMLElement, window: DOMWindow) {
  return element.dispatchEvent(
    new window.MouseEvent('mousedown', {
      bubbles: true
    })
  );
}

function dispatchMouseup(element: HTMLElement, window: DOMWindow) {
  return element.dispatchEvent(
    new window.MouseEvent('mouseup', {
      bubbles: true
    })
  );
}

function dispatchEscape(window: DOMWindow) {
  return window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));
}
