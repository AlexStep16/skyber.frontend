<template>
  <div>
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleBold().run()" class="tiptap-menu__button ml3" :class="editor.isActive('bold') ? 'tiptap-menu__button_is-bubble-active' : ''">
        <BoldSVG />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" class="tiptap-menu__button ml3" :class="editor.isActive('italic') ? 'tiptap-menu__button_is-bubble-active' : ''">
        <CursiveSVG />
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" class="tiptap-menu__button ml3" :class="editor.isActive('strike') ? 'tiptap-menu__button_is-bubble-active' : ''">
        <StrikeSVG />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" class="tiptap-menu__button ml3" :class="editor.isActive('bulletList') ? 'tiptap-menu__button_is-bubble-active' : ''">
        <ListSVG />
      </button>
    </bubble-menu>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { 
  Editor,
  EditorContent,
  BubbleMenu, 
} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import BoldSVG from '/public/pictures/tiptap-icons/bold.svg'
import CursiveSVG from '/public/pictures/tiptap-icons/cursive.svg'
import StrikeSVG from '/public/pictures/tiptap-icons/strike.svg'
import ListSVG from '/public/pictures/tiptap-icons/list.svg'

export default {
  components: {
    EditorContent,
    BubbleMenu, BoldSVG, CursiveSVG,
    StrikeSVG, ListSVG
  },

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {

      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.value, false)
    },
  },

  beforeMount() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: this.placeholder,
        })
      ],
      content: this.value,
      onUpdate: () => {
        let answer = this.editor.getHTML()
        if(answer === '<p></p>') answer = ''
        this.$emit('input', answer)
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
@import "@/common.blocks/tiptap-settings.scss";
.tiptap {
  border: none!important;
}
.tiptap::v-deep .ProseMirror {
  height: auto;
  padding: 5px 0;
  color: #5a5a5a;
}
</style>

<style lang="scss">
/* Basic editor styles */

.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.4rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
  }
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
  }
}

.tiptap-menu {
  border-bottom: 2px solid #eceaea;
  padding: 5px;

  &__button {
    background-color: #ffffff;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 100%;

    &_is-active {
      background-color: #77777750;

      svg path {
        fill: #444;
        stroke: #fff;
      }
    }

    &_is-bubble-active {
      background-color: #77777750!important;

      svg path {
        fill: #fff!important;
      }
    }
  }
  &__button:hover {
    background-color: #77777750;
  }
}
</style>
