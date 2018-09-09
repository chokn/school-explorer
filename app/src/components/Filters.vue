<template>
<v-card flat>
          <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Filters
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>

      <v-list two-line>

        <v-subheader>Academics</v-subheader>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>school</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
                Minimum degree
            </v-list-tile-title>
            <v-btn-toggle :input-value="degree" @change="$emit('update:degree', $event)">
              <v-btn flat value="bachelors">
                ba/bs
              </v-btn>
              <v-btn flat value="masters">
                ma/ms
              </v-btn>
              <v-btn flat value="doctorate">
                phd/md
              </v-btn>
            </v-btn-toggle>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-subheader>Demographics</v-subheader>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>wc</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Gender</v-list-tile-title>
            <v-btn-toggle :input-value="gender" @change="$emit('update:gender', $event)" mandatory>
                  <v-btn flat value="all">
                    all
                  </v-btn>
                  <v-btn flat value="men">
                    male
                  </v-btn>
                  <v-btn flat value="women">
                    female
                  </v-btn>
            </v-btn-toggle>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-avatar>
                <v-icon>public</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-select
                    :items = "raceEthnicitySelections"
                    label="Race/ethnicity"
                    clearable
                    multiple
                    v-model="selectedRaceEthnicity"
                    @input="$emit('update:raceEthnicity', $event)"
                >
                    <template
                        slot="selection"
                        slot-scope="{ item, index }"
                        >
                        <v-chip v-if="index === 0" small>
                            <span class="text-truncate caption truncate">{{ truncate(item) }}</span>
                        </v-chip>
                        <span
                            v-if="index === 1"
                            class="grey--text caption"
                        >(+{{ selectedRaceEthnicity.length - 1 }} others)</span>
                        </template>
                </v-select>

            </v-list-tile-content>

        </v-list-tile>
      </v-list>

</v-card>

</template>

<script>
export default {
    props: {
        gender: {
            type: String,
            default: 'all'
        },
        degree: {
            type: String,
            default: 'none'
        },
        raceEthnicity: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            raceEthnicitySelections: [
                "American Indian or Alaska Native",
                "Asian",
                "Black or African American",
                "Hispanic or Latino",
                "Native Hawaiian or Other Pacific Islander",
                "White",
                "Two or more races",
                "Race/ethnicity unknown",
                "Nonresident alien"
            ],
            selectedRaceEthnicity: []
        }
    },
    methods: {
        truncate(description) {
            if (description.length > 15) {
                return description.slice(0, 16).concat('...')
            } else {
                return description
            }
            
        }
    },

}
</script>

<style scoped>
    .truncate {
        overflow: hidden;
      text-overflow: ellipsis;
    }
</style>
