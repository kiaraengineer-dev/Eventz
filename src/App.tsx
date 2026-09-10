import AppRoutes from "./routes";
import { EventProvider } from "./shared/components/context/EventContext";
import { AuthProvider } from "./shared/components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <AppRoutes />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
