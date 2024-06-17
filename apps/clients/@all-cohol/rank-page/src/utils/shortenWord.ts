export default function shortenWord(word: string, length: number) {
  return word.length > length - 3 ? word.slice(0, length) + '...' : word;
}
