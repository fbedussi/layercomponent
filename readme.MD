#Layer component

A component to manage layers in websites

##Usage
Create a new object form the Layer prototype
````javascipt
var searchLayer = Object.create(Layer);
````
Initialise it with the following parameters:
- selector: the CSS selector of the layer container
- opener: the CSS selector of the button or element that opens/coloses the layer
- closer: the CSS selector of the button or element that coloses the layer
- direction: the direction in witch the layer opens: 'toRight', 'toLeft', 'toBottom'. If omittied the default 'toRight' will be used.  
````javascipt
searchLayer.init({selector: '#search', opener: '#searchButton', closer: '#searchClose', direction: 'toBottom'});
`````