import Block from '../services/Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    const content = block.getContent();
    if (content) {
        root.replaceChildren(content);
    }
  }
  return root;
}
