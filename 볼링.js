// 주어진 프레임 데이터 (이전과 동일)
const frames = {
  frame1: ["-", "/"],
  frame2: ["9", "/"],
  frame3: ["9", "/"],
  frame4: ["x"],
  frame5: ["9", "/"],
  frame6: ["x"],
  frame7: ["x"],
  frame8: ["9", "/"],
  frame9: ["9", "/"],
  frame10: ["x", "x", "x"],
};

// 프레임별 점수 계산 로직 (이전 코드와 동일)
function parseThrow(current, previous = null) {
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

let throws = [];
for (let i = 1; i <= 10; i++) {
  const frame = frames[`frame${i}`];
  throws = throws.concat(frame);
}

// 점수 계산
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

// 초반, 중반, 후반 나누기
const earlyGame = frameScores.slice(0, 3); // 1, 2, 3 프레임
const midGame = frameScores.slice(3, 7); // 4, 5, 6, 7 프레임
const lateGame = frameScores.slice(7); // 8, 9, 10 프레임

// 점수 상태를 계산하는 함수
function getPhaseStatus(phaseScores) {
  let avgScore =
    phaseScores.reduce((acc, score) => acc + score, 0) / phaseScores.length;

  if (avgScore >= 25) return "5 최상";
  if (avgScore >= 20) return "4 상";
  if (avgScore >= 15) return "3 중";
  if (avgScore >= 10) return "2 하";
  return "1 최하";
}

// 각 단계별 상태
const earlyStatus = Number(getPhaseStatus(earlyGame).split(" ")[0]);
const midStatus = Number(getPhaseStatus(midGame).split(" ")[0]);
const lateStatus = Number(getPhaseStatus(lateGame).split(" ")[0]);

console.log(`초반 상태: ${earlyStatus}`);
console.log(`중반 상태: ${midStatus}`);
console.log(`후반 상태: ${lateStatus}`);

// 태그 분석
let tags = [];

// 기존 태그 로직
if (lateStatus === "최상" || lateStatus === "상") {
  if (
    lateGame.reduce((acc, score) => acc + score, 0) >
    earlyGame.reduce((acc, score) => acc + score, 0)
  ) {
    tags.push("승부사", "슬로우 스타터");
  }
}

if (
  (earlyStatus === "최상" || earlyStatus === "상") &&
  (midStatus === "최하" || midStatus === "하")
) {
  if (lateStatus === "최상" || lateStatus === "상") {
    tags.push("롤러코스터");
  } else {
    tags.push("집중력 부족", "내리막길");
  }
}

// 추가 태그: 일관된 선수
if (earlyStatus === "상" || earlyStatus === "최상") {
  if (midStatus === "상" || midStatus === "최상") {
    if (lateStatus === "상" || lateStatus === "최상") {
      tags.push("일관된 선수", "안정적인 퍼포머");
    }
  }
}

// 추가 태그: 초반 강자
if (
  earlyStatus === "최상" &&
  (midStatus === "하" ||
    midStatus === "최하" ||
    lateStatus === "하" ||
    lateStatus === "최하")
) {
  tags.push("초반 강자", "빠른 시작");
}

// 추가 태그: 후반 집중력
if (lateStatus === "상" || lateStatus === "최상") {
  if (
    earlyStatus === "중" ||
    earlyStatus === "하" ||
    earlyStatus === "최하" ||
    midStatus === "하" ||
    midStatus === "최하"
  ) {
    tags.push("후반 집중력", "마무리 잘하는 선수");
  }
}
console.log(totalScore);
// 추가 태그: 고득점 플레이어
if (totalScore >= 200) {
  // 예시 기준
  tags.push("고득점 플레이어", "볼링 마스터");
}

// 추가 태그: 안정적인 플레이어
console.log(Math.max(...frameScores));
console.log(Math.min(...frameScores));
let scoreVariance = Math.max(...frameScores) - Math.min(...frameScores); // 최대값과 최소값의 차이
if (scoreVariance <= 12) {
  // 예시 기준
  tags.push("안정적인 플레이어", "균형 잡힌 선수");
}

// 추가 태그: 점수 향상형
let isImproving = true;
for (let i = 1; i < frameScores.length; i++) {
  if (frameScores[i] < frameScores[i - 1]) {
    isImproving = false;
    break;
  }
}
if (isImproving) {
  tags.push("점수 향상형", "성장하는 선수");
}

// 추가 태그: 초반 약자
if (
  (earlyStatus === "하" || earlyStatus === "최하") &&
  (midStatus === "중" || midStatus === "상" || midStatus === "최상") &&
  (lateStatus === "중" || lateStatus === "상" || lateStatus === "최상")
) {
  tags.push("초반 약자", "회복형 선수");
}

// 추가 태그: 올커버 (모든 프레임이 스페어인 경우)
let allSpare = true;
for (let i = 1; i <= 10; i++) {
  const frame = frames[`frame${i}`];
  console.log(frame);
  if (i === 10) {
    // 10프레임에서
    if (frame.length === 3) {
      // 3번째 투구가 있는 경우
      if (!frame[2].includes("/")) {
        // 3번째 투구가 스페어가 아닌 경우
        if (frame[2].toLowerCase() === "x") continue; //스트라이크 이면 넘어감
        allSpare = false;
        console.log("10프레임 3번째 투구 스페어 아님");
        break;
      }
    }
  }
  // 프레임마다 스페어가 있는지 확인 (스트라이크는 제외)
  if (!frame.includes("/")) {
    if (frame[0].toLowerCase() === "x") continue;
    allSpare = false;
    break;
  }
}
if (allSpare) {
  tags.push("올커버");
}

// 추가 태그: 퍼펙트 (모든 프레임이 스트라이크인 경우)
let allStrike = true;
for (let i = 1; i <= 10; i++) {
  const frame = frames[`frame${i}`];
  // 프레임마다 첫 투구가 스트라이크인지 확인
  if (frame[0].toLowerCase() !== "x") {
    allStrike = false;
    break;
  }
}
if (allStrike) {
  tags.push("퍼펙트");
}

console.log("태그:", tags);
