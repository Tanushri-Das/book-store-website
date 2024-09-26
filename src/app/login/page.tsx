// import LoginForm from "./Form";

// const LoginPage = () => {
//   return (
//     <section className="container h-screen flex items-center justify-center">
//       <div className="w-[800px]">
//         <LoginForm />
//       </div>
//     </section>
//   );
// };

// export default LoginPage;

import { Suspense } from "react";
import LoginForm from "./Form";

const LoginPage = () => {
  return (
    <section className="container h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
};

export default LoginPage;
