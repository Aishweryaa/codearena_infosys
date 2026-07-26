import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminLayout,
  UserLayout,
} from "./components/Layout.jsx";
import {
  AdminRoute,
  ProtectedRoute,
} from "./components/Routes.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminProblemFormPage from "./pages/AdminProblemFormPage.jsx";
import AdminProblemsPage from "./pages/AdminProblemsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProblemDetailPage from "./pages/ProblemDetailPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SubmissionsPage from "./pages/SubmissionsPage.jsx";
import SubmissionDetailPage from "./pages/SubmissionDetailPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import AdminSubmissionsPage from "./pages/AdminSubmissionsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { UiEffects } from "./components/UiEffects.jsx";

export default function App() {
  return (
    <>
      <UiEffects />
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route
            path="/problems/:problemId"
            element={<ProblemDetailPage />}
          />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route
            path="/submissions/:submissionId"
            element={<SubmissionDetailPage />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="problems" element={<AdminProblemsPage />} />
          <Route
            path="problems/create"
            element={<AdminProblemFormPage />}
          />
          <Route
            path="problems/:problemId/edit"
            element={<AdminProblemFormPage />}
          />
          <Route path="users" element={<AdminUsersPage />} />
          <Route
            path="submissions"
            element={<AdminSubmissionsPage />}
          />
        </Route>
      </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
