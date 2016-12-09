class Layer {

    constructor(options) {
        this.selector = options.selector;
        this.opener = options.opener;
        this.closer = options.closer;
        this.layerEl = document.querySelector(this.selector);
        this.direction = options.direction || 'toRight';
        this.timer = parseFloat( window.getComputedStyle(document.querySelector( this.selector )).transitionDuration) * 1000;
        this.isOpen = false;
        var layerOpened = {};
        
        [].forEach.call(document.querySelectorAll(this.opener), (el) => {
            el.addEventListener('click', () => {
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.close();
                }
              });
            });
        [].forEach.call(document.querySelectorAll(this.closer), (el) => {
            el.addEventListener('click', (e) => {
                if (this.isOpen) {
                  this.close();
                }
            });
        });
    }
    
    static getLayerOpened() {
        return this.layerOpened;
    }
    
    static setLayerOpened(layer) {
        this.layerOpened = layer;
    }
    
    open() {
        function executeOpen() {
            switch (this.direction) {
                case 'toRight':
                    this.layerEl.style = 'transform: translateX(100%)';
                    break;
                case 'toLeft':
                    this.layerEl.style = 'transform: translateX(-100%)';
                    break;
                case 'toBottom':
                    this.layerEl.style = 'transform: translateY(100%)';
                    break;
            }
            this.isOpen = true;
            this.constructor.setLayerOpened(this);
        }
        var wait = 0;
        if (this.constructor.getLayerOpened().close) {
            this.constructor.getLayerOpened().close();
            wait = this.timer;
        }
        
        setTimeout(executeOpen.bind(this), wait);
    }
    
    close() {
      this.constructor.setLayerOpened({});
      this.isOpen = false;
      this.layerEl.style = '';
    }
};
Layer.layerOpened = {};