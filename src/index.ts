const debounce = <F extends (...args: any[]) => any>(cb: F, waitFor: number): Promise<(...args: Parameters<F>) => ReturnType<F>> => {

  let timeout = 0;

  return new Promise((resolve) => (...args: Parameters<F>) => {

    clearTimeout(timeout);
    timeout = setTimeout(() => resolve(cb(...args)), waitFor);
  })
}

const inViewport = (element: HTMLElement): boolean => {

  const x = element.offsetWidth,
        y = element.offsetHeight,
        rect = element.getBoundingClientRect();
  
  return (
    rect.top >= -y 
    && rect.left >= -x
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth) + x
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + y
  );
}

const swapAttributes = (img: HTMLImageElement) => {
  
  for (const attr in img.dataset) {

    if (/src|srcset|sizes/.test(img.dataset[attr] as string)) {
      
      (img as {[key: string]: any})[attr] = img.dataset[attr];
      img.removeAttribute('data-' + attr);
    }
  }
}

const imageObserver = (nodeList: HTMLImageElement[]) => nodeList.forEach(img => {

  if (inViewport(img)) {

    swapAttributes(img);
  }
})

const checkNativeSupport = () => {

  const nodeList = Array.from(document.querySelectorAll('img')).filter(img => img.nodeName != 'NOSCRIPT');

  if ('loading' in HTMLImageElement.prototype) {
  
    nodeList.forEach(img => swapAttributes(img));
  } else {
  
    window.addEventListener('scroll', () => debounce(() => imageObserver(nodeList), 200), {capture: false, passive: true});
    
    imageObserver(nodeList);
  }
}

const LazyImage = async (): Promise<void> => await new Promise((resolve) => {
  
  if (!/complete|interactive|loaded/.test(document.readyState)) {

    window.addEventListener('DOMContentLoaded', () => resolve(checkNativeSupport()), false);

    return;
  }

  resolve(checkNativeSupport());
});

export default LazyImage();