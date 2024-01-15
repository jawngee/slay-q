import Highlight from '/Volumes/Projects/Products/Slay/slay-lib/node_modules/.pnpm/@nuxtjs+mdc@0.3.0/node_modules/@nuxtjs/mdc/dist/runtime/shiki/index.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: Highlight, options: {"src":"/Volumes/Projects/Products/Slay/slay-lib/node_modules/.pnpm/@nuxtjs+mdc@0.3.0/node_modules/@nuxtjs/mdc/dist/runtime/shiki/index.mjs"} },
}

export const highlight = {"theme":{"dark":"github-dark","default":"github-light"},"preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"]}