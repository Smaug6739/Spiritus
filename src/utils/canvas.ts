export function applyText(canvas: any, text: any) {
  const ctx = canvas.getContext("2d");
  let fontSize = 60;
  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 350);
  return ctx.font;
}
