export function getVimeoId(url: string) {
  const regex =
    /(?:vimeo\.com\/|vimeo\.com\/video\/|player\.vimeo\.com\/video\/)(\d+)(?:\/|.*[?&]h=([a-zA-Z0-9]+))?/;
  const match = url.match(regex);

  if (!match) return { id: null, hash: null };

  return {
    id: match[1] || null,
    hash: match[2] || null,
  };
}
