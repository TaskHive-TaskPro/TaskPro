// client/src/components/buttons/btn/buttonAdd.jsx
import icon from '../../../images/icons.svg';
import { Container, PlusIcon, TitleButton } from './buttonAdd.styled';
import { ButtonPlus } from '../buttons.styled';
import { useTheme } from '@mui/material';

/**
 * Notlar:
 * - Formik formu içinde submit butonu olarak kullanılır.
 * - onClick vermek istersen yine çalışır; ama form submit için type="submit" yeterlidir.
 * - ButtonPlus muhtemelen styled.button; nested button olmaması için as="span" ile render ediyoruz.
 */
const BtnAdd = ({ btnTitle, onClick, isDisabled = false }) => {
  const theme = useTheme();

  return (
    <Container
      theme={theme}
      as="button"            // Container'ı buton gibi render et
      type="submit"          // Formik submit
      disabled={isDisabled}
      onClick={onClick}      // (opsiyonel) extra click handler
      aria-disabled={isDisabled}
    >
      <ButtonPlus as="span" theme={theme}>
        <PlusIcon theme={theme}>
          <use href={icon + '#icon-plus-1'}></use>
        </PlusIcon>
      </ButtonPlus>
      <TitleButton as="span" theme={theme}>
        {btnTitle}
      </TitleButton>
    </Container>
  );
};

export default BtnAdd;
