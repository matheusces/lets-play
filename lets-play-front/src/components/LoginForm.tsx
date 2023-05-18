import { useState } from 'react';

interface LoginFormProps {
  toggleLoginForm: (value: boolean) => void;
}

function LoginForm({ toggleLoginForm }: LoginFormProps) {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function toggleRegisterForm() {
    setIsRegisterForm(!isRegisterForm);
  }

  function handleToggleLoginForm() {
    toggleLoginForm(false);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeConfirmedPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const registerData = {
      name,
      email,
      password,
      confirmPassword
    }
    console.log('Register Successfull submitted');
    console.log(registerData);
    toggleRegisterForm();
  }

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      email,
      password
    }
    console.log('Login Successfull submitted');
    console.log(loginData)
    handleToggleLoginForm();
  }

  return (
    <form onSubmit={isRegisterForm ? handleRegisterSubmit : handleLoginSubmit} className='w-[30rem] h-fit bg-panel absolute flex flex-col top-16 left-1/3 rounded-lg p-8 z-10 gap-4 text-white text-2xl font-outline-1'>

      {isRegisterForm ? (
        <>
          <label htmlFor="password">Nome</label>
          <input className='rounded-lg p-2 text-black' type="text" value={name} onChange={handleChangeName} />
          <label htmlFor="password">Email</label>
          <input className='rounded-lg p-2 text-black' type="email" value={email} onChange={handleChangeEmail} />
          <label htmlFor="password">Senha</label>
          <input className='rounded-lg p-2 text-black' type="password" name="password" id="password" value={password} onChange={handleChangePassword} />
          <label htmlFor="password">Confirme sua senha</label>
          <input className='rounded-lg p-2 text-black' type="password" name="password" id="confirmedPassword" value={confirmPassword} onChange={handleChangeConfirmedPassword} />
    
          <div className='flex gap-4 justify-center'>
            <button className='w-44 h-12 self-center bg-primary rounded-xl text-white hover:bg-white hover:text-primary' type='submit'>Registrar</button>
            <button className='w-44 h-12 self-center bg-white rounded-xl text-primary hover:bg-primary hover:text-white' type='button' onClick={toggleRegisterForm}>Cancelar</button>
          </div>

          <span>Já tem uma conta? <button className='text-primary' type='button' onClick={toggleRegisterForm}>Faça login.</button></span>
        </>
      ) : (
        <>
          <label htmlFor="password">Email</label>
          <input className='rounded-lg p-2 text-black' type="email" value={email} onChange={handleChangeEmail}/>
          <label htmlFor="password">Senha</label>
          <input className='rounded-lg p-2 text-black' type="password" name="password" id="password" value={password} onChange={handleChangePassword}/>
    
          <div className='flex gap-4 justify-center'>
            <button className='w-44 h-12 self-center bg-primary rounded-xl text-white hover:bg-white hover:text-primary' type='submit'>Login</button>
            <button className='w-44 h-12 self-center bg-white rounded-xl text-primary hover:bg-primary hover:text-white' type='button' onClick={handleToggleLoginForm}>Cancelar</button>
          </div>
    
          <span className='text-3xl'>Não tem uma conta? <button className='text-primary font-outline-0' type='button' onClick={toggleRegisterForm}>Crie uma.</button></span>
        </>
      )}
    </form>
  )
}

export default LoginForm