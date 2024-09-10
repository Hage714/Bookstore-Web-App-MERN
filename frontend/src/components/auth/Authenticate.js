import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const Authenticate = () => {
    const [showLoginForm, setShowLoginForm] = useState(true)

  return (
      <>
          {showLoginForm ? <LoginForm setShowLoginForm={setShowLoginForm} /> : <RegistrationForm setShowLoginForm={setShowLoginForm} />}
      </>
  )
}

export default Authenticate
