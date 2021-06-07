<template>
  <div ref="fileform" @dragover="over = true" @dragleave="over = false" class="drag-and-drop-slot flex flex-center pointer mt5" :class="over ? 'drag-and-drop-slot_over' : ''">
    <span v-if="!over">Добавьте изображение перетащив сюда или нажав на этот блок</span>
    <span v-if="over">Отпустите чтобы добавить</span>
  </div>
</template>

<script>


export default {
  name: 'DragAndDropImage',
  props: ['files'],
  data() {
    return {
      over: false,
    }
  },
  components: {
    
  },
  methods: {
    determineDragAndDropCapable(){
      let div = document.createElement('div');
      return ( ( 'draggable' in div )
              || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window
              && 'FileReader' in window;
    },
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if( this.dragAndDropCapable ){
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));
      this.$refs.fileform.addEventListener('drop', function(e){
        if(e.dataTransfer.files.length === 1) {
          this.files.push(e.dataTransfer.files[0]);
          this.$emit('drop')
          this.over = false
        }
      }.bind(this));
    }
  }
}

</script>

<style lang="scss" scoped>
  .drag-and-drop-slot {
    width: 100%;
    height: 100px;
    border-radius: 15px;
    border: 4px dashed #bdbdbd;
    color: #bdbdbd;
    font: {
      family: 'Roboto', sans-serif;
      size: 0.9em;
      weight: bold;
    }

    &_over {
      border: 4px solid #bdbdbd;
    }
  }
</style>
