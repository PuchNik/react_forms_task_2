import styles from './App.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useRef, useEffect } from 'react'
import { ValidationScheme } from './components/validationScheme/ValidationScheme'

const { validationSchema } = ValidationScheme()

const sendFormData = (formData) => {
  console.log(formData)
}

function App() {
  const buttonRef = useRef(null)
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  const isSubmitted = false
  const setIsSubmitted = () => !isSubmitted

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setIsSubmitted()
    sendFormData(data)
  }

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }))
  }

  useEffect(() => {
    if (isValid) {
      buttonRef.current.focus()
    }
  }, [isValid])

  return (
    <div className={styles['registration-form']}>
      <h2>Регистрация</h2>
      <form
        className={styles['registration-form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles['form-group']}>
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            {...register('email')}
            onBlur={() => handleBlur('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {touchedFields.email && errors.email && (
            <div className={styles['error']}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles['form-group']}>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            onBlur={() => handleBlur('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {touchedFields.password && errors.password && (
            <div className={styles['error']}>{errors.password.message}</div>
          )}
        </div>
        <div className={styles['form-group']}>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repeat password"
            {...register('confirmPassword')}
            onBlur={() => handleBlur('confirmPassword')}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <div className={styles['error']}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          ref={buttonRef}
          disabled={!isValid}
          className={styles['submit-button']}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default App
