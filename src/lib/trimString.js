export default function trimString(inputString, maxLength = 280) {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.slice(0, maxLength - 3) + '...';
  }
}
