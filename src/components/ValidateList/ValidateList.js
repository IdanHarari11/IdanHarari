import React from 'react';
import * as S from "./style";


const ValidateList = ({ validate, text }) => {
  return (
    validate && (
      <S.ValidateText size="22px" bold>
        {text}
      </S.ValidateText>
    )
  );
};

export default ValidateList;
