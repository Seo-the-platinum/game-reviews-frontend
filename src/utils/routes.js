import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
export const routes = [
    {
        icon: <HomeIcon sx={{fontSize: 40}}/>,
        name: 'home',
        path: '/',
    },
    {
        icon: <PersonIcon sx={{fontSize: 40}}/>,
        name: 'profile',
        path: '/user-profile'
    }
    
]