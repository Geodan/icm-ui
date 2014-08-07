/**
 * Created by martijnh on 5-8-14.
 * based on https://github.com/ardhi/Leaflet.MousePosition
*/
L.Control.MousePosition = L.Control.extend({
    options: {
        position: 'bottomleft',
        emptyString: '',
        originalCRS: true
    },

    onAdd: function (map) {
        var thisIs = this;
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;

        if (icmconfig.RDProj) {
            this._container.onclick = function () {
                //switch projection for presenting coordinates
                if (thisIs.options.originalCRS) {
                    map.off('mousemove', thisIs._onMouseMove, thisIs);
                    map.on('mousemove', thisIs._onMouseMoveRD, thisIs);
                } else {
                    map.off('mousemove', thisIs._onMouseMoveRD, thisIs);
                    map.on('mousemove', thisIs._onMouseMove, thisIs);
                }
                thisIs.options.originalCRS = !thisIs.options.originalCRS;
            };
        }
        return this._container;
    },

    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove);
        map.off('mousemove', this._onMouseMoveRD);
    },

    _onMouseMove: function (e) {
        this._container.innerHTML = 'Lat: ' + e.latlng.lat.toFixed(5) + ', Lon: ' + e.latlng.lng.toFixed(5);
    },

    _onMouseMoveRD: function (e) {
        var latlon = e.latlng;
        var coordsRD = proj4(icmconfig.RDProj, [latlon.lng, latlon.lat]);
        this._container.innerHTML = 'X: ' + Math.round(coordsRD[0]) + ', Y: ' + Math.round(coordsRD[1]);

    }
});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.Control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};