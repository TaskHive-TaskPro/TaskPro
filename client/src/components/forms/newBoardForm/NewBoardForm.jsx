import images from './background.js';
import * as Yup from 'yup';
import React, { useState } from 'react';
import BtnAdd from '../../buttons/btn/buttonAdd';
import bgImageLight from '../../../images/bgImage-light.svg';
import bgImageDark from '../../../images/bgImage-dark.jpg';
// import sprite from '../../../images/icons.svg'; // <-- yerine aşağıda mutlak URL kullandık
import { toast } from 'react-hot-toast';
import { Formik } from 'formik';
import { BtnCloseBlack } from '../../buttons/buttons';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/authSelectors.js';
import { useTheme } from '@mui/material';
import {
  FormContainer,
  Title,
  Container,
  Error,
  Input,
  Text,
  Icon,
  Img,
  BgColor,
  IconList,
  BgList,
  RadioField,
  RadioFieldBg,
  FormikContainer,
  CloseButton,
} from './NewBoardForm.styled.jsx';

// Sprite yolunu mutlak yap: modal/portal içinde <use> ilk boyamada güvenilir olur
const SPRITE = new URL('../../../images/icons.svg', import.meta.url).href;

const NewBoardForm = ({
  formTitle,
  boardTitle,
  boardIcon = '#icon-Project',
  btnText,
  handleSubmit,
  closeModal,
}) => {
  const [background, setbackground] = useState();
  const theme = useSelector(selectTheme);
  const themeObj = useTheme();

  const formSubmit = (values) => {
    const title = values.title.trim();

    if (!title || title.length < 3) {
      toast.error('Title must be at least 3 characters long');
      return;
    }
    const data = { ...values, background };
    console.log('🎨 Form submitting with data:', data);
    console.log('🎨 Background state:', background);
    handleSubmit(data, formTitle);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters long')
      .required('Title is required'),
  });

  const initialValues = {
    title: boardTitle || '',
    icon: boardIcon,
    background: null,
  };

  const BgImageChangeHandler = (data) => {
    console.log('🎨 Background selected:', data);
    setbackground(data);
  };

  return (
    <FormContainer theme={themeObj}>
      <CloseButton type="button" onClick={closeModal}>
        <BtnCloseBlack />
      </CloseButton>

      <Title>{formTitle}</Title>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={formSubmit}>
        {(formik) => (
          <FormikContainer>
            <Container>
              <Input theme={themeObj} type="text" placeholder="Title" name="title" />
              <Error name="title" component="div" />
            </Container>

            <Text>Icons</Text>
            <IconList>
              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-Project" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-Project`} xlinkHref={`${SPRITE}#icon-Project`} />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-star-04" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-star-04`} xlinkHref={`${SPRITE}#icon-star-04`} />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-loading-03" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-loading-03`} xlinkHref={`${SPRITE}#icon-loading-03`} />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-puzzle-piece-02" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use
                      href={`${SPRITE}#icon-puzzle-piece-02`}
                      xlinkHref={`${SPRITE}#icon-puzzle-piece-02`}
                    />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-container" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-container`} xlinkHref={`${SPRITE}#icon-container`} />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-lightning-02" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use
                      href={`${SPRITE}#icon-lightning-02`}
                      xlinkHref={`${SPRITE}#icon-lightning-02`}
                    />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-colors" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-colors`} xlinkHref={`${SPRITE}#icon-colors`} />
                  </Icon>
                </label>
              </li>

              <li>
                <label>
                  <RadioField theme={themeObj} type="radio" name="icon" value="#icon-hexagon-01" />
                  <Icon theme={themeObj} aria-hidden="true" focusable="false">
                    <use href={`${SPRITE}#icon-hexagon-01`} xlinkHref={`${SPRITE}#icon-hexagon-01`} />
                  </Icon>
                </label>
              </li>
            </IconList>

            <Text>Background</Text>
            <BgList>
              <BgColor>
                <label>
                  <RadioFieldBg
                    type="radio"
                    name="background"
                    onChange={() =>
                      BgImageChangeHandler({
                        min: ' ',
                        desktop: ' ',
                        tablet: ' ',
                        mobile: ' ',
                      })
                    }
                  />
                  {theme === 'dark' ? <Img src={bgImageDark} alt="bgImage" /> : <Img src={bgImageLight} alt="bgImage" />}
                </label>
              </BgColor>

              {images.map((image) => (
                <BgColor key={image.min}>
                  <label>
                    <RadioFieldBg
                      type="radio"
                      name="background"
                      onChange={() => BgImageChangeHandler(image)}
                    />
                    <Img src={image.min} alt="bgImage" />
                  </label>
                </BgColor>
              ))}
            </BgList>

            <BtnAdd btnTitle={btnText} />
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export default NewBoardForm;
