var URL = {
    MON: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/mon3857@GM8/{z}/{x}/{-y}.jpeg',
    MQ: 'http://otile{1-4}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
    TOPOICC: 'http://mapcache.{a-c}.icc.cat/map/bases_noutm/wmts/topo/GRID3857/{z}/{x}/{y}.jpeg',
    TOPOICC_GEO_MON: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/A250MON@GM14/{z}/{x}/{y}.png',
    TOPOICC_GEO_1: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/A250TARJ3857@GMTOT/{z}/{x}/{y}.png',
    ESRI: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ORTOINSTAMAPS: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/orto3857_12@GMTOT/{z}/{x}/{y}.png',
    ORTOICC: 'http://mapcache.{a-c}.icc.cat/map/bases_noutm/wmts/orto/GRID3857/{z}/{x}/{y}.jpeg',
    HIBRIDICGC: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/hibrid3857@GMTOT/{z}/{x}/{y}.png'
}

var L = {
  tileLayer: function() {},
  layerGroup: function() {}
}

var backgrounds = {
    "Topogràfic": [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: URL.MON,
          minZoom: 0,
          maxZoom: 6
        })
      }),
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: URL.MQ,
          minZoom: 7,
          maxZoom: 19,
        })
      }),
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: URL.TOPOICC,
          minZoom: 7,
          maxZoom: 20,
        })
      })
    ],
    "Simple": L.layerGroup([
        L.tileLayer(URL.TOPOICC_GEO_MON,{
            tms: true,
            minZoom: 0,
            maxZoom: 14,
            subdomains: ['a', 'b', 'c']
        }),
        L.tileLayer(URL.MQ,{
            minZoom: 15,
            maxZoom: 18,
            subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
        }),
        L.tileLayer(URL.TOPOICC_GEO_1,{
            tms: true,
            minZoom: 8,
            maxZoom: 18,
            subdomains: ['a', 'b', 'c']
        })
    ]),
    "Imatge": L.layerGroup([
        L.tileLayer(URL.ESRI,{
            minZoom: 0,
            maxZoom: 19
        }),
        L.tileLayer(URL.ORTOINSTAMAPS,{
            tms: true,
            minZoom: 0,
            maxZoom: 12,
            subdomains: ['a', 'b', 'c']
        }),
        L.tileLayer(URL.ORTOICC,{
            minZoom: 13,
            maxZoom: 20,
            subdomains: ['a', 'b', 'c']
        })
    ]),
    "Mapa híbrid": L.layerGroup([
        L.tileLayer(URL.ESRI,{
            minZoom: 0,
            maxZoom: 18
        }),
        L.tileLayer(URL.ORTOICC,{
            minZoom: 13,
            maxZoom: 18,
            subdomains: ['a', 'b', 'c']
        }),
        L.tileLayer(URL.HIBRIDICGC,{
            tms: true,
            minZoom: 0,
            maxZoom: 17,
            subdomains: ['a', 'b', 'c']
        })
    ])
};


var map = new ol.Map({
  layers: backgrounds["Topogràfic"],
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([2.1685, 41.3818], 'EPSG:4326', 'EPSG:3857'),
    zoom: 8
  })
});
