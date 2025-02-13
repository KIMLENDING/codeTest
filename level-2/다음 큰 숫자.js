//https://school.programmers.co.kr/learn/courses/30/lessons/12911
const solution = (n) => {
  //2진수 변환은 숫자.toString(2) 쓰면 해결 되고

  //   const count = n // 78
  //     .toString(2) // 1001110
  //     .split("") // ['1', '0', '0','1', '1', '1','0']
  //     .filter((bit) => bit === "1").length; // [ '1', '1', '1', '1' ] //  4

  //   let c = 0;
  //   const bin = n.toString(2);
  //   for (let i = 0; i < bin.length; i++) {
  //     if (bin[i] === "1") c++;
  //   }

  const count = n.toString(2).replace(/0/g, "").length;

  let i = n;
  while (1) {
    i++;
    if (count === i.toString(2).replace(/0/g, "").length) return i;
  }
};
const n = 78;
console.log(solution(n));

/**
 *
 * n의 다음 큰 숫자는 n보다 큰 자연수 &&
 * n의 다음 크 숫자와 n은 2진수로 변환 했을 때 1의 갯수가 같다. &&
 * n의 다음 큰 숫자는 조건 1,2를 만족하는 수 중 가장 작은 수
 * 78(1001110)의 다음 큰 숫자는 83(1010011)
 */
