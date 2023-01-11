const mods = new Set<string>();

const ssrCtx = (id: string, fn?: Function) => {
  if (fn !== undefined) {
    const oldApply = fn.apply;
    fn.apply = (args) => {
      console.log("hello world");
      oldApply(args);
    };
  }
  mods.add(id);
  return mods;
};

export default ssrCtx;
