export function renderDOM(query: string, block: any) {
  const root = document.getElementById(query);

  if (root) {
    const content = block.getContent();
    if (content) {
        root.appendChild(content);
    }
  }

  block.dispatchComponentDidMount();

  return root;
}
