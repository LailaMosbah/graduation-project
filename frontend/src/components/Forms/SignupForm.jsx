import React from 'react'

export default function SignupForm() {
  return (
    <>
      <form action="">

        <label htmlFor="">
          Username :
          <input type="text" />
        </label>

        <label htmlFor="">
          Email:
          <input type="email" />
        </label>

        <label htmlFor="">
          Password:
          <input type="password" />
        </label>

        <label htmlFor="">
          Confirm Password:
          <input type="password" />
        </label>
      </form>
    </>
  )
}
