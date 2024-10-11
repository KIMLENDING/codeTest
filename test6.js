// 볼링 점수 계산기

// 주어진 프레임 데이터
const frames = {
  frame1: ["9", "/"],
  frame2: ["x"],
  frame3: ["x"],
  frame4: ["9", "/"],
  frame5: ["9", "/"],
  frame6: ["9", "/"],
  frame7: ["x"],
  frame8: ["7", "/"],
  frame9: ["x"],
  frame10: ["x", "x", "x"],
};

const frameArray = (frames) => {
  // 모든 투구를 리스트로 변환
  let throws = [];
  for (let i = 1; i <= 10; i++) {
    const frame = frames[`frame${i}`];
    throws = throws.concat(frame); // 배열 합치기
  }
  return throws;
};

function parseThrow(current, previous = null) {
  // 각 투구를 핀 수로 변환하는 함수
  if (current.toLowerCase() === "x") {
    return 10;
  } else if (current === "/") {
    return 10 - parseThrow(previous);
  } else if (current === "-") {
    return 0;
  } else {
    return parseInt(current, 10);
  }
}

const calc = (throws) => {
  // 점수 계산
  let totalScore = 0;
  let frameScores = [];
  let throwIndex = 0;

  for (let frame = 1; frame <= 10; frame++) {
    if (throws[throwIndex].toLowerCase() === "x") {
      // 스트라이크
      let score = 10;
      // 다음 두 번의 투구를 더함
      const next1 = throws[throwIndex + 1];
      const next2 = throws[throwIndex + 2];
      score += parseThrow(next1, throws[throwIndex]);
      if (next2 === "/") {
        score += 10 - parseThrow(next1, throws[throwIndex]);
      } else {
        score += parseThrow(next2, next1);
      }
      frameScores.push(score); // 각 프레임별 점수 저장
      totalScore += score;
      throwIndex += 1;
    } else if (throws[throwIndex + 1] === "/") {
      // 스페어
      let score = 10;
      // 다음 한 번의 투구를 더함
      const next1 = throws[throwIndex + 2];
      score += parseThrow(next1, throws[throwIndex + 1]);
      frameScores.push(score);
      totalScore += score;
      throwIndex += 2;
    } else {
      // 일반 투구
      const first = parseThrow(throws[throwIndex]);
      const second = parseThrow(throws[throwIndex + 1], throws[throwIndex]);
      const score = first + second;
      frameScores.push(score);
      totalScore += score;
      throwIndex += 2;
    }
  }
  return { totalScore, frameScores };
};

const a = frameArray(frames); // 각 프레임별 투구 리스트
const result = calc(a); // 점수 계산 결과
// 각 프레임별 점수 출력
result.frameScores.reduce((acc, score, index) => {
  const frame = frames[`frame${index + 1}`];
  console.log(
    `Frame ${index + 1}: ${frame}  총 ${score + acc}점 (추가 ${score})`
  );
  return acc + score;
}, 0);

console.log(`총 점수: ${result.totalScore}점`);
