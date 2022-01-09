import { css, html, toJson } from '/bb-vue/lib.js'

export default {
  name: 'bbv-json-display',
  template: html`
    <div class="__CMP_NAME__">
      <div class="json_inner">{{ toJson(data) }}</div>
    </div>
  `,
  props: ['data'],
  methods: { toJson },
  scss: css`
    .__CMP_NAME__ {
      .json_inner {
        padding: 10px 5px;
        width: 100%;
        max-height: 300px;
        overflow: auto;
        white-space: pre;
        font-weight: bold;
        color: var(--bbvHackerDarkFgColor);
        background-color: var(--bbvHackerDarkBgColor);
        border-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `,
}