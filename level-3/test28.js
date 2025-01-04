// https://school.programmers.co.kr/learn/courses/30/lessons/42628

function solution(operations) {
  var answer = [];
  operations.forEach((operation) => {
    const [op, num] = operation.split(" ");
    if (op === "I") {
      answer.push(+num);
    } else if (op === "D" && answer.length > 0) {
      if (num === "1") {
        answer.splice(answer.indexOf(Math.max(...answer)), 1); // 최대값 삭제
      } else if (num === "-1") {
        answer.splice(answer.indexOf(Math.min(...answer)), 1); // 최소값 삭제
      }
    }
  });
  return answer.length ? [Math.max(...answer), Math.min(...answer)] : [0, 0];
}

const operations = [
  "I -45",
  "I 653",
  "D 1",
  "I -642",
  "I 45",
  "I 97",
  "D 1",
  "D -1",
  "I 333",
]; // [333, -45]
console.log(solution(operations));
