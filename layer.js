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
    
    static set layerOpened(layerObj) {
      layerOpened = layerObj;  
    }
    
    static get layerOpened() {
      return layerOpened; 
    }
    
    //set layerOpened(layerObj) {
    //  Layer.layerOpened = layerObj;  
    //}
    //
    //get layerOpened() {
    //  return Layer.layerOpened; 
    //}
    
    //static getLayerOpened() {
    //    return this.layerOpened;
    //}
    //
    //static setLayerOpened(layer) {
    //    this.layerOpened = layer;
    //}
    
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
            Layer.layerOpened = this;
            //this.layerOpened = this;
            //Layer.setLayerOpened(this);
        }
        var wait = 0;
        //if (Layer.getLayerOpened().close) {
        //    Layer.getLayerOpened().close();
        if (Layer.layerOpened.close) {
            Layer.layerOpened.close();
        //if (this.layerOpened.close) {
        //    this.layerOpened.close();
            wait = this.timer;
        }
        
        setTimeout(executeOpen.bind(this), wait);
    }
    
    close() {
      Layer.layerOpened = {};
      //this.layerOpened = {};
      //Layer.setLayerOpened({});
      this.isOpen = false;
      this.layerEl.style = '';
    }
}
//Layer.layerOpened = {};