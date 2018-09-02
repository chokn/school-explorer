<template>
<l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json :geojson="geojson"></l-geo-json>
</l-map>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet';

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./assets/marker-icon-2x.png'),
  iconUrl: require('./assets/marker-icon.png'),
  shadowUrl: require('./assets/marker-shadow.png')
})
export default {
    props: {
        geojson: {
            type: Object,
            default: function () {
                return {
                    type: "FeatureCollection",
                    features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [
                            -111.965232,
                            33.403653
                            ]
                        },
                        properties: {
                            id: 484613,
                            name: "University of Phoenix-Arizona",
                            degreeCount: 59390,
                            lon: -111.965232,
                            lat: 33.403653
                        }
                    }]
                }
            } 
        },
    },
    components: {
        LMap,
        LTileLayer,
        // LMarker,
        LGeoJson
    },
    data () {
    return {
        /* eslint no-undef: "off"*/
        zoom:3,
        center: L.latLng(33.64566, -86.6836),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }
    }
}
</script>

<style>
</style>
