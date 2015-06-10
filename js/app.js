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

// //add to map ESRI services
esri.addTo(map);
esriLabel.addTo(map);

var width = $(document).width();
var height = ($(document).height() - 20)/2.5;


//catching window resize
$(window).on('resize',function(){location.reload();});

// Project Area Image Overlay
var projectArea = ' data/Layer0.png',
    imageBounds = [[17.33024057518417,121.077867273394],[17.42196043519033,121.2084673756794]],
    kml = L.imageOverlay(projectArea, imageBounds).addTo(map);

//Project Bounding Box
//bbox style
var bboxStyle = {
    "stroke": "cyan",
    "weight": 1,
    "opacity": 0.65,
    "color":"cyan"
};
//bbox geojson
var bbox = L.geoJson(null,{
        style:bboxStyle
    });
$.ajax({
  url: " data/bounding_box.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    bbox.addData(data);
    bbox.addTo(map);
  }
});

//Pasil B & C Labels
//Pasil B
var pBLabelsStyle = {
    "stroke": "cyan",
    "weight": 3,
    "opacity": 1,
    "color":"white"
};
//Pasil B geojson
var pBLabels = L.geoJson(null,{
        style:pBLabelsStyle
    });
$.ajax({
  url: " data/PasilB.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    pBLabels.addData(data);
    pBLabels.addTo(map);
  }
});
//Pasil C
var pCLabelsStyle = {
    "stroke": "cyan",
    "weight": 3,
    "opacity": 1,
    "color":"blue"
};
//Pasil C geojson
var pCLabels = L.geoJson(null,{
        style:pCLabelsStyle
    });
$.ajax({
  url: " data/PasilC.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    pCLabels.addData(data);
    pCLabels.addTo(map);
  }
});

//Map Labels
var noIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    iconSize: [0, 0],
    iconAnchor: [10, 10],
    labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
});
var pasilB = L.marker([17.359820088709625, 121.11238165403213],{
        icon:noIcon
    })
    .bindLabel('Pasil B', { 
        noHide: true,
        direction:'left',
        offset:[-70,-70],
        className:'pasilB'
    })
    .addTo(map);
var pasilC = L.marker([17.38933482419361, 121.17330383427426],{
        icon:noIcon
    })
    .bindLabel('Pasil C', { 
        noHide: true,
        direction:'right',
        offset:[-70,50],
        className:'pasilB'
    })
    .addTo(map);

// Profile Lines-
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
    "stroke": "white",
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
  url: " data/river.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    centerLine.addData(data);
    centerLine.addTo(map);
  }
});
//initialize elevation control: left
var left_elev = L.control.elevation({  
    position: "bottomleft",
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
  url: " data/channel_l.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    left_Bank.addData(data);
    left_Bank.addTo(map);
  }
});

//initialize elevation control: right
var right_elev = L.control.elevation({  
    position: "bottomleft",
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
    "color":"green"
};
//Right Bank Json
var right_Bank = L.geoJson(null,{
        onEachFeature: right_elev.addData.bind(right_elev),
        style:rightStyle
    });
$.ajax({
  url: " data/channel_r.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    right_Bank.addData(data);
    right_Bank.addTo(map);
  }
});
// Profile Lines

//Cross Section Lines
var cs_elev = L.control.elevation({  
    position: "topleft",
    theme: "lime-theme",
    width: width/3,
    height: height/2,
    margins: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
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
//CS Style
var csStyle={
    "stroke": "#ff7800",
    "weight": 3,
    "opacity": 1,
    "color":"black"
};
//cs json
function onEachFeature(feature, layer) {
    layer.on('click',function(e){
        $('.leaflet-top.leaflet-left div').remove();
        cs_elev.clear();
        cs_elev.addData.bind(cs_elev);
        cs_elev.addData(feature);
        cs_elev.addTo(map);
        
    });
}

map.on('click', function(){
    cs_elev.removeFrom(map);
});

var csProfile = L.geoJson(null,{
    style:csStyle,
    onEachFeature: onEachFeature
});
$.ajax({
    url:"data/supp_cross_section.geojson",
    dataType: 'json',
    async: false,
    success: function(data){
            csProfile.addData(data);
            csProfile.addTo(map);
        }
});


//create linestring json
//profile data container

//Priority cross sections
//Priority Sections
var prio_elev = L.control.elevation({  
    position: "topleft",
    theme: "lime-theme",
    width: width/3,
    height: height/2,
    margins: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
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

var cs_prio = {
    "stroke": "#ff7800",
    "weight": 3,
    "opacity": 1,
    "color":"#FF9800"
};
var csPrio = L.geoJson(null,{
    style:cs_prio,
    onEachFeature: onEachPriority
});
$.ajax({
    url:"data/main_cross_section.geojson",
    dataType: 'json',
    async: false,
    success: function(data){
        csPrio.addData(data);
        csPrio.addTo(map);
    }
});

function onEachPriority(feature, layer) {
    layer.on('click',function(e){
        $('.leaflet-top.leaflet-left div').remove();
        prio_elev.clear();
        prio_elev.addData.bind(prio_elev);
        prio_elev.addData(feature);
        prio_elev.addTo(map);
        
    });
}

map.on('click', function(){
    prio_elev.removeFrom(map);
});
//profile data container
//Cross Section Lines

//PhotoLayer
var photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1 }).on('click', function (evt) {
        evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
            className: 'leaflet-popup-photo',
            minWidth: 400,
            closeOnClick:true,
            closeButton:false
        }).openPopup();
    });

    $.ajax({
  url: " data/imagePoints.geojson",
  dataType: 'json',
  async: false,
  success: function(data) {
    var photos=[];
    var photo_data = data.features;
    //console.log(photo_data.length);

    for(var i=0; i<photo_data.length;i++){
        var url =photo_data[i].properties.NAME;
        //console.log(url);
        photos.push({
            lat:photo_data[i].geometry.coordinates[1],
            lng:photo_data[i].geometry.coordinates[0],
            url:photo_data[i].properties.IMAGE_LINK,
            caption:photo_data[i].properties.NAME+" : "+ photo_data[i].properties.TIMESTAMP,
            thumbnail:"\'data/thumbnails/tn_"+photo_data[i].properties.NAME+".jpg\'"
        });
    }
    photoLayer.add(photos).addTo(map);
  }
});


//Overlay Final LayerGroups
var centerPath = L.layerGroup([centerLine]);
var leftPath = L.layerGroup([left_Bank]);
var rightPath = L.layerGroup([right_Bank]);
var imageLayer = L.layerGroup([photoLayer]);
var bboxLayer = L.layerGroup([bbox]);
var pasilLables = L.layerGroup([pBLabels, pCLabels, pasilB, pasilC]);
var crossLayers = L.layerGroup([csProfile]);
var prioCSlayers = L.layerGroup([csPrio]);
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
    "Cross-sections":{
        "Main":prioCSlayers,
        "Supplementary":crossLayers
    },  
    "Geotagged Images":{
        "Images Layer":imageLayer
    },
    "Other Layers":{
        "Bounding Box":bboxLayer,
        "Pasil B & C":pasilLables
    }
};

var baseLayers = {};var options=   {};// neccessary variables to make control visible

var goControl = L.control.groupedLayers(baseLayers, groupedOverlays, options);
goControl.addTo(map);
$(".leaflet-control-layers-selector").attr("checked", true);
//Grouped overlay Control

//Changing elev profile
var profileFlag = 0;



//elev profile switch
$('#center').on("click", function(){
    if(profileFlag == 0){

    }else if(profileFlag==1){
        left_elev.removeFrom(map);
        center_elev.addTo(map);
        profileFlag=0;
        $("#left_l").css("display","none");
        $("#center_l").css("display","block");
    }else{
        right_elev.removeFrom(map);
        center_elev.addTo(map);
        profileFlag=0;
        $("#right_l").css("display","none");
        $("#center_l").css("display","block");
    }

    //additional formatting to re-render
    $("#elev_rect").css("fill","rgba(176, 150, 150, 0.08);");
    $("#elev_rect").css("opacity","0.25");
    $('svg.background').find('rect').css("fill","white");
});

$('#left').on("click", function(){
    if(profileFlag == 1){

    }else if(profileFlag==2){
        right_elev.removeFrom(map);
        left_elev.addTo(map);
        profileFlag=1;
        $("#right_l").css("display","none");
        $("#left_l").css("display","block");
    }else{
        center_elev.removeFrom(map);
        left_elev.addTo(map);
        profileFlag=1;
        $("#center_l").css("display","none");
        $("#left_l").css("display","block");
    }
    
    //additional formatting to re-render
    $("#elev_rect").css("fill","rgba(176, 150, 150, 0.08);");
    $("#elev_rect").css("opacity","0.25");
    $('svg.background').find('rect').css("fill","white");
});

$('#right').on("click", function(){
    if(profileFlag == 2){

    }else if(profileFlag==0){
        center_elev.removeFrom(map);
        right_elev.addTo(map);
        profileFlag=2;
        $("#center_l").css("display","none");
        $("#right_l").css("display","block");
    }else{
        left_elev.removeFrom(map);
        right_elev.addTo(map);
        profileFlag=2;
        $("#left_l").css("display","none");
        $("#right_l").css("display","block");
    }
    
    //additional formatting to re-render
    $("#elev_rect").css("fill","rgba(176, 150, 150, 0.08);");
    $("#elev_rect").css("opacity","0.25");
    $('svg.background').find('rect').css("fill","white");
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
$(".leaflet-top.leaflet-right").css("margin-top", "0em");
//Additional formatting