var Layer = {
    isOpen: false,
    _layerOpen: {},
    
    setLayerOpen: function(layerObj) {
        var proto = this;
        while (!proto.hasOwnProperty('_layerOpen')) {
            proto = Object.getPrototypeOf(proto);
        }
        proto._layerOpen = layerObj;  
    },
    
    getLayerOpen: function() {
        return this._layerOpen;
    },
    
    open: function() {
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
            this.setLayerOpen(this);
        }

        var wait = 0;

        if (this.getLayerOpen().close) {
            this.getLayerOpen().close();
            wait = this.timer;
        }
        
        setTimeout(executeOpen.bind(this), wait);
    },
    
    close: function() {
      this.setLayerOpen({});
      this.isOpen = false;
      this.layerEl.style = '';
    },
    
    init: function(options) {
        this.selector = options.selector;
        this.opener = options.opener;
        this.closer = options.closer;
        this.layerEl = document.querySelector(this.selector);
        this.direction = options.direction || 'toRight';
        this.timer = parseFloat( window.getComputedStyle(document.querySelector( this.selector )).transitionDuration) * 1000;
        
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
        
        return this;
    }
}
