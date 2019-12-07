<template>
    <div>
        <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
            <div>
                <b-button :class="{'is-active': isActive.bold()}" @click="commands.bold"
                    variant="info" size="sm">
                    <fa icon="bold" />
                </b-button>
                <b-button :class="{'is-active': isActive.italic()}" @click="commands.italic"
                    variant="info" size="sm">
                    <fa icon="italic" />
                </b-button>
                <b-button :class="{'is-active': isActive.underline()}"  @click="commands.underline"
                    variant="info" size="sm">
                    <fa icon="underline" />
                </b-button>
                <b-button :class="{'is-active': isActive.heading({level: 1})}" @click="commands.heading({level: 1})" 
                    variant="info" size="sm">
                    <strong>H1</strong>
                </b-button>
                <b-button :class="{'is-active': isActive.heading({level: 2})}" @click="commands.heading({level: 2})" 
                    variant="info" size="sm">
                    <strong>H2</strong>
                </b-button>
                 <b-button :class="{'is-active': isActive.heading({level: 3})}" @click="commands.heading({level: 3})" 
                    variant="info" size="sm">
                    <strong>H3</strong>
                </b-button>
                <b-button :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph"
                    variant="info" size="sm">
                    <fa icon="paragraph" />
                </b-button>
                <b-button :class="{'is-active': isActive.bullet_list()}"  @click="commands.bullet_list"
                    variant="info" size="sm">
                    <fa icon="list-ul" />
                </b-button>
                <!-- <b-button @click="editor.clearContent(true)" class="float-right" variant="info" size="sm">
                    <fa :icon="['far', 'trash-alt']" />
                </b-button> -->
            </div>
        </editor-menu-bar>
        <editor-content :editor="editor" class="bg-black-1 py-3 px-2 my-3 rounded" /> 
        <b-button @click="emitDescripcionHTML" variant="info">Actualizar</b-button>
    </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar} from 'tiptap'
import { Heading, Bold, Italic, Link, Underline, BulletList, ListItem } from 'tiptap-extensions'
export default {
    components: {
        EditorContent,
        EditorMenuBar
    },
    data() {
        return {
            editor: null,
            descripcion_nueva: ''
        }
    },
    props: ['descripcion'],
    mounted(){
        this.descripcion_nueva = this.descripcion;
        this.editor = new Editor({
                content: this.descripcion_nueva,
                extensions: [
                    new Heading({
                        levels: [1, 2, 3]
                    }),
                    new Bold(),
                    new Italic(),
                    new Underline(),
                    new BulletList(), 
                    new ListItem(),
                    new Link()
                ]
            });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        emitDescripcionHTML() {
            let descripcionHTML = this.editor.getHTML();
            this.$emit('actualizarDescripcion', descripcionHTML);
        }
    }
}
</script>
<style>
    p {
        margin-bottom: 0;
    }
</style>