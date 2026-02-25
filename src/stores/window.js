import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', {
  state: () => ({
    fullscreenWindowHeight: window.innerHeight + 'px',
    activeWindow: 'nil',
    activeWindows: [],
    zIndex: 2,
    aboutDialogOpen: false,
    appleMenuOpen: false,
    fileMenuOpen: false,
    controlCenterOpen: false,
    windows: [
      {
        windowId: 'LoremIpsum',
        windowState: 'close',
        displayName: 'Lorem Ipsum',
        windowComponent: 'window',
        windowContent: 'Placeholder',
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        position: 'absolute',
        positionX: '10vw',
        positionY: '15vh',
        iconImage: 'placeholder.png',
        altText: 'Placeholder Icon',
        fullscreen: false
      },
      {
        windowId: "MacOS",
        windowState: "close",
        displayName: "MacOS Theme",
        windowComponent: 'OSWindow',
        windowContent: 'MacOS',
        windowContentPadding: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
        position: "absolute",
        positionX: "1vw",
        positionY: "1vh",
        iconImage: "placeholder.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "Windows",
        windowState: "close",
        displayName: "Windows Theme",
        windowComponent: 'OSWindow',
        windowContent: 'Windows',
        windowContentPadding: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
        position: "absolute",
        positionX: "1vw",
        positionY: "1vh",
        iconImage: "placeholder.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "Blueprint",
        windowState: "close",
        displayName: "Blueprint Theme",
        windowComponent: 'OSWindow',
        windowContent: 'Blueprint',
        windowContentPadding: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
        position: "absolute",
        positionX: "1vw",
        positionY: "1vh",
        iconImage: "placeholder.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "PhotoWindow",
        windowState: "close",
        displayName: "Photos",
        windowComponent: 'window',
        windowContent: 'Photos',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "placeholder.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "AboutMac",
        windowState: "close",
        displayName: "About This Mac",
        windowComponent: 'AboutWindow',
        windowContent: 'AboutMac',
        windowContentPadding: {
            top: null,
            right: null,
            bottom: null,
            left: null
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "10vh",
        iconImage: "placeholder.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "SystemSettings",
        windowState: "close",
        displayName: "System Settings",
        windowComponent: 'SettingsWindow',
        windowContent: 'SystemSettings',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "15vw",
        positionY: "15vh",
        iconImage: "Settings.png",
        altText: "Settings Icon",
        fullscreen: false
      },
      // register your new windows here
    ],
  }),

  getters: {
    getActiveWindow: (state) => state.activeWindow,
    getWindowById: (state) => (id) => state.windows.find(w => w.windowId === id),
    getWindowFullscreen: (state) => (id) => {
      const win = state.windows.find(w => w.windowId === id)
      return win ? win.fullscreen : false
    },
    getWindows: (state) => state.windows,
    getActiveWindows: (state) => state.activeWindows,
    getFullscreenWindowHeight: (state) => state.fullscreenWindowHeight,
  },

  actions: {
    setActiveWindow(windowId) {
      this.activeWindow = windowId
    },

    pushActiveWindow(window) {
      this.activeWindows.push(window)
    },

    popActiveWindow(window) {
      const index = this.activeWindows.indexOf(window)
      if (index !== -1) {
        this.activeWindows.splice(index, 1)
      }
    },

    zIndexIncrement(windowID) {
      this.zIndex += 1
      const el = document.getElementById(windowID)
      if (el) {
        el.style.zIndex = this.zIndex
      }
    },

    setFullscreenWindowHeight(height) {
      this.fullscreenWindowHeight = height
    },

    setAboutDialogOpen(isOpen) {
      this.aboutDialogOpen = isOpen
    },

    setAppleMenuOpen(isOpen) {
      this.appleMenuOpen = isOpen
    },

    setFileMenuOpen(isOpen) {
      this.fileMenuOpen = isOpen
    },

    setControlCenterOpen(isOpen) {
      this.controlCenterOpen = isOpen
    },

    setFullscreen(payload) {
      const window = this.windows.find(w => w.windowId === payload.windowID)
      if (window) {
        window.fullscreen = payload.fullscreen
      }
    },

    setWindowState(payload) {
      const window = this.windows.find(w => w.windowId === payload.windowID)

      const preventAppendingOpenWindow = ['open', 'minimize'].includes(window.windowState)

      if (payload.windowState === 'open') {
        window.windowState = 'open'
        setTimeout(() => this.zIndexIncrement(payload.windowID), 0)
        setTimeout(() => this.setActiveWindow(payload.windowID), 0)
        if (!preventAppendingOpenWindow) {
          setTimeout(() => this.pushActiveWindow(window), 0)
        }
      } else if (payload.windowState === 'close') {
        window.windowState = 'close'
        setTimeout(() => this.popActiveWindow(window), 0)
        setTimeout(() => this.setActiveWindow('nil'), 0)
      } else if (payload.windowState === 'minimize') {
        window.windowState = 'minimize'
        this.setActiveWindow('nil')
      }
    },
  },
})