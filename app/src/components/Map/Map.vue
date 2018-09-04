<template>
<l-map :zoom.sync="zoom" :center.sync="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <v-marker-cluster  :options="clusterOptions" @clusterclick="click()">
        <l-geo-json v-if="geojson" :geojson="geojson" :options="geoJsonOptions"></l-geo-json>
    </v-marker-cluster>
</l-map>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import Vue from 'vue'
import MapPopup from './MapPopup.vue'

function onEachFeature (feature, layer) {
  let popupContent = Vue.extend(MapPopup)
  let popup = new popupContent({ 
    propsData: {
      name: feature.properties.name,
      schoolId: feature.properties.id,
      degreeCount: feature.properties.degreeCount
    }
  })
  layer.bindPopup(popup.$mount().$el)
}



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
        focusedFeatureId: {
            type: Number,
            default: null
        }
    },
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        'v-marker-cluster': Vue2LeafletMarkercluster

    },
    data () {
        // let geoJsonOptions = {
        //     onEachFeature: onEachFeature
        // }

    return {
        /* eslint no-undef: "off"*/
        zoom:3,
        center: L.latLng(33.64566, -86.6836),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        geoJsonOptions: {
            onEachFeature: onEachFeature
        },
        clusterOptions: {}
        }
    },
    computed: {
    },
    methods: {
      click: function () {
      }
    },
    watch: {
        // eslint-disable-next-line
        focusedFeatureId(newId, _oldValue) {
            // Set zoom and center to selected school
            this.zoom = 12
            let focusedFeature = this.geojson.features.find(item => item.properties.id === newId)
            // geojson geometry is in [longitude, latitude] order
            let coords = focusedFeature.geometry.coordinates
            this.center = L.latLng(coords[1], coords[0])
        }
    },
}
</script>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  .vue2leaflet-map {
      z-index: 0;
  }
</style>
