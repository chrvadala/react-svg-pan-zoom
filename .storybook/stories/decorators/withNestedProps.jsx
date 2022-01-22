export default (story, {args}) => {
  const nextArgs = {}
  for (const arg in args) {
    const val = args[arg];

    if (arg.startsWith('miniatureProps') || arg.startsWith('toolbarProps')) {
      const [prefix, subProp] = arg.split('.');
      nextArgs[prefix] = nextArgs[prefix] || {}
      if (subProp)
        nextArgs[prefix][subProp] = val
      else
        nextArgs[prefix] = {...nextArgs[prefix], ...val}
    } else {
      nextArgs[arg] = val
    }
  }
  return story({args: nextArgs})
}
