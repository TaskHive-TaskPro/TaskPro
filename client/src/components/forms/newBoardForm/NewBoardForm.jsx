import images from './background.js';
import * as Yup from 'yup';
import React, { useState } from 'react';
import BtnAdd from '../../buttons/btn/buttonAdd';
import bgImageLight from '../../../images/bgImage-light.jpg';
import bgImageDark from '../../../images/bgImage-dark.jpg';
import sprite from '../../../images/icons.svg';
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
  FormikContainer, // <== styled(Form) olmalı; styled dosyanda böyle tanımlıysa submit düzgün çalışır
  CloseButton,
} from './NewBoardForm.styled.jsx';

const NewBoardForm = ({
  formTitle,
  boardTitle,
  boardIcon = '#icon-Project',
  btnText,
  handleSubmit,
  closeModal,
}) => {
  // isimlendirme düzeltildi
  const [background, setBackground] = useState(null);

  // tema
  const themeKey = useSelector(selectTheme);
  const muiTheme = useTheme();

  const formSubmit = (values, helpers) => {
    const title = (values.title || '').trim();

    if (!title || title.length < 3) {
      toast.error('Title must be at least 3 characters long');
      return;
    }

    // Formik values + seçilmiş background
    const data = { ...values, background };
    // dışarı verilen submit handler
    handleSubmit?.(data, formTitle);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters long')
      .required('Title is required'),
  });

  const initialValues = {
    title: boardTitle || '',
    icon: boardIcon,
    background: null, // Formik alanı; gerçek görsel objesini local state'te tutuyoruz
  };

  const handleBgImageChange = (imgObj) => {
    setBackground(imgObj);
  };

  return (
    <FormContainer theme={muiTheme}>
      <CloseButton type="button" onClick={closeModal} aria-label="Close">
        <BtnCloseBlack />
      </CloseButton>

      <Title>{formTitle}</Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={formSubmit}
        validateOnMount
      >
        {(formik) => (
          // DİKKAT: FormikContainer'ının styled(Form) olduğundan emin ol.
          // Değilse, burada <form onSubmit={formik.handleSubmit}> kullan.
          <FormikContainer>
            <Container>
              <Input
                theme={muiTheme}
                type="text"
                placeholder="Title"
                name="title"
                autoFocus
              />
              <Error name="title" component="div" />
            </Container>

            <Text>Icons</Text>
            <IconList>
              {[
                '#icon-Project',
                '#icon-star-04',
                '#icon-loading-03',
                '#icon-puzzle-piece-02',
                '#icon-container',
                '#icon-lightning-02',
                '#icon-colors',
                '#icon-hexagon-01',
              ].map((val) => (
                <li key={val}>
                  <label>
                    <RadioField
                      theme={muiTheme}
                      type="radio"
                      name="icon"
                      value={val}
                    />
                    <Icon theme={muiTheme}>
                      <use href={sprite + val}></use>
                    </Icon>
                  </label>
                </li>
              ))}
            </IconList>

            <Text>Background</Text>
            <BgList>
              {/* “Düz renk / boş arkaplan” seçeneği */}
              <BgColor>
                <label>
                  <RadioFieldBg
                    type="radio"
                    name="background"
                    onChange={() =>
                      handleBgImageChange({
                        min: '',
                        desktop: '',
                        tablet: '',
                        mobile: '',
                      })
                    }
                  />
                  {themeKey === 'dark' ? (
                    <Img src={bgImageDark} alt="bgImage" />
                  ) : (
                    <Img src={bgImageLight} alt="bgImage" />
                  )}
                </label>
              </BgColor>

              {/* Görsel arkaplanlar */}
              {Array.isArray(images) &&
                images.map((image) => (
                  <BgColor key={image.min}>
                    <label>
                      <RadioFieldBg
                        type="radio"
                        name="background"
                        onChange={() => handleBgImageChange(image)}
                      />
                      <Img src={image.min} alt="bgImage" />
                    </label>
                  </BgColor>
                ))}
            </BgList>

            {/* Submit butonu: component prop'u ile disable kontrolü */}
            <BtnAdd
              btnTitle={btnText}
              isDisabled={
                formik.isSubmitting || !formik.isValid || !formik.dirty
              }
            />
          </FormikContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export default NewBoardForm;
