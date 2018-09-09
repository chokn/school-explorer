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

      <v-list subheader>
        <v-subheader>Demographics</v-subheader>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>accessibility_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Gender
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
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

        <v-divider></v-divider>
        <v-subheader>Academics</v-subheader>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>school</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Minimum degree
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
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
        }
    },

}
</script>

<style>

</style>
