// https://school.programmers.co.kr/learn/courses/30/lessons/42586#
import { performanceTest } from "../perFormanceTest.js";

function solution(progresses, speeds) {
  // 각 작업이 몇일 걸리는지 계산
  progresses = progresses.map((v, i) => Math.ceil((100 - v) / speeds[i]));
  var answer = [];
  progresses.reduce((acc, cur) => {
    if (acc < cur) {
      // 뒤에 이어지는 작업이 더 오래걸리는 경우
      answer.push(1);
      return cur;
    } else {
      answer[answer.length - 1]++; // 이어지는 작업이 더 빠른 경우
      return acc;
    }
  }, 0);
  return answer;
}

function solution1(progresses, speeds) {
  progresses = progresses.map((v, i) => Math.ceil((100 - v) / speeds[i]));
  var answer = [];
  let maxtmp = 0;
  for (let i = 0; i < progresses.length; i++) {
    if (maxtmp < progresses[i]) {
      // 뒤에 이어지는 작업이 더 오래걸리는 경우
      answer.push(1); // 새로 배포
      maxtmp = progresses[i];
    } else {
      // 이어지는 작업이 더 빠른 경우
      answer[answer.length - 1]++; // 배포에 기능 추가
    }
  }
  return answer;
}

function solution2(progresses, speeds) {
  let answer = [0];
  let days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );
  let maxDay = days[0];

  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j] += 1; // index 범위 밖에서 접근하는 것이 가능 (자바스크립트의 특징)
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }

  return answer;
}
const progresses = [93, 30, 55, 90, 99, 10];
const speeds = [1, 30, 5, 1, 1, 90];

// console.log(solution(progresses, speeds)); // [2, 1, 2]
performanceTest(solution, [progresses, speeds]);
performanceTest(solution1, [progresses, speeds]);
performanceTest(solution2, [progresses, speeds]);
