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
  name.forEach((item, index) => {
    answerMap.set(item, yearning[index]); // 이름을 키로 점수를 저장
  });
  return photo.map(
    (item) => item.reduce((acc, cur) => acc + (answerMap.get(cur) ?? 0), 0) // item.reduce((acc, cur) => acc + (yearning[name[indexOf(cur)]] ?? 0), 0)
  ); // 초기값 0, answerMap.get(cur)가 undefined일 경우 0으로 처리
}
console.log(solution(names, yearning, photo)); // [19, 18, 18]
