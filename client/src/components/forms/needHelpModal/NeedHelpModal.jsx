import React, { useRef, useEffect } from 'react';
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
  SuccessMessage,
} from './NeedHelpModal.styled';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  message: Yup.string()
    .trim()
    .min(7, 'Min 7 characters')
    .max(230, 'Max 230 characters')
    .required('Comment is required'),
});

const initialValues = { email: '', message: '' };

const NeedHelpModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const closeButtonRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Focus management: ensure focus is on close button when modal opens
  useEffect(() => {
    if (closeButtonRef.current) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Blur the submit button to release focus before closing modal
    if (submitButtonRef.current) {
      submitButtonRef.current.blur();
    }
    // Also blur any other focused element
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    
    const email = (values.email || '').trim();
    const messageTrim = (values.message || '').trim();

    if (!messageTrim) {
      toast.error('Sorry, but you need to describe your problem!');
      setSubmitting(false);
      return;
    }

    const credentials = { email, message: messageTrim };

    try {
      await dispatch(needHelp(credentials)).unwrap();
      
      // Show success state in modal
      setIsSuccess(true);
      
      // Reset form
      resetForm();
      
      // Wait 2 seconds to show success message, then close modal
      setTimeout(() => {
        closeModal?.();
        // Reset success state after closing
        setTimeout(() => setIsSuccess(false), 300);
      }, 2000);
    } catch (err) {
      const msg =
        typeof err === 'string'
          ? err
          : err?.message || 'Failed to send. Please try again.';
      toast.error(msg);
      setSubmitting(false);
    }
  };

  return (
    <Section theme={theme} role="dialog" aria-labelledby="need-help-title" aria-modal="true">
      <CloseButton 
        ref={closeButtonRef}
        type="button" 
        onClick={closeModal} 
        aria-label="Close help form"
      >
        <BtnCloseBlack />
      </CloseButton>

      <SectionTitle id="need-help-title">Need help</SectionTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {(formik) => (
          <ModalForm onSubmit={formik.handleSubmit} noValidate>
            <FormWrapper>
              <Container>
                <TitleInput
                  theme={theme}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-required="true"
                  aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
                  aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
                  disabled={isSuccess}
                />
                {formik.touched.email && formik.errors.email && (
                  <ErrorSection id="email-error" role="alert">{formik.errors.email}</ErrorSection>
                )}
              </Container>

              <Container>
                <Textarea
                  theme={theme}
                  id="message"
                  name="message"
                  placeholder="Comment"
                  rows={5}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-required="true"
                  aria-invalid={Boolean(formik.touched.message && formik.errors.message)}
                  aria-describedby={formik.touched.message && formik.errors.message ? 'message-error' : undefined}
                  disabled={isSuccess}
                />
                {formik.touched.message && formik.errors.message && (
                  <ErrorSection id="message-error" role="alert">{formik.errors.message}</ErrorSection>
                )}
              </Container>
            </FormWrapper>

            {isSuccess ? (
              <SuccessMessage theme={theme} role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              </SuccessMessage>
            ) : (
              <AuthFormSubmitButton
                ref={submitButtonRef}
                theme={theme}
                type="submit"
                disabled={formik.isSubmitting}
                aria-busy={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Sending...' : 'Send'}
              </AuthFormSubmitButton>
            )}
          </ModalForm>
        )}
      </Formik>
    </Section>
  );
};

export default NeedHelpModal;
