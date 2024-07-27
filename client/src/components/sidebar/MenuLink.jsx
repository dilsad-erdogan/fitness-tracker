import { useNavigate } from 'react-router-dom'

const MenuLink = ({ data }) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const handleClick = () => {
        navigate(data.path);
    };

    return (
        <div onClick={handleClick} className={`${'icon'} ${pathname === data.path && 'active'}`}>
            {data.icon}
            {data.title}
        </div>
    )
}

export default MenuLink