var Layer = {
    isOpen: false,
    _layerOpen: {},
    
    _setLayerOpen: function(layerObj) {
        var proto = this;
        while (!proto.hasOwnProperty('_layerOpen')) {
            proto = Object.getPrototypeOf(proto);
        }
        proto._layerOpen = layerObj;
    },
    
    _getLayerOpen: function() {
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
            this._setLayerOpen(this);
        }

        var wait = 0;

        if (this._getLayerOpen().close) {
            this._getLayerOpen().close();
            wait = this.timer;
        }
        
        setTimeout(executeOpen.bind(this), wait);
        
        return this;
    },
    
    close: function() {
        this._setLayerOpen({});
        this.isOpen = false;
        this.layerEl.style = '';
        
        return this;
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
