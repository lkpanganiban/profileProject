//Initialize Leaflet Map
var map = new L.Map('map',{
    maxZoom:16,
    zoomControl:false
}).setView([17.35643965773389, 121.14413665771483], 13);//real center
//}).setView([-45.01433117775014, 168.95736694335938], 10);//smaple center

var newZoom = L.control.zoom({
        position:'topright'
    });
newZoom.addTo(map);
//Street Tiles
// var url = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg',
// 	attr ='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
// 	service = new L.TileLayer(url, {subdomains:"1234",attribution: attr});

//initialize ESRI services
var esri =   L.esri.basemapLayer('Imagery');
var esriLabel = L.esri.basemapLayer('ImageryLabels');

//add to map ESRI services
esri.addTo(map);
esriLabel.addTo(map);

var width = $(document).width();
var height = ($(document).height() - 20)/2.5;


//catching window resize
$(window).on('resize',function(){location.reload();});


//add elevation control to map
// var geojson;

// //Create temporary geojson file
// var geojson = {"name":"NewFeatureType","type":"FeatureCollection"
// ,"features":[
// {"type":"Feature","geometry":{"type":"LineString","coordinates":[[169.13693,-44.696476,296],[169.134602,-44.69764,295]]},"properties":null}
// ]}
// ;
// //put looped data here
// var coord_arr=[];

// //real data
// var data_path = $.getJSON("data/try.geojson",function(data){

//     for(var i = 0; i<data.features.length;i++){
//         coord_arr.push([data.features[i].geometry.coordinates[0][0],data.features[i].geometry.coordinates[0][1], data.features[i].properties.GRID_CODE]);
//     }

//     geojson.features[0].geometry.coordinates = coord_arr;

//     var gjl = L.geoJson(null,{
//         onEachFeature: el.addData.bind(el)});

//     gjl.addData(geojson);
//     gjl.addTo(map);
    
// });


// Project Area Image Overlay
var projectArea = 'data_pasil/Layer0.png',
    imageBounds = [[17.33024057518417,121.077867273394],[17.42196043519033,121.2084673756794]],
    kml = L.imageOverlay(projectArea, imageBounds).addTo(map);

//PhotoLayer
var photoLayer = L.photo.cluster(/*{ spiderfyDistanceMultiplier: 1 }*/).on('click', function (evt) {
        evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
            className: 'leaflet-popup-photo',
            minWidth: 400
        }).openPopup();
    });

$.ajax({
  url: "data_pasil/imagePoints.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    var photos=[];
    var photo_data = data.features;
    console.log(photo_data.length);

    for(var i=0; i<photo_data.length;i++){
        var url =photo_data[i].properties.NAME;
        //console.log(url);
        photos.push({
            lat:photo_data[i].geometry.coordinates[1],
            lng:photo_data[i].geometry.coordinates[0],
            url:photo_data[i].properties.IMAGE_LINK,
            caption:photo_data[i].properties.NAME+" : "+ photo_data[i].properties.TIMESTAMP,
            //thumbnail:"data/thumbnails/tn_"+photo_data[i].properties.NAME+".jpg"
            thumbnail:photo_data[i].properties.IMAGE_LINK
        });
    }
    photoLayer.add(photos).addTo(map);
    //console.log(photos)
  }
});


// Profile Lines
//initialize elevation control: centerline
var center_elev = L.control.elevation({  
    position: "bottomleft",
    theme: "googleEarth-theme",
    width: width,
    height: height,
    margins: {
        top: 30,
        right: 100,
        bottom: 30,
        left: 60
    },
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
        decimalsX: 3,
        decimalsY: 0,
        formatter: undefined
    },
    xTicks: 10,
    yTicks: 5,
    collapsed: false,
    yAxisMin: undefined,
    yAxisMax: undefined,
    forceAxisBounds: false

    });
center_elev.addTo(map);
//Centerline Style
var centerStyle = {
    "stroke": "#white",
    "weight": 2,
    "opacity": 0.65,
    "color":"red"
};
//Centerline Json
var centerLine = L.geoJson(null,{
        onEachFeature: center_elev.addData.bind(center_elev),
        style:centerStyle
    });
$.ajax({
  url: "data_pasil/river.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    centerLine.addData(data);
    centerLine.addTo(map);
  }
});
//initialize elevation control: left
var left_elev = L.control.elevation({  
    position: "topleft",
    theme: "steelblue-theme",
    width: width,
    height: height,
    margins: {
        top: 30,
        right: 100,
        bottom: 30,
        left: 60
    },
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
        decimalsX: 3,
        decimalsY: 0,
        formatter: undefined
    },
    xTicks: 10,
    yTicks: 5,
    collapsed: false,
    yAxisMin: undefined,
    yAxisMax: undefined,
    forceAxisBounds: false

    });
//left_elev.addTo(map);
//Left Bank Style
var leftStyle = {
    "stroke": "#ff7800",
    "weight": 2,
    "opacity": 0.65,
    "color":"green"
};
//Left Bank Json
var left_Bank = L.geoJson(null,{
        onEachFeature: left_elev.addData.bind(left_elev),
        style:leftStyle
    });
$.ajax({
  url: "data_pasil/channel_l.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    left_Bank.addData(data);
    left_Bank.addTo(map);
  }
});

//initialize elevation control: right
var right_elev = L.control.elevation({  
    position: "topleft",
    theme: "lime-theme",
    width: width,
    height: height,
    margins: {
        top: 30,
        right: 100,
        bottom: 30,
        left: 60
    },
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
        decimalsX: 3,
        decimalsY: 0,
        formatter: undefined
    },
    xTicks: 10,
    yTicks: 5,
    collapsed: false,
    yAxisMin: undefined,
    yAxisMax: undefined,
    forceAxisBounds: false

    });
//right_elev.addTo(map);
//Right Bank Style
var rightStyle = {
    "stroke": "#ff7800",
    "weight": 2,
    "opacity": 0.65,
    "color":"yellow"
};
//Right Bank Json
var right_Bank = L.geoJson(null,{
        onEachFeature: right_elev.addData.bind(right_elev),
        style:rightStyle
    });
$.ajax({
  url: "data_pasil/channel_r.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    right_Bank.addData(data);
    right_Bank.addTo(map);
  }
});
// Profile Lines

//Image Loop
var imageData = L.geoJson(null);
//var mark_1, mark_3, mark_2;
$.ajax({
  url: "data_pasil/imagePoints.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    imageData.addData(data);
  }
});

//var imagePoints = L.layerGroup([mark_1, mark_2, mark_3]);



    // reqwest({
    //     url: 'http://kulturnett2.delving.org/api/search?query=*%3A*&format=jsonp&rows=100&pt=59.936%2C10.76&d=1&qf=abm_contentProvider_text%3ADigitaltMuseum',
    //     type: 'jsonp',
    //     success: function (data) {
    //         var photos = [];
    //         data = data.result.items;

    //         for (var i = 0; i < data.length; i++) {
    //             var photo = data[i].item.fields;
    //             if (photo.abm_latLong) {
    //                 var pos = photo.abm_latLong[0].split(',');
    //                 photos.push({
    //                     lat: pos[0],
    //                     lng: pos[1],
    //                     url: photo.delving_thumbnail[0],
    //                     caption: (photo.delving_description ? photo.delving_description[0] : '') + ' - Kilde: <a href="' + photo.delving_landingPage + '">' + photo.delving_collection + '</a>',
    //                     thumbnail: photo.delving_thumbnail[0]
    //                 });
    //             }   
    //         }

    //         photoLayer.add(photos).addTo(map);
    //         //map.fitBounds(photoLayer.getBounds());
    //     }
    //     });
//PhotoLayer

//Overlay Final LayerGroups
var centerPath = L.layerGroup([centerLine]);
var leftPath = L.layerGroup([left_Bank]);
var rightPath = L.layerGroup([right_Bank]);
var imageLayer = L.layerGroup([photoLayer]);
//Overlay Final LayerGroups

//Grouped overlay Control
var groupedOverlays = {
    "Satellite Image": {
        "ALOS": kml
    },
    "River Lines": {
        "Centerline": centerPath,
        "Right Bank":rightPath,
        "Left Bank":leftPath
    },  
    "Geotagged Images":{
        "Images Layer":imageLayer
    }
};

var baseLayers = {};var options=   {};// neccessary variables to make control visible

var goControl = L.control.groupedLayers(baseLayers, groupedOverlays, options);
goControl.addTo(map);
$(".leaflet-control-layers-selector").attr("checked", true);
//Grouped overlay Control

//button tab for elev profiles
$("#elev_control").prepend("<ul class='list-inline' id='elev_btns'><li><button class='btn center_btn' id='center'><h5 class='tab_btn_text'>Centerline</h5></button></li><li><button class='btn left_btn' id='left'><h5 class='tab_btn_text'>Left Bank</h5></button></li><li><button class='btn right_btn' id='right'><h5 class='tab_btn_text'>Right Bank</h5></button></li></ul>");
//button tab for elev profiles

//elev profile switch
$('#center').on("click", function(){
    alert("center");
});
$('#left').on("click", function(){
    alert("left");
});
$('#right').on("click", function(){
    alert("right");
});
//elev profile switch



//Additional formatting
function windowResize(){
    $(window).resize(function() {
        window.setTimeout(function(){
            location.reload(true);
        },1000);
    });
}

windowResize();

$("#elev_rect").css("fill","rgba(176, 150, 150, 0.08);");
$("#elev_rect").css("opacity","0.25");

$('svg.background').find('rect').css("fill","white");
//Additional formatting