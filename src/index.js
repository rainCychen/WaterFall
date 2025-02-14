import './waterfall.less';
import { extend, C3Event, C3EventDispatcher, debounce } from './utils';

var _config = {
  minWidth: null,
  columns: null,
  width: null,
  gap: null,
  minGap: null,
  fullOneLine: false,
  itemSelector: null,
  scrollParent: window,
  loading: '<div class="water-fall-loading"><svg viewBox="0 0 50 50" class="loading"><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#000" stop-opacity="1.0" /><stop offset="90%" stop-color="#000" stop-opacity="0" /></linearGradient></defs><circle cx="25" cy="25" r="20" stroke-width="5" stroke="url(#linear)" fill="none" /></svg><div>'
};
//宽度单位支持 px % rem em
/* 
三种配置模式
1, {minWidth:"300px", gap:"10px"}
2, {columns:3, gap:"10px"}
3, {width:"300px", minGap:"10px"}
4, {width:"300px", gap:"10px"} 
*/
export function builder(container, options) {
  var INSTANCE = this;
  C3EventDispatcher.call(INSTANCE);
  var config = extend(_config, options);
  var scrollParent = config.scrollParent;
  if (typeof scrollParent == 'string') {
    scrollParent = document.querySelector(scrollParent);
  }
  INSTANCE.updateOptions = function (options) {
    config = extend(_config, options);
    var newScrollParent = config.scrollParent;
    if (typeof newScrollParent == 'string') {
      newScrollParent = document.querySelector(newScrollParent);
    }
    if (scrollParent != newScrollParent) {
      if (scrollParent != null) scrollParent.removeEventListener('scroll', debounceScorll);
      scrollParent = newScrollParent;
      if (scrollParent != null) scrollParent.addEventListener('scroll', debounceScorll);
    }
    INSTANCE.update();
  };
  if (container != document.body) {
    container.classList.add('water-fall-container');
  }
  function getPixel(value, contaierWidth, rootFontSize, contaierFontSize) {
    if (value == null) return 0;
    var group = /(^\d+(\.\d+)?)px$/i.exec(value);
    if (group) {
      return parseFloat(group[1]);
    }
    group = /(^\d+(\.\d+)?)%$/.exec(value);
    if (group) {
      return (contaierWidth * parseFloat(group[1])) / 100;
    }
    group = /(^\d+(\.\d+)?)rem$/i.exec(value);
    if (group) {
      return rootFontSize * parseFloat(group[1]);
    }
    group = /(^\d+(\.\d+)?)em$/i.exec(value);
    if (group) {
      return contaierFontSize * parseFloat(group[1]);
    }
    return parseFloat(value) == NaN ? 0 : parseFloat(value);
  }

  INSTANCE.measure = function (itemCount) {
    var contaierWidth = container.innerWidth || container.clientWidth;
    var rootFontSize = getComputedStyle(document.documentElement)['font-size'].replace(/px$/i, '');
    var contaierFontSize = getComputedStyle(container)['font-size'].replace(/px$/i, '');
    var columns = 0;
    var gap = 0;
    var vGap = 0;
    var itemWidth = 0;
    if (config.columns != null) {
      columns = config.columns;
      gap = getLocalPixel(config.gap);
      vGap = gap;
      itemWidth = (contaierWidth - gap * (columns - 1)) / columns;
    } else if (config.minWidth != null) {
      gap = getLocalPixel(config.gap);
      vGap = gap;
      columns = Math.floor((contaierWidth + gap) / (getLocalPixel(config.minWidth) + gap));
      if (config.fullOneLine && columns > itemCount) columns = itemCount;
      itemWidth = (contaierWidth - gap * (columns - 1)) / columns;
    } else if (config.width != null && config.gap !== null) {
      itemWidth = getLocalPixel(config.width);
      gap = getLocalPixel(config.gap);
      vGap = gap;
      columns = Math.floor((contaierWidth + gap) / (itemWidth + gap))
    } else if (config.width != null) {
      itemWidth = getLocalPixel(config.width);
      var minGap = getLocalPixel(config.minGap);
      vGap = minGap;
      columns = Math.floor((contaierWidth + minGap) / (itemWidth + minGap));
      gap = (contaierWidth - itemWidth * columns) / (columns - 1);
    }
    function getLocalPixel(value) {
      return getPixel(value, contaierWidth, rootFontSize, contaierFontSize);
    }
    return {
      contaierWidth: contaierWidth,
      columns: columns,
      itemWidth: itemWidth,
      gap: gap,
      vGap: vGap
    };
  };

  INSTANCE.update = function () {
    var childrens = config.itemSelector ? container.querySelectorAll(config.itemSelector) : container.children;
    var measureResult = INSTANCE.measure(childrens.length);
    var contaierWidth = measureResult.contaierWidth;
    var columns = measureResult.columns;
    var itemWidth = measureResult.itemWidth;
    var gap = measureResult.gap;
    var vGap = measureResult.vGap;

    var arr = [];
    if (columns == 0) return;
    for (var i = 0; i < columns; i++) {
      arr.push({
        top: topSpace,
        col: i
      });
    }
    maxHeight = 0;
    for (var i = 0; i < childrens.length; i++) {
      var item = childrens[i];
      if (item == topLoading || item == bottomLoading) continue;
      arr.sort(function (a, b) {
        if (a.top > b.top) return 1;
        else if (a.top < b.top) return -1;
        else {
          if (a.col > b.col) return 1;
          else if (a.col < b.col) return -1;
          else return 0;
        }
      });
      var left = arr[0].col == 0 ? 0 : arr[0].col * (itemWidth + gap);
      var top = arr[0].top;
      item.classList.add('water-fall-item');
      item.style.width = itemWidth + 'px';
      item.style.left = left + 'px';
      item.style.top = top + 'px';
      arr[0].top += item.offsetHeight + vGap;
      if (arr[0].top >= arr[columns - 1].top) {
        maxHeight = arr[0].top - vGap;
      }
    }
    setContainerHeight();

    var afterWidth = container.innerWidth || container.clientWidth;
    if (afterWidth != contaierWidth) {
      window.setTimeout(INSTANCE.update, 20);
    } else {
      window.setTimeout(debounceScorll, 20);
    }
  };

  var topLoading, bottomLoading;
  var topSpace = 0,
    bottomSpace = 0,
    maxHeight = 0;
  INSTANCE.showLoading = function (toucheTop) {
    //INSTANCE.hideLoading();
    if (toucheTop) {
      container.insertAdjacentHTML('afterbegin', config.loading);
      topLoading = container.firstChild || container.firstElementChild;
      topSpace = topLoading.offsetHeight;
      INSTANCE.update();
      scrollUp(topSpace);
    } else {
      container.insertAdjacentHTML('beforeend', config.loading);
      bottomLoading = container.lastChild || container.lastElementChild;
      bottomLoading.classList.add('bottom');
      bottomSpace = bottomLoading.offsetHeight;
      setContainerHeight();
      scrollDown(bottomSpace);
    }
  };
  INSTANCE.hideLoading = function () {
    if (topLoading) {
      topLoading.remove();
      topLoading = null;
      topSpace = 0;
      INSTANCE.update();
    }
    if (bottomLoading) {
      bottomLoading.remove();
      bottomLoading = null;
      bottomSpace = 0;
      setContainerHeight();
    }
  };

  function setContainerHeight() {
    container.style.height = maxHeight + bottomSpace + 'px';
  }

  function scrollUp(y) {
    if (scrollParent == null) return;
    scrollParent.scrollTo(0, (scrollParent == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollParent.scrollTop) - y);
  }
  function scrollDown(y) {
    if (scrollParent == null) return;
    scrollParent.scrollTo(0, (scrollParent == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollParent.scrollTop) + y);
  }

  var debounceResize = debounce(() => {
    INSTANCE.update();
    lastScrollY = scrollParent == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollParent.scrollTop;
  }, 100);

  window.addEventListener('resize', debounceResize);

  var lastScrollY = 0;
  var debounceScorll = debounce(() => {
    if (!container.parentElement || scrollParent == null) return;
    var scrollParentHeight = scrollParent.innerHeight || scrollParent.clientHeight;
    var scrollY = scrollParent == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollParent.scrollTop;
    var scrollContentHeight = scrollParent == window ? document.documentElement.scrollHeight || document.body.scrollHeight : scrollParent.scrollHeight;
    if (scrollY == 0 && lastScrollY > scrollY && topLoading == null) {
      INSTANCE.dispatchEvent(new C3Event('touchtop'));
    }
    //console.log(scrollParent, scrollY, scrollParentHeight, scrollContentHeight, lastScrollY, scrollY, bottomLoading);
    //console.log(scrollY + scrollParentHeight + 1 >= scrollContentHeight && lastScrollY <= scrollY && bottomLoading == null);
    if (scrollY + scrollParentHeight + 1 >= scrollContentHeight && lastScrollY <= scrollY && bottomLoading == null) {
      INSTANCE.dispatchEvent(new C3Event('touchbottom'));
    }
    lastScrollY = scrollY;
  }, 10);

  if (scrollParent) scrollParent.addEventListener('scroll', debounceScorll);
  /* INSTANCE.fireScroll = function() {
    debounceScorll();
  }; */
  INSTANCE.destroy = function () {
    window.removeEventListener('resize', debounceResize);
    if (scrollParent) scrollParent.removeEventListener('scroll', debounceScorll);
  };
  INSTANCE.update();
  return INSTANCE;
}

(function () {
  var Super = function () { };
  Super.prototype = C3EventDispatcher.prototype;
  builder.prototype = new Super();
})();
