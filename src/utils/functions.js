export function getCustomStructure(obj) {
  return Object.entries(obj).map(([property, value]) => ({property, value}));
}