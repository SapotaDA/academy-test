import LoginPage from '../login';
import { Toaster } from '@/components/ui/toaster';

export default function LoginPageExample() {
  return (
    <>
      <LoginPage 
        onLogin={async (email, password) => {
          console.log('Login:', email, password);
        }}
        onSignup={async (name, email, password) => {
          console.log('Signup:', name, email, password);
        }}
      />
      <Toaster />
    </>
  );
}
