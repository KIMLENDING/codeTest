// https://school.programmers.co.kr/learn/courses/30/lessons/42746
function solution(numbers) {
  numbers = numbers.map((number) => number.toString());
  numbers.sort((a, b) => b + a - (a + b));
  return numbers[0] === "0" ? "0" : numbers.join("");
}
const numbers = [3, 30, 34, 5, 9];
console.log(solution(numbers));
