import React, { useState, useEffect } from 'react';

const TypingText = ({ author }) => {
  const txt1 = '안녕하세요.';
  const txt2 = '사람에 가치를 두는';
  const txt3 = '개발자';
  const txt4 = '입니다.';
  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');
  const [Text3, setText3] = useState('');
  const [Text4, setText4] = useState('');
  const [Text5, setText5] = useState('');
  const [Count1, setCount1] = useState(0);
  const [Count2, setCount2] = useState(0);
  const [Count3, setCount3] = useState(0);
  const [Count4, setCount4] = useState(0);
  const [Count5, setCount5] = useState(0);

  const { name } = author;
  useEffect(() => {
    const interval1 = setInterval(() => {
      setText1(Text1 + txt1[Count1]);
      setCount1(Count1 + 1);
    }, 100);
    if (Count1 === txt1.length) {
      clearInterval(interval1);
      const interval2 = setInterval(() => {
        setText2(Text2 + txt2[Count2]);
        setCount2(Count2 + 1);
      }, 100);
      if (Count2 === txt2.length) {
        clearInterval(interval2);
        const interval3 = setInterval(() => {
          setText3(Text3 + txt3[Count3]);
          setCount3(Count3 + 1);
        }, 100);
        if (Count3 === txt3.length) {
          clearInterval(interval3);
          const interval4 = setInterval(() => {
            setText4(Text4 + name[Count4]);
            setCount4(Count4 + 1);
          }, 100);
          if (Count4 === name.length) {
            clearInterval(interval4);
            const interval5 = setInterval(() => {
              setText5(Text5 + txt4[Count5]);
              setCount5(Count5 + 1);
            }, 100);
            if (Count5 === txt4.length) clearInterval(interval5);
            return () => clearInterval(interval5);
          }
          return () => clearInterval(interval4);
        }
        return () => clearInterval(interval3);
      }
      return () => clearInterval(interval2);
    }
    return () => clearInterval(interval1);
  });

  return (
    <div style={{ width: '350px' }}>
      <p className="text title">
        {Text1}
        <br />
        {Text2}
        <br />
        {Text3} <strong>{Text4}</strong> {Text5}
      </p>
    </div>
  );
};

export default TypingText;
