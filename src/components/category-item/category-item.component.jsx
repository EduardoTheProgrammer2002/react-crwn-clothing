import "./category-item.styles.scss"

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category
    return (
        <div className='category-container'>
            <div className='background-image' style={{
                "background": `url(${imageUrl})`,
                "backgroundRepeat": 'no-repeat',
                "backgroundPosition": "center",
                "backgroundSize": "cover"
            }} />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
};

export default CategoryItem;