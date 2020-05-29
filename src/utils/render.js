export const RenderPosition = {
  BEFORE: `before`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFORE:
      container.before(component.getElement());
      break;
    default:
      container.append(component.getElement());
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const replace = (oldComponent, newComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  /* Проверяет, что все три элемента существуют */
  const isExistElements = !!(parentElement && newElement && oldElement);

  /* Если родительский элемент содержит в себе заменяемый элемент, элементы заменяются */
  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

