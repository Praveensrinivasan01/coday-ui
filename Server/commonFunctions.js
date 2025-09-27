function parseQuiz(quizString) {
  const questions = quizString.split(/\n\n\*\*Question \d+:/).slice(1);
  const result = {};

  questions.forEach((q, index) => {
    const lines = q.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return; // skip empty

    const questionText = lines[0].replace(/^\d+\)?\s*/, '').replace(/^\*\*/, '');
    const options = {};
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const line = lines.find(l => l.startsWith(letter + ')'));
      if (line) options[letter.toLowerCase()] = line.slice(3).trim();
      else options[letter.toLowerCase()] = ""; // placeholder if missing
    });

    const answerLine = lines.find(l => l.toLowerCase().startsWith('answer:'));
    let answer = '';
    let reason = '';
    if (answerLine) {
      const match = answerLine.match(/^Answer:\s*([A-D])/i);
      if (match) answer = match[1].toLowerCase();
    }

    const explanationLine = lines.find(l => l.toLowerCase().startsWith('**explanation:**'));
    if (explanationLine) reason = explanationLine.replace(/^(\*\*Explanation:\*\*)?\s*/i, '').trim();

    result[`q${index + 1}`] = {
      question: questionText,
      options,
      answer,
      reason
    };
  });

  return result;
}

module.exports={parseQuiz}