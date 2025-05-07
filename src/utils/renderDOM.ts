export function renderDOM(query: string, block: any) {
  const root = document.getElementById(query);

  if (root) {
    console.log(block);
    const content = block.getContent();
    if (content) {
        root.appendChild(content);
    }
  }

  block.dispatchComponentDidMount();

  return root;
}
