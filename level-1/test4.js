// 문제 url: https://school.programmers.co.kr/learn/courses/30/lessons/176963
const names = ["kali", "mari", "don"];
const yearning = [11, 1, 55];
const photo = [
  ["kali", "mari", "don"],
  ["pony", "tom", "teddy"],
  ["con", "mona", "don"],
];
// 요점 실행시간을 줄이기!
function solution(name, yearning, photo) {
  const answerMap = new Map();
  var answer = [];
  name.forEach((item, index) => {
    answerMap.set(item, yearning[index]); // 이름을 키로 점수를 저장
  });
  photo.forEach((item) => {
    let sum = 0;
    item.forEach((name) => {
      const value = answerMap.get(name) ?? 0; // undefined일 경우 0으로 처리  (?? 는 null이나 undefined일 경우 뒤의 값으로 대체 )
      sum += value;
      // 이름을 키로 점수를 가져와서 합산
    });
    answer.push(sum);
  });
  return answer;
}
console.log(solution(names, yearning, photo)); // [19, 18, 18]
