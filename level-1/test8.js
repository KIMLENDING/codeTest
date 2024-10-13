// function solution(k, score) {
//   const temp = [score[0]];
//   var answer = [score[0]];

//   for (let i = 1; i < score.length; i++) {
//     if (temp.length < k) {
//       // k개 이하일 때
//       temp.push(score[i]);
//     } else {
//       // k개 이상일 때
//       if (temp[k - 1] < score[i]) {
//         temp[k - 1] = score[i];
//       } //  마지막 요소와 비교 후 교체
//     }
//     temp.sort((a, b) => b - a); // 내림차순 정렬
//     answer.push(temp[temp.length - 1]);
//   }
//   return answer;
// }

function solution(k, score) {
  var answer = [];
  for (let i = 1; i <= score.length; i++) {
    answer.push(score.slice(0, i).sort((a, b) => b - a)[Math.min(i, k) - 1]);
  }
  return answer;
}
const k = 3;
const score = [10, 100, 20, 150, 1, 100, 200]; // [10, 10, 10, 20, 20, 100, 100]
console.log(solution(k, score));
