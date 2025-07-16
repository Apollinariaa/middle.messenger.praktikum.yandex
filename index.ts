
import AuthPage from './src/pages/auth/index';
import ServerErrorPage from './src/pages/500/index';
import ChatPage from './src/pages/chat/index';
import NotFoundPage from './src/pages/404/index';
import ChangeDataPage from './src/pages/profile/changeData/index';
import  ChangePasswordPage from './src/pages/profile/changePassword/index';
import RegistrationPage from './src/pages/registration/index';
import ProfilePage from './src/pages/profile/profile/index';
import Router from './src/services/router/Router';
import './styles.scss';
import { RoutesLinks } from './src/utils/regex';

const router = new Router('#app');
router
    .use(RoutesLinks.notFound, new NotFoundPage)
    .use(RoutesLinks.serverError, new ServerErrorPage)
    .use(RoutesLinks.login, new AuthPage)
    .use(RoutesLinks.registration, new RegistrationPage)
    .use(RoutesLinks.changePassword, new ChangePasswordPage)
    .use(RoutesLinks.changeData, new ChangeDataPage)
    .use(RoutesLinks.chats, new ChatPage)
    .use(RoutesLinks.profile, new ProfilePage)
    .start()
