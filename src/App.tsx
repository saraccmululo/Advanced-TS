import { useRef } from "react";
import { Button } from "./components/Button";
import Container from "./components/Container";
import Input from "./components/Input";

function App() {
  const inputRef=useRef<HTMLInputElement>(null);
  return (
    <main>
      <Input id="name" label="Your name" type="text" />
      <Input id="age" label="Your age" type="number"/>
      <Input id="test" label="Test" ref={inputRef}/>
        <p>
        <Button>A Button</Button>
      </p>
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>
      <Container as={Button} onClick={()=>{}} type="button">Click me</Container>
    </main>
  );
}

export default App;
