// src/components/buttons/btn/buttonAdd/index.jsx
import { Container, PlusIcon, TitleButton } from './buttonAdd.styled';
import { ButtonPlus } from '../buttons.styled';
import { useTheme } from '@mui/material';

const SPRITE = import.meta.env.BASE_URL + 'sprite.svg';

const BtnAdd = ({ btnTitle, onClick, isDisabled = false }) => {
  const theme = useTheme();

  return (
    <Container
      theme={theme}
      as="button"
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={isDisabled}
    >
      <ButtonPlus as="span" theme={theme}>
        <PlusIcon theme={theme} role="img" aria-hidden="true">
          <use
            href={`${SPRITE}#icon-plus`}
            xlinkHref={`${SPRITE}#icon-plus`}
          />
        </PlusIcon>
      </ButtonPlus>
      <TitleButton as="span" theme={theme}>
        {btnTitle}
      </TitleButton>
    </Container>
  );
};

export default BtnAdd;
