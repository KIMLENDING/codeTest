//https://school.programmers.co.kr/learn/courses/30/lessons/43163

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  // 한 글자 차이나는지 확인
  function isOneLetterDiff(word1, word2) {
    let diffCount = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++;
      }
      if (diffCount > 1) {
        return false;
      }
    }
    return diffCount === 1;
  }

  // BFS 탐색
  const queue = [[begin, 0]]; // [현재 단어, 변환 단계 수]
  const visited = new Set(); // 방문한 단어 저장

  while (queue.length > 0) {
    const [currentWord, steps] = queue.shift();
    // 목표 단어에 도달하면 변환 단계 반환
    if (currentWord === target) {
      return steps;
    }

    // 변환 가능한 단어를 큐에 추가
    for (const word of words) {
      // 방문하지 않았고, 한 글자 차이나면
      if (!visited.has(word) && isOneLetterDiff(currentWord, word)) {
        visited.add(word); // 방문 처리
        queue.push([word, steps + 1]); // 큐에 추가
      }
    }
  }

  // 변환 불가능하면 0 반환
  return 0;
}

const begin = "hit";
const target = "cog";
const words = ["hot", "dot", "dog", "lot", "log", "cog"];
console.log(solution(begin, target, words)); // 4
