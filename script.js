var menuLayer = new Layer({selector: '#menu', opener: '#menuButton', closer: '#menuClose'});

//menuLayer.open = function() {
//    console.log('agument');
//    Layer.open.call(this);
//}

var searchLayer = new Layer({selector: '#search', opener: '#searchButton', closer: '#searchClose', direction: 'toBottom'});

var cartLayer = new Layer({selector: '#cart', opener: '#cartButton', closer: '#cartClose', direction: 'toLeft'});