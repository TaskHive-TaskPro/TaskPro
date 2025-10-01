import React from 'react';
import {
  ButtonUpDateSvg,
  ButtonClose,
  ButtonCloseIcon,
  ButtonFilter,
  ButtonFilterIcon,
  ButtonFilterThumb,
} from './buttons.styled';
import { useTheme } from '@mui/material';

// Public sprite'a mutlak yol:
const SPRITE = import.meta.env.BASE_URL + 'sprite.svg';

export const BtnClose = () => {
  const theme = useTheme();
  return (
    <ButtonClose type="button" aria-label="Close">
      {/* ButtonCloseIcon: styled.svg OLMALI */}
      <ButtonCloseIcon theme={theme} role="img" aria-hidden="true">
        {/* ButtonUpDateSvg styled.use ise böyle kullan; değilse bu satırı kaldırıp <use> koy */}
        <ButtonUpDateSvg
          href={`${SPRITE}#icon-x-close`}
          xlinkHref={`${SPRITE}#icon-x-close`}
        />
      </ButtonCloseIcon>
    </ButtonClose>
  );
};

export const BtnCloseBlack = () => {
  const theme = useTheme();
  return (
    <ButtonClose type="button" aria-label="Close">
      <ButtonCloseIcon theme={theme} role="img" aria-hidden="true">
        {/* #icon-x-close-2 YOK; aynısını kullan, rengi styled ile siyah yap */}
        <ButtonUpDateSvg
          href={`${SPRITE}#icon-x-close`}
          xlinkHref={`${SPRITE}#icon-x-close`}
        />
      </ButtonCloseIcon>
    </ButtonClose>
  );
};

export const BtnFilter = ({ color, onClick }) => {
  const theme = useTheme();
  return (
    <ButtonFilter onClick={onClick} theme={theme} type="button">
      <ButtonFilterThumb>
        {/* ButtonFilterIcon: styled.svg OLMALI */}
        <ButtonFilterIcon theme={theme} role="img" aria-hidden="true">
          <use
            href={`${SPRITE}#icon-filter`}
            xlinkHref={`${SPRITE}#icon-filter`}
          />
        </ButtonFilterIcon>
      </ButtonFilterThumb>
      Filters
    </ButtonFilter>
  );
};
