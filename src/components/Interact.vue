<template>
  <div ref="elRef">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Interact',
  props: {
    draggable: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false
    },
    dragOption: {
      type: Object,
      default: () => ({})
    },
    resizeOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['dragmove', 'resizemove', 'click'],
  setup(props, { emit, expose }) {
    const elRef = ref(null)
    let interactable = null

    onMounted(() => {
      if (!elRef.value) return

      interactable = interact(elRef.value)

      if (props.draggable) {
        interactable.draggable(props.dragOption)
        interactable.on('dragmove', (event) => emit('dragmove', event))
      }

      if (props.resizable) {
        interactable.resizable(props.resizeOption)
        interactable.on('resizemove', (event) => emit('resizemove', event))
      }

      elRef.value.addEventListener('click', () => emit('click'))
    })

    onBeforeUnmount(() => {
      if (interactable) {
        interactable.unset()
      }
    })

    return {
      elRef
    }
  }
})
</script>
