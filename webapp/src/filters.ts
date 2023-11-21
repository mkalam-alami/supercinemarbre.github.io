export function formatDate(isoString: string) {
  if (isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  } else {
    return '???';
  }
}

export function formatTime(isoString: string) {
  if (isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  } else {
    return '???';
  }
}

export function formatOrdinal(n: number) {
  if (n === 1) {
    return n.toString() + 'er';
  } else {
    return n.toString() + 'e';
  }
}
