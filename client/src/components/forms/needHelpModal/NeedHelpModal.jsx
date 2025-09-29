import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { needHelp } from '../../../redux/auth/authOperations';
import { BtnCloseBlack } from '../../buttons/buttons';
import { useTheme } from '@mui/material/styles';
import {
  Section,
  SectionTitle,
  ModalForm,
  FormWrapper,
  Container,
  TitleInput,
  Textarea,
  ErrorSection,
  AuthFormSubmitButton,
  CloseButton,
} from './NeedHelpModal.styled';

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Email is required'), 
  message: Yup.string().trim().min(7).max(230).required('Comment is required'),
});

const initialValues = { email: '', message: '' };

const NeedHelpModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const email = values.email.trim();
    const messageTrim = values.message.trim();

    if (!messageTrim) {
      toast.error('Sorry, but you need to describe your problem!');
      setSubmitting(false); 
     return;
    }

    const credentials = { email, message: messageTrim };

    try {
      await dispatch(needHelp(credentials)).unwrap();
      toast.success('Your message has been sent. Thank you!');
      resetForm();
      closeModal();
    } catch (err) {
        const msg =
        typeof err === 'string'
          ? err
          : err?.message || 'Failed to send. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section theme={theme}>
      <CloseButton type="button" onClick={closeModal}>
        <BtnCloseBlack />
      </CloseButton>

      <SectionTitle>Need help</SectionTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <ModalForm onSubmit={formik.handleSubmit}>
            <FormWrapper>
              <Container>   
                <TitleInput
                  theme={theme}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                />
                <ErrorSection name="email" component="div" />
              </Container>

              <Container>
                <Textarea
                  theme={theme}
                  component="textarea"
                  id="message"
                  name="message"
                  placeholder="Comment"
                  rows={5}
                />
                <ErrorSection name="message" component="div" />
              </Container>
            </FormWrapper>

            <AuthFormSubmitButton
              theme={theme}
              type="submit"
              disabled={formik.isSubmitting}
              aria-busy={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Sending…' : 'Send'}
            </AuthFormSubmitButton>
          </ModalForm>
        )}
      </Formik>
    </Section>
  );
};

export default NeedHelpModal;
