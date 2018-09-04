<template>
  <v-card flat>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      Degree count: {{ degreeCount }}
    </v-card-text>
    <v-card-actions>
      <v-btn small color="info" @click="$emit('showDetails', schoolId)">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'MapPopup',
  props: {
    name: {
      type: String,
      default: ''
    },
    degreeCount: {
      type: Number,
      default: 0
    },
    schoolId: {
      type: Number,
      default: null
    }
  }
}
</script>