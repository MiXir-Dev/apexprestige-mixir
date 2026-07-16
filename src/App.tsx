import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuotePage from "./pages/Quote.tsx";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy.tsx";
import ScrollToTop from "./hooks/scroll-to-top.tsx";
import LocalizedHomePage from "./pages/LocalizedHomePage.tsx";
import {
  HOME_PATH,
  LOCALIZED_SLUG_ROUTE_PATH,
  NOT_FOUND_ROUTE_PATH,
  PRIVACY_PATH,
  QUOTE_PATH,
} from "@/consts/paths";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path={HOME_PATH} element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path={QUOTE_PATH} element={<QuotePage />} />
          <Route path={LOCALIZED_SLUG_ROUTE_PATH} element={<LocalizedHomePage />} />
          <Route path={PRIVACY_PATH} element={<Privacy />} />
          <Route path={NOT_FOUND_ROUTE_PATH} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
