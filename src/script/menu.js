class Menu {
  /**
   * @type {boolean}
   */
  #isOpen = false;
  /**
   * @type {HTMLElement}
   */
  #buttonElement;
  /**
   * @type {HTMLElement}
   */
  #menuElement;

  constructor(buttonElement, menuElement) {
    this.#buttonElement = buttonElement;
    this.#menuElement = menuElement;
  }

  isOpen() {
    return this.#isOpen;
  }

  isClosed() {
    return !this.isOpen();
  }

  toggle() {
    if (this.#isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpen()) {
      return;
    }
    this.#isOpen = true;
    this.#refresh();
  }

  close() {
    if (this.isClosed()) {
      return;
    }
    this.#isOpen = false;
    this.#refresh();
  }

  #refresh() {
    this.#menuElement.setAttribute("aria-hidden", !this.isOpen() + '');
    this.#buttonElement.setAttribute("aria-expanded", "true");

    if (this.isOpen()) {
      document.addEventListener('click', this.#outClick);
    } else {
      document.removeEventListener('click', this.#outClick);
    }
  }

  #outClick = (event) => {
    if (!isChildOf(event.currentTarget, this.#buttonElement.parentElement)) {
      this.close();
    }
  }
}

let menu;

function onMenuButtonClick(menuId, event) {
  if (!menu) {
    menu = new Menu(event.currentTarget, document.getElementById(menuId));
  }

  menu.toggle();
  event.stopImmediatePropagation();
}

function isChildOf(e, parent) {
  let current = e;
  while(current) {
    if (current === parent) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}
