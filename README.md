# LazyLoader

## Use

```
const identifyer = '.lazy';

const lazyLoader = new LazyLoad({
  selector: identifyer,
  DOMElementList: [...document.querySelectorAll( identifyer )]
});

lazyLoader.setScrollSpy();
lazyLoader.loadItem();

``` 

## attrs:

#### data-srcset
#### data-sizes
#### data-src
#### data-alt

## Example

```
<figure 
  class="lazy"
  data-srcset="some sorcset..."
  data-sizes="(max-width: 380px) 320px, (max-width: 480px) 414px..."
  data-src="some src..."
  data-alt="some alt...">
  <!-- IMG -->
</figure>
```
