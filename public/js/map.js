// 1. Initialize the MapLibre canvas layout 
const map = new maplibregl.Map({
    container: 'map', 
    style: `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${mapToken}`, 
    center: listing.geometry.coordinates, // Starting position [Lng, Lat]
    zoom: 9 
});

// 2. Drop the pinpoint marker and assign your interactive course video stay popup
const marker = new maplibregl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new maplibregl.Popup({ offset: 25 })
            .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`)
    )
    .addTo(map);