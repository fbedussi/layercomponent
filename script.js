var menuLayer = createLayer({selector: '#menu', opener: '#menuButton', closer: '#menuClose'});
menuLayer.open = function() {
    console.log('agument');
    Object.getPrototypeOf(this).open.call(this);
}

var searchLayer = createLayer({selector: '#search', opener: '#searchButton', closer: '#searchClose', direction: 'toBottom'});

var cartLayer = createLayer({selector: '#cart', opener: '#cartButton', closer: '#cartClose', direction: 'toLeft'});