import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Request from "@/pages/Request";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/about" component={About} />
        <Route path="/request" component={Request} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;