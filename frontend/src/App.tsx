import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthContext, useAuthProvider } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/home";
import BookingPage from "@/pages/booking";
import LoginPage from "@/pages/login";
import MyBookingsPage from "@/pages/my-bookings";
import AdminDashboard from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar user={auth.user} onLogout={auth.logout} />
        <main className="flex-1 w-full">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/booking" component={BookingPage} />
            <Route path="/login">
              <LoginPage onLogin={auth.login} onSignup={auth.signup} />
            </Route>
            <Route path="/my-bookings" component={MyBookingsPage} />
            <Route path="/admin" component={AdminDashboard} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
