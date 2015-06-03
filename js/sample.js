//Initialize Leaflet Map

var map = new L.Map('map').setView([17.35643965773389, 121.14413665771483], 13);

var url = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg',
	attr ='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	service = new L.TileLayer(url, {subdomains:"1234",attribution: attr});


var width = $(document).width() - 40;
var height = ($(document).height() - 20)/2.5;

//initialize elevation control
var el = L.control.elevation({	
	position: "bottomleft",
    theme: "googleEarth-theme",
    width: width,
    height: height,
    margins: {
        top: 30,
        right: 60,
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

var geojson;

var gjl = L.geoJson(null,{
		onEachFeature: el.addData.bind(el)});
$.getJSON("js/Path.geojson", function (data) {
  gjl.addData(data);
});

gjl.addTo(map);

map.addLayer(service);

$('svg.background').find('rect').css("fill","white");

var imageData = L.geoJson(null);
$.getJSON("data/imagePoints.geojson", function (data) {
    imageData.addData(data);
    // for(var i=0; i<imageData.getLayers().length;i++){
    //     var lat = imageData.getLayers()[i]._latlng.lat;
    //     var lng = imageData.getLayers()[i]._latlng.lng;
    //     //L.marker([lat,lng]).addTo(map);
    //     L.circleMarker([lat,lng], {"id":"mark_"+i}).addTo(map);
    // }

    var mark_1 = L.circleMarker(imageData.getLayers()[0]._latlng).addTo(map);
    var mark_2 = L.circleMarker(imageData.getLayers()[1]._latlng).addTo(map);
    var mark_3 = L.circleMarker(imageData.getLayers()[2]._latlng).addTo(map);

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

