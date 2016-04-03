var Layer = {
    timer: 500,
    isOpen: false,
    layerOpened: {},
    setLayerOpened: function(layerObj) {
      Object.getPrototypeOf(this).layerOpened = layerObj;  
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
            this.setLayerOpened(this);
        }
        var wait = 0;
        if (this.layerOpened.close) {
            this.layerOpened.close();
            wait = this.timer;
        }
        
        setTimeout(executeOpen.bind(this), wait);
    },
    close: function() {
      this.setLayerOpened({});
      this.isOpen = false;
      this.layerEl.style = '';
    },
    init: function(options) {
        this.selector = options.selector;
        this.opener = options.opener;
        this.closer = options.closer;
        this.layerEl = document.querySelector(this.selector);
        this.direction = options.direction || 'toRight';
        var layer = this;
        [].forEach.call(document.querySelectorAll(this.opener),function(el) {
            el.addEventListener('click', function(e) {
                if (!layer.isOpen) {
                    layer.open();
                } else {
                    layer.close();
                }
              });
            });
        [].forEach.call(document.querySelectorAll(this.closer), function(el) {
            el.addEventListener('click', function(e) {
                if (layer.isOpen) {
                  layer.close();
                }
            });
        });
    }
}

var menuLayer = Object.create(Layer);
menuLayer.init({selector: '#menu', opener: '#menuButton', closer: '#menuClose'});
menuLayer.open = function() {
    console.log('agument');
    Layer.open.call(this);
}

var searchLayer = Object.create(Layer);
searchLayer.init({selector: '#search', opener: '#searchButton', closer: '#searchClose', direction: 'toBottom'});

var cartLayer = Object.create(Layer);
cartLayer.init({selector: '#cart', opener: '#cartButton', closer: '#cartClose', direction: 'toLeft'});