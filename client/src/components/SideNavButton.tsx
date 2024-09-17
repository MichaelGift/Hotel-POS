import {Link} from "react-router-dom";

const SideNavButton = ({text, onClick, route}) => (
    <div className="btn text-light mb-1 p-2 rounded w-100" onClick={onClick} style={{backgroundColor: '#2d2d2d'}}>
        <Link to={route} className='text-light'>{text}</Link>
    </div>
);

export default SideNavButton