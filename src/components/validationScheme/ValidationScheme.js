import * as yup from 'yup'

// Проерка на валидность введенных данных - выброс исключений
export const ValidationScheme = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Неверный формат email')
      .required('Email обязателен'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Пароль обязателен'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
      .required('Подтверждение пароля обязательно'),
  })

  return {
    validationSchema,
  }
}
