// took from:
// https://github.com/vuestorefront/storefront-ui/blob/v2-develop/packages/sfui/shared/scrollable/scrollable.ts

const isBrowser = typeof window !== 'undefined';
const isReduceMotionEnabled = isBrowser && window?.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollableDirections = {
    vertical: 'vertical',
    horizontal: 'horizontal',
}

const defaultScrollableOptions = {
    reduceMotion: isReduceMotionEnabled,
    direction: scrollableDirections.horizontal,
};

export default class Scrollable {
    container;
    options;
    debounceId;
    dragScrollX;
    dragScrollLeft;
    dragScrollY;
    dragScrollTop;
    pointerDownOffsetLeft;
    pointerDownOffsetTop;
    dragDistance;

    isDraggedPreviously = false;
    
    get isDragged() {
        return this.isDraggedPreviously;
    }

    set isDragged(newValue) {
        if (newValue === this.isDraggedPreviously) {
            return;
        }

        this.isDraggedPreviously = newValue;
        
        this.options.onDragStart?.({
            sDragged: this.isDraggedPreviously,
        });
    }

    constructor(container, ScrollableOptions) {
        if (!(container instanceof HTMLElement)) {
            throw new Error(`SfScrollable: Container is not a HTMLElement! Received: ${container}`);
        }
        
        this.container = container;
        this.options = {
            ...ScrollableOptions,
            reduceMotion: ScrollableOptions?.reduceMotion ?? defaultScrollableOptions.reduceMotion,
            direction: ScrollableOptions?.direction ?? defaultScrollableOptions.direction,
        };
        this.dragScrollX = 0;
        this.dragScrollLeft = 0;
        this.dragScrollY = 0;
        this.dragScrollTop = 0;
        this.pointerDownOffsetLeft = 0;
        this.pointerDownOffsetTop = 0;
        this.dragDistance = 0;
    }

    register() {
        const removeListeners = this.addListeners();
        this.onScrollHandler();
        return removeListeners;
    }

    addListeners() {
        const onScroll = this.onScroll.bind(this);
        this.container.addEventListener('scroll', onScroll, { passive: !this.options.drag });
        this.resizeObserver.observe(this.container);

        if (this.options.drag) {
            const onMouseDown = this.onMouseDown.bind(this);
            const onMouseUp = this.onMouseUp.bind(this);
            const onMouseMove = this.onMouseMove.bind(this);
            const onMouseLeave = this.onMouseLeave.bind(this);

            this.container.addEventListener('mousedown', onMouseDown, { passive: false });
            this.container.addEventListener('mouseup', onMouseUp, { passive: true });
            this.container.addEventListener('mousemove', onMouseMove, { passive: false });
            this.container.addEventListener('mouseleave', onMouseLeave, { passive: true });

            return () => {
                this.container.removeEventListener('scroll', onScroll);
                this.container.removeEventListener('mousedown', onMouseDown);
                this.container.removeEventListener('mouseup', onMouseUp);
                this.container.removeEventListener('mousemove', onMouseMove);
                this.container.removeEventListener('mouseleave', onMouseLeave);
                this.resizeObserver.unobserve(this.container);
            };
        }

        return () => {
            this.container.removeEventListener('scroll', onScroll);
            this.resizeObserver.unobserve(this.container);
        };
    }

    prev() {
        let preventDefault = false;
        this.options?.onPrev?.({ preventDefault: () => (preventDefault = true) });

        if (preventDefault) {
            return;
        }

        const { container, options } = this;

        if (options.direction === scrollableDirections.vertical) {
            this.scrollTo({ top: container.scrollTop - container.clientHeight });
        } 
        else {
            this.scrollTo({ left: container.scrollLeft - container.clientWidth });
        }
    }

    next() {
        let preventDefault = false;
        this.options?.onNext?.({ preventDefault: () => (preventDefault = true) });

        if (preventDefault) {
            return;
        }

        const { container, options } = this;
        if (options.direction === scrollableDirections.vertical) {
            this.scrollTo({ top: container.scrollTop + container.clientHeight });
        }
        else {
            this.scrollTo({ left: container.scrollLeft + container.clientWidth });
        }
    }

    scrollToIndex(index) {
        const children = this.container.children;

        if (children[index]) {
            const { container } = this;
            const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
            const {
                top: childTop,
                left: childLeft,
                width: childWidth,
                height: childHeight,
            } = children[index].getBoundingClientRect();

            if (this.options.direction === scrollableDirections.vertical) {
                const top = childTop - containerTop;
                const centerVertical = (container.clientHeight - childHeight) / 2;

                this.scrollTo({ top: container.scrollTop + top - centerVertical });
            } 
            else {
                const left = childLeft - containerLeft;
                const centerHorizontal = (container.clientWidth - childWidth) / 2;

                this.scrollTo({ left: container.scrollLeft + left - centerHorizontal });
            }
        }
    }

    refresh(callback) {
        if (callback) {
            requestAnimationFrame(() => {
                callback(this.calculate());
            });
        }
    }

    onMouseUp(event) {
        const { container, options } = this;
        this.isDragged = false;

        // sensitivity drags by how much you drag from x1 -> x2, then swipe inside container by this amount
        const sensitivity = typeof this.options.drag === 'object' && this.options.drag.sensitivity 
            ? this.options.drag.sensitivity 
            : 4;

        // container width options define that no matter how hard you drag x1 -> x2 you will swipe by one container width
        const scrollByOneWidth = typeof this.options.drag === 'object' 
            ? this.options.drag.containerWidth 
            : false;

        // buffor for nor overshoot whole width/height of container becuase of subpixel, snap will cover unsufficient width/height
        const buffor = 10;

        if (options.direction === scrollableDirections.vertical) {
            const element = event.pageY - container.offsetTop;
            const scrolling = (element - this.dragScrollY) * sensitivity;

            if (scrollByOneWidth) {
                // if user just touched not dragged at least 10px - do nothing
                if (Math.abs(this.dragDistance) < 10) {
                    return;
                }

                container.scrollLeft = this.dragScrollLeft - (this.dragDistance < 0 ? container.clientHeight - buffor : -container.clientHeight + buffor);
            } 
            else {
                container.scrollTop = this.dragScrollTop - scrolling;
            }
        } 
        else {
            const element = event.pageX - container.offsetLeft;
            const scrolling = (element - this.dragScrollX) * sensitivity;

            if (scrollByOneWidth) {
                // if user just touched not dragged at least 10px - do nothing
                if (Math.abs(this.dragDistance) < 10) {
                    return;
                }

                container.scrollLeft = this.dragScrollLeft - (this.dragDistance < 0 ? container.clientWidth - buffor : -container.clientWidth + buffor);
            } 
            else {
                container.scrollLeft = this.dragScrollLeft - scrolling;
            }
        }

        // TODO: add proper scrolling effect with timing and easings, now we have no idea when animation ends, therefor cant disable double click during animation and weird behavior. With proper scrolling animation we will be able to add real time dragging not only dragging after mouse/touch UP

        this.options.onDragEnd?.({
            isDragged: false,
            swipeLeft: this.dragDistance > -10,
            swipeRight: this.dragDistance < 10,
        });
    }

    onMouseLeave() {
        this.isDragged = false;
    }

    onMouseDown(event) {
        event.preventDefault();
        const { container, options } = this;
        this.isDragged = true;
        this.pointerDownOffsetLeft = event.offsetX;
        this.pointerDownOffsetTop = event.offsetY;

        if (options.direction === scrollableDirections.vertical) {
            this.dragScrollY = event.pageY - container.offsetTop;
            this.dragScrollTop = container.scrollTop;
        } 
        else {
            this.dragScrollX = event.pageX - container.offsetLeft;
            this.dragScrollLeft = container.scrollLeft;
        }
    }

    onMouseMove(event) {
        if (!this.isDragged) {
            return;
        }

        event.preventDefault();
        const { options } = this;

        if (options.direction === scrollableDirections.vertical) {
            this.dragDistance = this.pointerDownOffsetTop - event.offsetY;
        } 
        else {
            this.dragDistance = this.pointerDownOffsetLeft - event.offsetX;
        }
    }

    scrollTo({ left, top }) {
        const behavior = this.options.reduceMotion ? 'auto' : 'smooth';
        this.container.scrollTo({ left, top, behavior });
    }

    onScroll(event) {
        if (!this.container) {
            return;
        }

        if (!!this.options.drag) {
            event.preventDefault();
        }

        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(this.onScrollHandler.bind(this), 50);
    }

    resizeObserver = new ResizeObserver(() => {
        const container = this.container;

        if (!container) {
            return;
        }

        this.refresh(this.options.onScroll);
    });

    onScrollHandler() {
        this.refresh(this.options.onScroll);
    }

    get hasNext() {
        if (this.options.direction === scrollableDirections.vertical) {
            return this.container.scrollHeight > this.container.scrollTop + this.container.clientHeight;
        }
        return this.container.scrollWidth > this.container.scrollLeft + this.container.clientWidth;
    }

    get hasPrev() {
        if (this.options.direction === scrollableDirections.vertical) {
            return !!this.container.scrollTop;
        }
        return !!this.container.scrollLeft;
    }

    calculate() {
        return {
            left: this.container.scrollLeft,
            width: this.container.clientWidth,
            scrollWidth: this.container.scrollWidth,
            hasPrev: this.hasPrev,
            hasNext: this.hasNext,
        };
    }
}