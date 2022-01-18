import { css, html, sleep, Vue, VueUse } from '/bb-vue/lib.js'
import { nuStore, nuShutdown } from '/nuburn/lib/globals.js'
import { termRun } from '/nuburn/lib/term.js'
import { timeDiff } from '/nuburn/lib/date.js'

export default {
  name: 'eye-root',
  template: html`
    <main class="__CMP_NAME__">
      <!-- Main window -->
      <bbv-win title="🧿" no-pad start-width="390px" start-height="320px">
        <eye-macros />
        <template #actions>
          <span><strong>Uptime:</strong> {{ uptime }}</span>
          <bbv-button @click="doShutdown" small>🛑 Shutdown</bbv-button>
        </template>
      </bbv-win>

      <!-- Player window -->
      <bbv-win no-pad :start-open="false" start-width="40%" start-height="50%" title="✨ Player">
        <bbv-json-display fill :data="store.player" />
      </bbv-win>

      <!-- Servers window -->
      <bbv-win no-pad :start-open="false" start-width="40%" start-height="50%" title="💽 Servers">
        <bbv-json-display fill :data="store.srv" />
      </bbv-win>

      <!-- Raw proc window -->
      <bbv-win
        no-pad
        :start-open="true"
        start-width="40%"
        start-height="50%"
        :start-position="{ x: 780, y: 400 }"
        title="🔢 Raw Proc"
      >
        <bbv-json-display fill :data="store.proc" />
      </bbv-win>

      <!-- Processes window -->
      <bbv-win
        no-pad
        no-scroll
        :start-open="true"
        start-width="40%"
        start-height="50%"
        :start-position="{ x: 740, y: 55 }"
        title="🔢 Pretty Proc"
      >
        <eye-proc-list />
      </bbv-win>

      <!-- Add actions to tray -->
      <teleport to="#app-tray">
        <bbv-button title="Reboot" @click="doReboot">💫</bbv-button>
        <bbv-button title="Shutdown" @click="doShutdown">🛑</bbv-button>
      </teleport>
    </main>
  `,
  setup() {
    const { inject, computed } = Vue()
    const { useTimestamp } = VueUse()

    // Store
    const store = nuStore()

    // Uptime
    const startTime = Date.now()
    const timestamp = useTimestamp({ interval: 1000 })
    const uptime = computed(() => timeDiff(startTime, timestamp.value))

    // Shutdown
    const rootShutdown = inject('rootShutdown')
    const doShutdown = () => {
      rootShutdown()
      nuShutdown()
    }
    const doReboot = async () => {
      doShutdown()
      await sleep(1000)
      await termRun('run /nuburn/start.js')
    }

    return {
      store,
      uptime,
      doShutdown,
      doReboot,
    }
  },
  scss: css`
    .__CMP_NAME__ {
    }
  `,
}