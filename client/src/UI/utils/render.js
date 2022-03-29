export function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

export function disRender(query, block) {
  const root = document.querySelector(query);
  root.removeChild(block.getContent());
  return root;
}