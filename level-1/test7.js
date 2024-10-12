function solution(t, p) {
  var answer = 0;
  const plength = p.length;
  for (let i = 0; i < t.length; i++) {
    const end = i + plength;
    if (end > t.length) {
      break;
    }
    if (+t.slice(i, end) <= +p) {
      // 꿀팁 : 문자열을 숫자로 변환할 때 +를 사용하면 됨
      answer++;
    }
  }
  return answer;
}
const t = "500220839878";
const p = "7";
console.log(solution(t, p));
