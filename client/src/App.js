import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import base64 from "base-64";

function App() {

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  })

  const handleSubmitForm = e => {
    e.preventDefault();
    logInUser(formInputs.email, formInputs.password)
  }

  const handleChangeInputValue = e => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }

  const logInUser = async (email, password) => {
    try {
      const credentials = base64.encode(`${email}:${password}`);
      console.log({ credentials });
      const serverData = await fetch("http://localhost:5000", {
        method: "GET",
        headers: {
          "Authorization": `Basic ${credentials}`
        }

      })
      const message = await serverData.json();
      console.log(message);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="ivan@example.com"
          value={formInputs.email}
          onChange={handleChangeInputValue}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="******"
          value={formInputs.password}
          onChange={handleChangeInputValue}
        />
        <div className="btn-group">
          <Button design='default'>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
