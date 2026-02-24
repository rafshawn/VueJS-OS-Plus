<script>
import { useSettingsStore } from '@/stores/settings'

export default {
  name: 'SystemSettings',
  props: {
    nameOfWindow: String,
    content_padding_left: { type: String, default: '15%' },
    content_padding_right: { type: String, default: '15%' },
    content_padding_top: { type: String, default: '5%' },
    content_padding_bottom: { type: String, default: '5%' },
  },
  setup() {
    const settingsStore = useSettingsStore()
    return { settingsStore }
  },
  computed: {
    style() {
      return {
        '--content-padding-left': this.content_padding_left,
        '--content-padding-right': this.content_padding_right,
        '--content-padding-top': this.content_padding_top,
        '--content-padding-bottom': this.content_padding_bottom,
      }
    }
  },
  methods: {
    selectBackground(backgroundPath) {
      this.settingsStore.setBackground(backgroundPath)
    },
    // Helper to get background image URL
    getBackgroundUrl(filename) {
      return new URL(`../../assets/background/${filename}`, import.meta.url).href
    },
  },
}
</script>

<template>
  <div class="system-settings" :style="style">
    <div class="settings-section">
      <h2>Desktop & Dock</h2>
      
      <div class="wallpaper-section">
        <h3>Wallpaper</h3>
        <div class="wallpaper-grid">
          <div
            v-for="bg in settingsStore.backgrounds"
            :key="bg.id"
            class="wallpaper-option"
            :class="{ selected: settingsStore.selectedBackground === bg.path }"
            @click="selectBackground(bg.path)"
          >
            <div class="wallpaper-preview">
              <img :src="getBackgroundUrl(bg.path)" :alt="bg.name" />
            </div>
            <span class="wallpaper-name">{{ bg.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-settings {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.settings-section {
  margin-bottom: 30px;
}

.settings-section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1d1d1f;
}

.wallpaper-section h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #6e6e73;
}

.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.wallpaper-option {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.wallpaper-option:hover {
  transform: scale(1.02);
}

.wallpaper-option.selected {
  border-color: #007aff;
}

.wallpaper-preview {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #f5f5f5;
}

.wallpaper-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wallpaper-name {
  display: block;
  font-size: 12px;
  text-align: center;
  padding: 8px 4px;
  color: #1d1d1f;
}
</style>
