class MenuLayer extends Layer {
    constructor(options) {
        super(options);
    }
    
    open() {
        console.log('agument');
        super.open();
    }
};

var menuLayer = new MenuLayer({selector: '#menu', opener: '#menuButton', closer: '#menuClose'});

var searchLayer = new Layer({selector: '#search', opener: '#searchButton', closer: '#searchClose', direction: 'toBottom'});

var cartLayer = new Layer({selector: '#cart', opener: '#cartButton', closer: '#cartClose', direction: 'toLeft'});