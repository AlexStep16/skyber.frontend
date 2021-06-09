<template>
  <div>
    <div class="tiptap-menu flex flex-align-center mb6">
      <button @click="editor.chain().focus().toggleBold().run()" class="tiptap-menu__button ml3">
        <BoldSVG />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" class="tiptap-menu__button ml3">
        <CursiveSVG />
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" class="tiptap-menu__button ml3">
        <StrikeSVG />
      </button>
    </div>
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleBold().run()" class="tiptap-menu__button ml3">
        <BoldSVG />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" class="tiptap-menu__button ml3">
        <CursiveSVG />
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" class="tiptap-menu__button ml3">
        <StrikeSVG />
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
import BoldSVG from '../../public/pictures/tiptap-icons/bold.svg'
import CursiveSVG from '../../public/pictures/tiptap-icons/cursive.svg'
import StrikeSVG from '../../public/pictures/tiptap-icons/strike.svg'

export default {
  components: {
    EditorContent,
    BubbleMenu, BoldSVG, CursiveSVG,
    StrikeSVG
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

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: this.placeholder,
        })
      ],
      content: this.value,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  min-height: 200px;
  padding: 0 13px;
  p {
    margin: 0;
  }
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
}

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
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
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
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.tiptap-menu {
  border-bottom: 2px solid #eceaea;
  padding: 5px;

  &__button {
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 100%;
  }
  &__button:hover {
    background-color: #77777750;
  }
}
</style>

<style lang="scss" scoped>
::v-deep {
  /* Placeholder (at the top) */
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

  /* Placeholder (on every new line) */
  /*.ProseMirror p.is-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }*/
}
</style>
