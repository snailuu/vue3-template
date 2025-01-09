import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const moduleFiles = import.meta.glob('./*.ts', {
  eager: true,
  import: 'default',
})

try {
  Object.entries(moduleFiles).forEach(([path, module]) => {
    const value = module as RouteRecordRaw | RouteRecordRaw[]
    if (!value) {
      console.warn(`路由模块 ${path} 没有默认导出`)
      return
    }

    if (Array.isArray(value))
      routes.push(...value)
    else
      routes.push(value)
  })
}
catch (error) {
  console.error('路由模块加载失败:', error)
}

export default routes
