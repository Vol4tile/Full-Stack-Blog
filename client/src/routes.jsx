import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import RegisterPage from "./pages/RegisterPage";
import Pages from "./pages/Pages";
import PostsPage from "./pages/PostsPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import SelectedPostPage from "./pages/SelectedPostPage";
const routes = [
  {
    path: "/",
    element: <Pages />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/CreatePost", element: <CreatePostPage /> },
      { path: "/Posts", element: <PostsPage /> },
      { path: "/Account", element: <AccountPage /> },
      { path: "/Settings", element: <SettingsPage /> },
      { path: "*", element: <NotFound /> },
      { path: "/Post/:postId", element: <SelectedPostPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
export default routes;
