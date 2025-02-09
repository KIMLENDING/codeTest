//https://school.programmers.co.kr/learn/courses/30/lessons/70129

function solution(s) {
  var answer = [0, 0];
  let c = s;
  while (c !== "1") {
    let count = 0;

    for (let i = 0; i < c.length; i++) {
      if (c[i] === "1") count++;
    }
    answer[1] += c.length - count; // 지운 0의 개수
    answer[0] += 1;
    c = count.toString(2); // 이진 변환 결과
  }

  return answer;
}

const s = "110010101001";
console.log(solution(s)); //[3, 8];
