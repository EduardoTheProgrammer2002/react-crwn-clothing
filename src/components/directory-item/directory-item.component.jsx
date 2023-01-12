import { useNavigate } from "react-router-dom";
import { //styles components 
    BackgroundImage, 
    Body, 
    DirectoryItemContainer 
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category
    const navigate = useNavigate();

    const goToCategory = () => {
        navigate(route);
    }

    return (
        <DirectoryItemContainer onClick={goToCategory}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    )
};

export default DirectoryItem;