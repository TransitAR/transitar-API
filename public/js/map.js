navigator.geolocation.watchPosition(data => {
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
});

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;

  console.log("Your current position is:");
  console.log("Latitude : " + crd.latitude);
  console.log("Longitude: " + crd.longitude);
  console.log("More or less " + crd.accuracy + " meters.");

  mapboxgl.accessToken =
    "pk.eyJ1IjoianVsaWV0YWZsdXgiLCJhIjoiY2s2OWI1NDRkMGUxNzNrcG8wa2UybGV3dSJ9.QMOmG279ABpD0HWyoCIHvg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11",
    zoom: 12,
    center: [crd.longitude, crd.latitude]
  });

  function loadMap() {
    map.on('load', function () {
      map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('cat', image);
          map.addSource('point', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [crd.longitude, crd.latitude]
                  },
                  properties: {
                    hostId: '0001',
                    icon: 'host'
                  }
                }
              ]
            }
          });
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
              'icon-image': 'cat',
              'icon-size': 1.25,
              'text-field': '{hostId}',
              'text': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.9],
              'text-anchor': 'top'
            }
          });
        }
      );
    });
  }
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

