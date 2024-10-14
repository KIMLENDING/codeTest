// https://school.programmers.co.kr/learn/courses/30/lessons/12939

function solution(s) {
  const tmp = s.split(" ");
  const m = Math.min(...tmp);
  const M = Math.max(...tmp);
  var answer = `${m} ${M}`;
  return answer;
}
const s = "-1 -2 -3 -4";
console.log(solution(s)); // "1 4"
