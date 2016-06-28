var URL = {
    MON: 'http://www.{s}.instamaps.cat/mapcache/tms/1.0.0/mon3857@GM8/{z}/{x}/{y}.jpeg',
    MQ: 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
    TOPOICC: 'http://mapcache.{s}.icc.cat/map/bases_noutm/wmts/topo/GRID3857/{z}/{x}/{y}.jpeg',
    TOPOICC_GEO_MON: 'http://www.{s}.instamaps.cat/mapcache/tms/1.0.0/A250MON@GM14/{z}/{x}/{y}.png',
    TOPOICC_GEO_1: 'http://www.{s}.instamaps.cat/mapcache/tms/1.0.0/A250TARJ3857@GMTOT/{z}/{x}/{y}.png',
    ESRI: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ORTOINSTAMAPS: 'http://www.{s}.instamaps.cat/mapcache/tms/1.0.0/orto3857_12@GMTOT/{z}/{x}/{y}.png',
    ORTOICC: 'http://mapcache.{s}.icc.cat/map/bases_noutm/wmts/orto/GRID3857/{z}/{x}/{y}.jpeg',
    HIBRIDICGC: 'http://www.{s}.instamaps.cat/mapcache/tms/1.0.0/hibrid3857@GMTOT/{z}/{x}/{y}.png'
}

var backgrounds = {
    "Topogràfic": L.layerGroup([
        L.tileLayer(URL.MON,{
            tms: true,
            minZoom: 0,
            maxZoom: 6,
            subdomains: ['a', 'b', 'c']
        }),
        L.tileLayer(URL.MQ,{
            minZoom: 7,
            maxZoom: 19,
            subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
        }),
        L.tileLayer(URL.TOPOICC,{
            minZoom: 7,
            maxZoom: 20,
            subdomains: ['a', 'b', 'c']
        })
    ]),
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

var map = L.map('map', {
    layers: backgrounds["Simple"]
}).setView([41.3818,2.1685], 8);

L.control.layers(backgrounds).addTo(map);
