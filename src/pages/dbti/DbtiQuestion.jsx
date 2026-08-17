import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from './dbtiQuestionData';
import { calcDbtiCode } from './dbtiUtils';
import S from './style';
import MiniFooter from '../../components/layout/footer/MiniFooter';

export default function DbtiQuestionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const total = questions.length;
  const q = questions[step];

  const onSelect = (value) => setSelected(value);

  const onNext = () => {
    const next = [...answers, selected];
    if (step < total - 1) {
      setAnswers(next);
      setSelected(null);
      setStep(step + 1);
    } else {
      const code = calcDbtiCode(next);
      navigate(`/dbti-result?code=${code}`);
    }
  };

  const onPrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(answers[step - 1]);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      <S.Header />

      <S.Progress>
        {questions.map((_, i) => (
          <S.StepDot key={i} active={i <= step} />
        ))}
      </S.Progress>

      <S.Container>
        <S.QuestionTitle mb="24px">
          <span>Q{step + 1}. {q.question}</span>
        </S.QuestionTitle>
        
        <S.Options>
          {q.options.map((opt, idx) => (
            <div key={opt.value} style={{ flex: 1 }}>
              <S.OptionText>
                {idx === 0 ? 'A.' : 'B.'} {opt.label}
              </S.OptionText>

              <S.OptionCard
                key={`${step}-${opt.value}`}     // ← 여기! 카드에 step 포함 key
                dir={idx === 0 ? 'left' : 'right'} // ← 방향 전달
                selected={opt.value === selected}
                onClick={() => onSelect(opt.value)}
              >
                <img src={opt.img} alt={opt.label} />
              </S.OptionCard>
            </div>
          ))}
        </S.Options>


        <S.ButtonWrapper>
          {step > 0 && (
            <S.PrevButton variant="outline" onClick={onPrev}>
              이전
            </S.PrevButton>
          )}
          <S.NextButton
            variant="filled"
            disabled={!selected}
            onClick={onNext}
          >
            {step < total - 1 ? '다음' : '결과보기'}
          </S.NextButton>
        </S.ButtonWrapper>
      </S.Container>

      <MiniFooter />
    </>
  );
}
