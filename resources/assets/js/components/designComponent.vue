

<template>
  <div class="parent" style="width:500px;height:500px;border: 1px solid red;position:relative" >
        <vue-draggable-resizable :resizable="true" :parent="'parent'">
            <p>You can drag me around and resize me as you wish.</p>
            {{url}}
        </vue-draggable-resizable>
        </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


export default {
  name: 'designComponent',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  }
}
</script>
