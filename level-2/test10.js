// https://school.programmers.co.kr/learn/courses/30/lessons/12909
function solution(s) {
  let state = 0;
  for (const i of s) {
    if (i === "(") {
      state++;
    } else {
      state--;
    }
    if (state < 0) {
      return false;
    }
  }

  return state === 0 ? true : false;
}
const s = "()()";
console.log(solution(s));

function solution1(s) {
  let state = 0;
  for (const i of s) {
    state += i === "(" ? 1 : -1;
    if (state < 0) {
      return false;
    }
  }

  return state === 0 ? true : false;
}
