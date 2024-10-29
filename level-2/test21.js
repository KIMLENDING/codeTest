//https://school.programmers.co.kr/learn/courses/30/lessons/42587
function solution(priorities, location) {
  let tmpArr = [...priorities];
  tmpArr.sort((a, b) => b - a); // 내림차순 정렬
  const maxArr = new Map(); // 최대값을 담을 배열
  let cnt = 0;
  let curIdx = 0;
  // Map을 이용하여 최대값의 개수를 담음
  for (let i = 0; i < tmpArr.length; i++) {
    if (!maxArr.has(tmpArr[i])) {
      maxArr.set(tmpArr[i], 1);
    } else maxArr.set(tmpArr[i], maxArr.get(tmpArr[i]) + 1);
  }
  for (const [key, value] of maxArr) {
    for (let i = 0; i < value; i++) {
      cnt++;
      let idx = priorities.indexOf(key, curIdx);
      if (idx === -1) {
        // 뒤쪽에 없으면 앞에서 찾음
        idx = priorities.indexOf(key);
      }
      console.log(key, value, cnt, idx);
      if (idx === location) {
        return cnt;
      }
      if (idx !== location) curIdx = idx + 1;
    }
  }
  return cnt;
}
const priorities = [2, 2, 3, 1, 5, 3, 2];
const location = 2;
console.log(solution(priorities, location)); // 1
