import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import styles from './AuthPage.module.css'

// 🔥 Form type
type LoginForm = {
  email: string
  password: string
}

export default function LoginPage():React.ReactElement {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // 🔥 Typed updater
  const update = (key: keyof LoginForm, value: string): void => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // 🔥 Typed submit
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()

    setError('')

    if (!form.email || !form.password) {
      setError('Please fill all fields.')
      return
    }

    setLoading(true)

    // Simulated API call
    await new Promise<void>((resolve) => setTimeout(resolve, 800))

    const success = login(form.email, form.password)

if (!success) {
  setError('Invalid email or password.')
  setLoading(false)
  return
}

setLoading(false)
navigate('/dashboard')

    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>⌂ HotelHub</div>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.sub}>
          Login to manage your bookings and wishlist.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="enter your email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('email', e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="enter your password"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('password', e.target.value)
              }
            />
          </div>

          <button
            className={`btn btn-primary ${styles.submitBtn}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login →'}
          </button>
        </div>

        <p className={styles.switch}>
          Don't have an account?{' '}
          <Link to="/register">Sign up free</Link>
        </p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.orb} />
        <p className={styles.quote}>
          "The world is a book, and those who do not travel read only one page."
        </p>
        <span className={styles.quoteBy}>— Saint Augustine</span>
      </div>
    </div>
  )
}