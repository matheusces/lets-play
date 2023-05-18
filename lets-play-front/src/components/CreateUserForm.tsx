import { FormEvent, useEffect, useState } from "react";
// import axios from "axios";

interface CreateUserFormProps {
  toggleCreateUserForm: (value: boolean) => void;
}

function CreateUserForm({ toggleCreateUserForm }: CreateUserFormProps) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      nickname,
      email,
      password,
      photo,
    };

    console.log(formData);
    console.log("Formulário enviado");

    clearForm();
  }

  function clearForm() {
    setNickname("");
    setEmail("");
    setPassword("");
    setPhoto("");
  }

  useEffect(() => {}, []);

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="w-[42rem] h-[35rem] bg-form absolute z-10 left-1/4 z-1 flex flex-col gap-2 text-secondary items-center text-3xl px-6 py-4"
      >
        <div className="w-11/12 flex flex-col items-start self-start mx-8">
          <label className="self-start" htmlFor="">
            Nickname
          </label>
          <input
            className="w-full bg-input p-2 rounded-lg"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="w-11/12 flex flex-col items-start self-start mx-8">
          <label className="self-start" htmlFor="">
            Email
          </label>
          <input
            className="w-full bg-input p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-11/12 flex flex-col items-start self-start mx-8">
          <label className="self-start" htmlFor="">
            Senha
          </label>
          <input
            className="w-full bg-input p-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-11/12 flex flex-col items-start self-start mx-8">
          <label
            className="self-start block mb-2 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>

          <input
            className="block w-full bg-input p-2 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => setPhoto(e.target.value)}
          ></input>
        </div>

        <div className="flex gap-20 mt-8">
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-lg"
          >
            Confirmar
          </button>
          <button
            type="button"
            className="bg-white text-primary p-2 rounded-lg"
            onClick={() => toggleCreateUserForm(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateUserForm;
