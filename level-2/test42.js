//https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  var answer = "";
  answer = s
    .split(" ")
    .map((i) => {
      const a = i.substring(0, 1).toUpperCase();
      const b = i.substring(1).toLowerCase();
      return a + b;
    })
    .join(" ");
  return answer;
}

const s = "3people unFollowed me";
console.log(solution(s));
