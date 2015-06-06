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

//initialize elevation control
var el = L.control.elevation({	
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

el.addTo(map);

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

// Sample Data
var gjl = L.geoJson(null,{
        onEachFeature: el.addData.bind(el)});
$.getJSON("data/Path.geojson",function(data){
    gjl.addData(data);
    gjl.addTo(map);
});

$('svg.background').find('rect').css("fill","white");

//Image Loop

var imageData = L.geoJson(null);
$.getJSON("data/imagePoints.geojson", function (data) {
    imageData.addData(data);

    var mark_1 = L.circleMarker(imageData.getLayers()[0]._latlng, {color: "red"}).addTo(map);
    var mark_2 = L.circleMarker(imageData.getLayers()[1]._latlng, {color: "red"}).addTo(map);
    var mark_3 = L.circleMarker(imageData.getLayers()[2]._latlng, {color: "red"}).addTo(map);

    $('#imageModal img').on('click',function(){
        $("#imageModal").hide();
    });
    
    mark_1.on('click',function(){
        $("#imageModal img").attr("src",imageData.getLayers()[0].feature.properties.IMAGE_LINK);
        $("#imageModal").show();
    });
    mark_2.on('click',function(){
        $("#imageModal img").attr("src",imageData.getLayers()[1].feature.properties.IMAGE_LINK);
        $("#imageModal").show();
    });
    mark_3.on('click',function(){
        $("#imageModal img").attr("src",imageData.getLayers()[2].feature.properties.IMAGE_LINK);
        $("#imageModal").show();
    });



});

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


// Project Area Image Overlay
var projectArea = 'data/Layer0.png',
    imageBounds = [[17.33024057518417,121.077867273394],[17.42196043519033,121.2084673756794]];

    L.imageOverlay(projectArea, imageBounds).addTo(map);
