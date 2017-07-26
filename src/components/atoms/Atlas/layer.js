import L from 'leaflet';
import TileLoader from './mixin'; 
/*
 * Generic  Canvas Layer for leaflet 0.7 and 1.0-rc, 
 * copyright Stanislav Sumbera,  2016 , sumbera.com , license MIT
 * originally created and motivated by L.CanvasOverlay  available here: https://gist.github.com/Sumbera/11114288
 */


// -- support for both  0.0.7 and 1.0.0 rc2 leaflet
L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({ 
  includes: [L.Mixin.Events, TileLoader],

  // -- initialized is called on prototype 
  initialize: function(delegate, pane, options){
    this._map    = null;
    // backCanvas for zoom animation
    this._delegate = delegate;
    this.render = this.render.bind(this);
    this._setBBox(options.bbox);
    L.setOptions(this, options);
    this.currentAnimationFrame = -1;
    this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    this.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
      window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function(id) { clearTimeout(id); };
  },
  
  delegate: function(del){
    this._delegate = del;
    return this;
  },
  _setBBox: function(bbox){
    this._bbox = {
      min: {x:bbox[0], y:bbox[1]},
      max: {x:bbox[2], y:bbox[3]}
    };
  },
  _getBBoxAt: function(zoomLevel){
    const zoom = zoomLevel || this._map.getZoom();
    const { min, max } = this._bbox;
    const _min = this._map.project(new L.LatLng(max.y, min.x), zoom);
    const _max = this._map.project(new L.LatLng(min.y, max.x), zoom);
    const latLngCenter = this._map.getCenter();
    const center = this._map.project(latLngCenter, zoom);
    const bounds = this._map.getPixelBounds(latLngCenter,zoomLevel); 
    const pixelOrigin = this._map._getNewPixelOrigin(latLngCenter, zoom);    
    return {
      origin: pixelOrigin,
      center,
      width: _max.x - _min.x,
      height: _max.y - _min.y,
      min:_min, 
      max:_max,
      bounds,
    };
  },
  _onLayerDidResize: function(resizeEvent){
    this._canvas.width = resizeEvent.newSize.x;
    this._canvas.height = resizeEvent.newSize.y;
  },

  _onLayerDidMove: function(){
    var domPosition = L.DomUtil.getPosition(this._map.getPanes().mapPane);
    if (domPosition) {
     // L.DomUtil.setPosition(this._canvas, { x: -domPosition.x, y: -domPosition.y });
    }

  },

  getEvents: function(){
    return {
      viewreset: this._reset,
      resize: this._reset,
      move: this._onLayerDidMove,
      zoomanim: this._animateZoom,
      zoomend: this._endZoomAnim,
    };
  },

  _createCanvas: function({id,width, height, bounds:{min:{x,y}}}){
    // console.log(`createCanvas zoom ${id} - x,y`,x,y);
    const px = (s)=>`${s}px`;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.left =  0;
    canvas.style.top = 0;
    canvas.style.position = 'absolute';
    canvas.style.width = px(width);
    canvas.style.height = px(height);
    // canvas.style.pointerEvents = "none";
    // canvas.style.zIndex = this.options.zIndex || 0;
    var className = 'leaflet-tile-container leaflet-zoom-animated';
    canvas.style.display = 'none';
    canvas.setAttribute('class', className);
    canvas.setAttribute('id', id);
    L.DomUtil.setPosition(canvas, { x:-x, y:-y });
    // canvas.setAttribute('moz-opaque', true);
    return canvas;
  },
  
  _getActiveCanvas(zoom){
    return this._renderedCanvas[zoom || this._map.getZoom()];
  },

  _setActiveCanvas: function(rendered){
    if(this._canvas){
      this._canvas.style.display = 'none';
    }
    this._canvas = rendered.canvas;
    this._canvas.style.display = 'block';
  },

  _prerenderAtZoom: function(zoomLevel){
    const mapPos = this._map._getMapPanePos();
    const {min, max, width, height, bounds, center, origin} = this._getBBoxAt(zoomLevel);
    // console.log('pixel origin:', origin);
    const canvas = this._createCanvas({
      id: `canvas-zoom-${zoomLevel}`,
      width, height, bounds
    });
    const del = this._delegate;
    del.onDrawLayer && del.onDrawLayer({
      canvas, layer:this,
      zoom:zoomLevel,
      // bounds
    });
    return {
      canvas,
      min,
      max,
      width,
      height,
      bounds,
      center,
      origin,
    };
  },

  _prerender: function(){
    this._renderedCanvas = {};
    const minZoom = this._map.getMinZoom();
    const maxZoom = this._map.getMaxZoom();
    for(let i = minZoom; i <= maxZoom; i++){
      const prerender = this._prerenderAtZoom(i);
      this._container.append(prerender.canvas);
      this._renderedCanvas[i] = prerender;
    }
  },
  
  _reset: function(){
    // var size = this._map.getSize();
    // this._canvas.width = size.x;
    // this._canvas.height = size.y;

    // fix position
    var pos = L.DomUtil.getPosition(this._map.getPanes().mapPane);
    if (pos) {
      // L.DomUtil.setPosition(this._canvas, { x: -pos.x, y: -pos.y });
    }
    // this.onResize();
    this._render();
  },
  _render: function(){
    if (this.currentAnimationFrame >= 0) {
      this.cancelAnimationFrame.call(window, this.currentAnimationFrame);
    }
    this.currentAnimationFrame = this.requestAnimationFrame.call(window, this.render);
  },

  onAdd: function(map) {
    this._map = map;

    // add container with the canvas to the tile pane
    // the container is moved in the oposite direction of the 
    // map pane to keep the canvas always in (0, 0)
    var tilePane = this._map._panes.tilePane;
    var _container = L.DomUtil.create('div', 'leaflet-layer');
    _container.style.zIndex = this.options.zIndex || 0;
    _container.append(this._canvas);
    tilePane.appendChild(_container);
    this._container = _container;

    this._prerender();
    this._setActiveCanvas(this._getActiveCanvas());
    // hack: listen to predrag event launched by dragging to
    // set container in position (0, 0) in screen coordinates

    map.on(this.getEvents(), this);
  },

  onRemove: function (map) {
    var del = this._delegate || this;
    del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback
    this._container.parentNode.removeChild(this._container);
    map.off(this.getEvents(),this);
  },

  addTo: function (map) {
    map.addLayer(this);
    return this;
  },
  redraw: function(direct) {
  },

  draw: function() {
    // return this._reset();
  },

  _animateZoom: function(e) {
    if (!this._animating) {
      this._animating = true;
    }
   // const { min } = this._getBBoxAt(e.zoom);
    const prerendered = this._getActiveCanvas(e.zoom);
    const { canvas, center, origin } = prerendered;
    this._setActiveCanvas(prerendered);
    // hide original
//    const oldPixelOrigin = this._map.getPixelOrigin();
    const pixelOrigin = this._map._getNewPixelOrigin(e.center, e.zoom);
    // const {x,y} = this._map._latLngToNewLayerPoint(this._map.getCenter(), e.zoom);
    // we just need to adjust to the new map's origin (in pixels)
    L.DomUtil.setPosition(this._canvas, {x:-pixelOrigin.x, y:-pixelOrigin.y});

   // const newCenter = this._map._latLngToNewLayerPoint(this._map.getCenter(), e.zoom, e.center);
  },

  _endZoomAnim: function(e){
    this._animate = false;
    // console.log('zoomend - pixelOrigin', this._map.getPixelOrigin());
    // const mapPos = L.DomUtil.getPosition(this._map.getPanes().mapPane);
    // L.DomUtil.setPosition(this._canvas, { x:-mapPos.x, y:-mapPos.y});
    // this._canvas.style.display = 'block';
  },

  render: function(){}
});

const initLayer = (delegate, pane, options)=>{ return new L.CanvasLayer(delegate, pane, options); }

export default initLayer;