import RegisterForm from "./Form";

const RegisterPage = async () => {
  return (
    <section className="container h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
