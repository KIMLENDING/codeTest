//https://school.programmers.co.kr/learn/courses/30/lessons/42579

function solution(genres, plays) {
  var answer = [];
  const genreMap = new Map();
  const playMap = new Map();
  genres.forEach((genre, index) => {
    if (!genreMap.has(genre)) {
      // genreMap에 genre가 없으면 genre을 key로 하는  초기화 작업
      genreMap.set(genre, []);
      playMap.set(genre, 0);
    }
    genreMap.get(genre).push([index, plays[index]]); // 장르별 [인덱스, 재생 수]
    playMap.set(genre, playMap.get(genre) + plays[index]); // 장르별 총 재생 수
  });
  // 재생 수 내림차순 정렬
  const sortedGenre = [...playMap.entries()].sort((a, b) => b[1] - a[1]);
  // 장르별 재생 수 내림차순 정렬
  for (const [genre, totalPlay] of sortedGenre) {
    genreMap.get(genre).sort((a, b) => b[1] - a[1]);
    answer.push(genreMap.get(genre)[0][0]); // 장르별 첫 번째 곡 추가
    if (genreMap.get(genre).length > 1) {
      answer.push(genreMap.get(genre)[1][0]); // 장르별 두 번째 곡 추가
    }
  }
  return answer;
}
const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];
console.log(solution(genres, plays)); // [4, 1, 3, 0]
