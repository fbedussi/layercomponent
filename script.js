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