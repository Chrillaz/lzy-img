export interface ILazyLoad {
  debounceTimeout?: boolean;
  readonly DOMElementList: Element[];
  scrollSpy?: () => void;
  readonly selector: string;
 }
 
 export default class LazyLoad implements ILazyLoad {
   public debounceTimeout: boolean = false;
 
   public readonly DOMElementList: Element[] = [];
   
   public scrollSpy!: () => void;
 
   public readonly selector!: string;
 
   constructor(init?: Partial<ILazyLoad>) {
     Object.assign(this, { ...init });
   }
 
   public setScrollSpy(): void {
     window.addEventListener('scroll', (this.scrollSpy = this.loadItem.bind(this)), { capture: false, passive: true });
   }
 
   public loadItem() {
    if (!this.debounceTimeout) {
      this.debounceTimeout = !this.debounceTimeout;
      setTimeout(() => (this.debounceTimeout = !this.debounceTimeout), 300);
    }
 
    if (document.querySelectorAll(this.selector).length <= 0) {
      return window.removeEventListener('scroll', this.scrollSpy);
    }
 
    if (this.DOMElementList) {
      [...this.DOMElementList].forEach((item: Element) => {
      const measures = window.getComputedStyle(item);
      const x = measures.getPropertyValue('width');
      const y = measures.getPropertyValue('height');
 
        if (this.inViewport(item, parseInt(x, 10), parseInt(y, 10))) {
          return this.createElement(this.selector, item);
        }
      });
    }
   }
 
   private inViewport(item: Element, x: number, y: number): boolean {
     const bounding = item.getBoundingClientRect();
     return (
       bounding.bottom <= (window.innerHeight + y || document.documentElement.clientHeight + y) &&
       bounding.right <= (window.innerWidth + x || document.documentElement.clientWidth + x)
     );
   }
 
   private createElement(id: string | boolean, item: Element): Element | undefined {
     if (![...item.children].find(child => child.tagName === 'IMG')) {
       const img: HTMLImageElement = document.createElement('img');
 
       if (item.getAttribute('data-srcset')) {
         img.srcset = item.getAttribute('data-srcset') as string;
         item.removeAttribute('data-srcset');
       }
 
       if (item.getAttribute('data-sizes')) {
         img.sizes = item.getAttribute('data-sizes') as string;
         item.removeAttribute('data-sizes');
       }
 
       if (item.getAttribute('data-src')) {
         img.src = item.getAttribute('data-src') as string;
       }
 
       if (item.getAttribute('data-alt')) {
         img.alt = item.getAttribute('data-alt') as string;
       }
 
       item.classList.remove((id as string).replace('.', ''));
 
       return item.appendChild(img);
     }
   }
 }
 