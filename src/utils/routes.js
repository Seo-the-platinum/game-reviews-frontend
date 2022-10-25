import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
export const routes = [
    {
        icon: (dark)=> <HomeIcon sx={{fontSize: 40, color: dark ? 'white': 'dark'}}/>,
        name: 'home',
        path: '/',
    },
    {
        icon: (dark)=> <PersonIcon sx={{fontSize: 40, color: dark ? 'white' : 'dark'}}/>,
        name: 'profile',
        path: '/user-profile'
    }
    
]