import { FormEvent, forwardRef, useImperativeHandle, useRef, type ComponentPropsWithoutRef } from "react";

export type FormImperativeHandle={
  clear: ()=>void;
}

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormImperativeHandle, FormProps>(({ onSave, children, ...otherProps }, ref) => {
  const formRef=useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, ()=>{
    return {
      clear() {
        console.log('clearing...')
        formRef.current?.reset();
      }
    }
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }
  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
      {children}
    </form>
  );
});

export default Form;
