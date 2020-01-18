import LazyLoad, {ILazyLoad} from '../index'

describe('LazyLoader Init', () => {

  const props = {
    DOMElemenntList: [],
    selector: '.lazy',
  };

  const instance = new LazyLoad(props);

  test('setScrollSpy to be called once and scrollspy property to be defined', () => {
    const scrollSpy = jest.spyOn(LazyLoad.prototype, 'setScrollSpy');

    instance.setScrollSpy();

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(instance.scrollSpy).toBeDefined();
  })

  test('Expect instance to have selector and NodeList on instanciation', () => {

    expect(instance.selector).toBeDefined();
    expect(instance.DOMElementList).toBeDefined();
  })
});
