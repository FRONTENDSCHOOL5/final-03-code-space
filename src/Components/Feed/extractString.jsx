// 제목, 본문 찾기 함수
export function extractString(inputString, extractType) {
  if (inputString === undefined) {
    return null;
  }
  const startIndex = inputString.indexOf(`\\"${extractType}:`);
  if (startIndex === -1) {
    return null; // 해당 타입의 문자열이 없으면 null 반환
  }

  const endIndex = inputString.indexOf('\\"', startIndex + extractType.length + 3);
  if (endIndex === -1) {
    return null; // \\" 다음에 \\" 문자열이 없으면 null 반환
  }

  const extractedString = inputString.substring(startIndex + extractType.length + 3, endIndex);
  const remainingString = inputString.substring(endIndex + 2);
  return {
    extracted: extractedString,
    remaining: remainingString,
  };
}
