# Vite SSR with React 18

This repo demo how to do SSR using React 18 `renderToPipeableStream` while still
be able to use Vite Hot Module Reload (HMR) during development. Do note that the
code here is more like work-around while Vite doesn't officially support React
stream rendering. **Use this in your project with caution**.

## Try it

This project use `pnpm`. Try `pnpm dev` and editing CSS, JS and see HMR in
action. Try `pnpm preview` and use `curl http://localhost:4173` to see SSR HTML.

## Which problems were fixed?

### `React refresh preamble was not loaded`

If you tried to follow the [SSR guide on Vite website][vite-ssr] and the
[ssr-react][] example and rewrite the code use `renderToPipeableStream`, you
might hit that error, which cause Vite HMR stop working:

It's because after SSR, the root node is considered as both `wasMounted` and
`isMounted` by `react-refresh` [runtime script][rr]. So, `react-refresh` doesn't
handle that root node. I rewrite [`vite-plugin-react` preamble][preamble] to
work around that. See [`./src/refresh-hack.js`](./src/refresh-hack.js).

### Production `bootstrapModules`

`renderToPipeableStream` want a bootstrap script to do client side hydration. We
can simply put `./src/main.tsx` in `bootstrapScriptModules` in dev mode since
Vite will transpile it on the fly for us. However, in production mode, we need
to use the correct path to the bundled JS. That was done in `server.ts` by
manually looks for the compiled `./dist/client/assets/main-*.js`.

### CSS is not loaded in SSR build

If you use CSS-in-JS libs, then your CSS is render via JS, and you won't see
this problem. However, if you import CSS file in the JS file, then the
production build won't load any CSS. It's because there are no HTML file for
Vite to inject them. The work around is to use `vite-plugin-css-injected-by-js`
to bundle CSS into JS file.

[vite-ssr]: https://vitejs.dev/guide/ssr.html
[ssr-react]:
  https://github.com/vitejs/vite-plugin-react/tree/main/playground/ssr-react
[rr]:
  https://github.com/facebook/react/blob/main/packages/react-refresh/src/ReactFreshRuntime.js#L553
[preamble]:
  https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/src/fast-refresh.ts#L30
