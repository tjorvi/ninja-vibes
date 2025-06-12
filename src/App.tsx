import './App.css'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

function Logout() {
  return (
    <button onClick={() => supabase.auth.signOut()}>
      Log out
    </button>
  );
}

function App() {
    const [session, setSession] = useState<Session|null>(null);
    
    useEffect(() => {
      supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    }, []);


    if (!session) {
      return <Auth 
                supabaseClient={supabase} 
                appearance={{ theme: ThemeSupa }}
                providers={['github']} 
                onlyThirdPartyProviders     // hide email/password panel
                view="sign_in"              // force sign-in view
                showLinks={false}           // hide “Sign up” + “Forgot password”
                redirectTo={`${window.location.origin}/ninja-vibes/`}
              />;
    }

    return (
    <>
      <div>
        welcome {session.user.email} san!
        <Logout />
      </div>
    </>
  )
}

export default App
