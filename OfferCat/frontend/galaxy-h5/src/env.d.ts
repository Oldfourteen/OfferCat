/// <reference types="vite/client" />

declare const __GALAXY_CONFIG__: undefined | {
  apiBase?: string
  graphVersion?: string
  token?: string
}

interface Window {
  /** 由壳页 URL 查询参数 `apiBase` 注入，指向网关下的 `/api/galaxy`（无末尾 /） */
  __GALAXY_API_BASE__?: string
  /** 由壳页 URL 查询参数 `userId` 注入 */
  __GALAXY_USER_ID__?: string | number
}
