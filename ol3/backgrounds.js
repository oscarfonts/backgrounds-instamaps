var URL = {
    MON: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/mon3857@GM8/{z}/{x}/{-y}.jpeg',
    MQ: 'http://otile{1-4}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
    TOPOICC: 'http://mapcache.{a-c}.icc.cat/map/bases_noutm/wmts/topo/GRID3857/{z}/{x}/{y}.jpeg',
    TOPOICC_GEO_MON: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/A250MON@GM14/{z}/{x}/{-y}.png',
    TOPOICC_GEO_1: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/A250TARJ3857@GMTOT/{z}/{x}/{-y}.png',
    ESRI: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ORTOINSTAMAPS: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/orto3857_12@GMTOT/{z}/{x}/{-y}.png',
    ORTOICC: 'http://mapcache.{a-c}.icc.cat/map/bases_noutm/wmts/orto/GRID3857/{z}/{x}/{y}.jpeg',
    HIBRIDICGC: 'http://www.{a-c}.instamaps.cat/mapcache/tms/1.0.0/hibrid3857@GMTOT/{z}/{x}/{-y}.png'
}

function resolution(zoom) {
  var equator = 40075016.686;
  var tilesize = 256;
  return equator / (tilesize*Math.pow(2,zoom));
};

function layer(options) {
  return new ol.layer.Tile({
    minResolution: resolution(options.maxZoom),
    maxResolution: resolution(options.minZoom),
    source: new ol.source.XYZ({
      url: options.url,
      minZoom: options.minZoom,
      maxZoom: options.maxZoom
    })
  });
}

var backgrounds = [
  new ol.layer.Group({
    title: "Topogràfic",
    type: 'base',
    combine: true,
    visible: false,
    layers: [
      layer({
        url: URL.MON,
        minZoom: 0,
        maxZoom: 6
      }),
      layer({
        url: URL.MQ,
        minZoom: 7,
        maxZoom: 19,
      }),
      layer({
        url: URL.TOPOICC,
        minZoom: 7,
        maxZoom: 20,
      })
    ]
  }),
  new ol.layer.Group({
    title: "Simple",
    type: 'base',
    combine: true,
    visible: true,
    layers: [
      layer({
        url: URL.TOPOICC_GEO_MON,
        minZoom: 0,
        maxZoom: 14
      }),
      layer({
        url: URL.MQ,
        minZoom: 15,
        maxZoom: 18
      }),
      layer({
        url: URL.TOPOICC_GEO_1,
        minZoom: 8,
        maxZoom: 18
      })
    ]
  }),
  new ol.layer.Group({
    type: 'base',
    combine: true,
    visible: false,
    title: "Imatge",
    layers: [
      layer({
        url: URL.ESRI,
        minZoom: 0,
        maxZoom: 19
      }),
      layer({
        url: URL.ORTOINSTAMAPS,
        minZoom: 0,
        maxZoom: 12
      }),
      layer({
        url: URL.ORTOICC,
        minZoom: 13,
        maxZoom: 20
      })
    ]
  }),
  new ol.layer.Group({
    title: "Mapa híbrid",
    type: 'base',
    combine: true,
    visible: false,
    layers: [
      layer({
        url: URL.ESRI,
        minZoom: 0,
        maxZoom: 18
      }),
      layer({
        url: URL.ORTOICC,
        minZoom: 13,
        maxZoom: 18
      }),
      layer({
        url: URL.HIBRIDICGC,
        minZoom: 0,
        maxZoom: 17
      })
    ]
  })
];

var map = new ol.Map({
  layers: backgrounds,
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([2.1685, 41.3818], 'EPSG:4326', 'EPSG:3857'),
    zoom: 8
  })
});

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);
