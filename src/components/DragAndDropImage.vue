<template>
  <div ref="fileform" @dragover="over = true" @dragleave="over = false" class="drag-and-drop-slot flex flex-vertical flex-center mt5" :class="over ? 'drag-and-drop-slot_over' : ''">
    <p v-if="!over" style="font-size: 1.15em;">Перетащите изображение сюда</p>
    <p v-if="over" style="font-size: 1.15em;">Отпустите чтобы добавить</p>
    <p class="mt6">Или</p>
    <button @click.prevent="clickImage" class="button button_theme-purple flex flex-center drag-and-drop-slot__button mt6">
      <img src="/pictures/image-white.svg" class="mr5" width="22px">Выбрать файл
    </button>
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
    clickImage() {
      this.$emit('clickImage')
    },
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png']
    if( this.dragAndDropCapable ){
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));
      this.$refs.fileform.addEventListener('drop', function(e){
        if(e.dataTransfer.files.length === 1 && fileTypes.includes(e.dataTransfer.files[0].type)) {
          this.files.push(e.dataTransfer.files[0]);
          this.$emit('drop')
        }
        this.over = false
      }.bind(this));
    }
  }
}

</script>

<style lang="scss" scoped>
  .drag-and-drop-slot {
    width: 100%;
    height: 170px;
    border-radius: 15px;
    border: 4px dashed #a1a1a1;
    color: #a1a1a1;
    font: {
      family: 'Roboto', sans-serif;
      size: 0.9em;
      weight: bold;
    }

    &_over {
      border: 4px dashed #6769fc;
    }

    &__button {
      padding: 11px 15px;
      font-size: 1.05em;
      border-radius: 15px;
    }

    > p {
      margin: 0;
      cursor: default;
    }
  }
</style>
