// src/pages/dbti/dbtiUtils.js

/**
 * A/B 답변 12개를 받아서 4글자 DBTI 코드를 조합해 반환합니다.
 * @param {string[]} answers - 길이 12의 "A" 또는 "B" 배열
 * @returns {string} ex) "WTIL"
 */
export function calcDbtiCode(answers) {
  const groups = [
    { idx: [0,1,2],  chars: ['C','W'] },
    { idx: [3,4,5],  chars: ['T','N'] },
    { idx: [6,7,8],  chars: ['E','I'] },
    { idx: [9,10,11],chars: ['A','L'] },
  ];

  return groups.map(({ idx, chars }) => {
    // 해당 축에서 "A" 개수가 2개 이상이면 chars[0], 아니면 chars[1]
    const countA = idx.reduce((sum, i) => sum + (answers[i] === 'A' ? 1 : 0), 0);
    return countA >= 2 ? chars[0] : chars[1];
  }).join('');
}
