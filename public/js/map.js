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


  // Fetch hosts from API
  async function getHosts() {
    const res = await fetch('/api/v1/hosts');
    const data = await res.json();

    const hosts = data.data.map(host => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            host.location.coordinates[0],
            host.location.coordinates[1]
          ]
        },
        properties: {
          host: host.hostId,
          icon: 'host'
        }
      };
    });

    loadMap(hosts);
  }

  // Load map with hosts
  function loadMap(hosts) {
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
                    'coordinates': [0, 0]
                  }
                }
              ]
            }
          });
        }
      );
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: hosts
          }
        },
        layout: {
          'icon-image': 'cat',
          'icon-size': 0.09,
          'text-field': '{ hostId }',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      });
    });
  }

  getHosts();
}


function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

