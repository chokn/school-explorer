<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
     
    </v-navigation-drawer>
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-left
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>College talent finder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <Map v-if="geojson" :geojson='geojson' :focused-feature-id="selectedSchoolId"></Map>
    </v-content>
    <v-navigation-drawer
      fixed
      v-model="drawerRight"
      right
      clipped
      app
      width=500
    >
      <v-toolbar dense flat class="transparent">
          <v-text-field
            v-model="search"
            prepend-icon="search"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
      </v-toolbar>
      <v-data-table
        v-if="schoolsTableData"
        disable-initial-sort
        :headers="schoolsTableHeaders"
        :items="schoolsTableData"
        :search="search"
        @input="selectSchool"
      >
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.degreeCount }}</td>
        </tr>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
        
      </v-data-table>
    </v-navigation-drawer>
        
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Map from './components/Map/Map.vue'
import GET_GEOJSON from './graphql/GetGeojson.gql'
export default {
  name: 'App',
  components: {
    Map
  },
  data () {
    return {
      drawer: false,
      drawerRight: false,
      title: 'School explorer',
      geojson: null,
      schoolsTableHeaders: [
        {
          text: "ID",
          value: "id",
          sortable: false
        },
        {
          text: "School name",
          value: "name"
        },
        {
          text: "Degree count",
          value: 'degreeCount'
        }
      ],
      search: '',
      selectedSchoolId: null
    }
  },
  apollo: {
    geojson: {
      query: GET_GEOJSON,
      update: data => data.degreesBySchool
    }
  },
  computed: {
    schoolsTableData() {
      if(!this.geojson) return null

      return this.geojson.features.map(element => {
        let propertiesObject = element.properties
        return {
          id: propertiesObject.id,
          name: propertiesObject.name,
          degreeCount: propertiesObject.degreeCount
        }
      })
    }
  },
  methods: {
    selectSchool(args) {
      this.selectedSchoolId=args[0].id
    }
  },
}
</script>
