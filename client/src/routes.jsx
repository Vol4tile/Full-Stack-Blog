import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Layout from "./pages/Layout";
import PostsPage from "./pages/PostsPage/PostsPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SelectedPostPage from "./pages/SelectedPostPage/SelectedPostPage";
const routes = [
  {
    path: "/",
    element: <Layout />,
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
