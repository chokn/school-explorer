<template>
<l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <v-marker-cluster  :options="clusterOptions" @clusterclick="click()">
        <l-geo-json v-if="geojson" :geojson="geojson"></l-geo-json>
    </v-marker-cluster>
</l-map>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'

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
            default: null
            
        },
    },
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        'v-marker-cluster': Vue2LeafletMarkercluster

    },
    data () {
        let geoJsonOptions = {
            onEachFeature: function (feature, layer) {
            layer.getLatLng = function() { return this.getBounds().getCenter() }
            layer.setLatLng = function() { }
            layer._latlng = layer.getLatLng();
            }
        }

    return {
        /* eslint no-undef: "off"*/
        zoom:3,
        center: L.latLng(33.64566, -86.6836),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        geoJsonOptions,
        clusterOptions: {}
        }
    },
    methods: {
      click: function () {
        console.log("clusterclick")

      }
    }
}
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  .vue2leaflet-map {
      z-index: 0;
  }
</style>
