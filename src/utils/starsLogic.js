import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const stars = [
    {
        id: 1,
        icon: <StarIcon sx={{color: 'gold'}}/>,
        selected: true,
    },
    {
        id: 2,
        icon: <StarBorderIcon sx={{color: 'gold'}}/>,
        selected: false,
    },
    {
        id: 3,
        icon: <StarBorderIcon sx={{color: 'gold'}}/>,
        selected: false,
    },
    {
        id: 4,
        icon: <StarBorderIcon sx={{color: 'gold'}}/>,
        selected: false,
    },
    {
        id: 5,
        icon: <StarBorderIcon sx={{color: 'gold'}}/>,
        selected: false,
    }
]


export const handleStarChange = (id)=> {
    const updatedStars = stars.map(star=> {
        if (star.id <= id) {
            star['icon'] = <StarIcon sx={{color: 'gold'}}/>
        } else {
            star['icon'] = <StarBorderIcon sx={{color: 'gold'}}/>
        }
        return star
    })
    return updatedStars
}