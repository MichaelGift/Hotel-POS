const SideNavButton = ({text, onClick}) => (
    <div className="btn text-light mb-1 p-2 rounded w-100" onClick={onClick} style={{backgroundColor: '#2d2d2d'}}>
        {text}
    </div>
);

export default SideNavButton