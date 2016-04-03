(function() {
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
    }
    
    return window.Layer = Layer;
})()