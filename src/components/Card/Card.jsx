import './styles.css'
import {ReactComponent as Save} from "./save.svg"

const Card = ({name, picture, price, discount, wight, isFavorite}) => {
    const discount_price = Math.round(price - price*discount / 100);
    return(
        <div className='card'>
        <div className='card__sticky card__sticky_type_top-left'>
            { !!discount && <span className='card__discount'>{`-${discount}%`}</span>}
        </div>
        <div className='card__sticky card__sticky_type_top-right'>
            <button className='card__favorite'>
                <Save className = {isFavorite ? 'card__favorite-icon' : '.card__favorite-icon-off'}/>
            </button>
        </div>
        <a href="/product" className='card__link'>
            <img src={picture} alt='' className='card__image'/>
            <div className='card__desc'>
                <span className={!! discount ? 'card__old-price' : 'card__price'}>{price}&nbsp;Р</span>
                {!!discount && <span className='card__price card__price_type_discount'>
                {discount_price ?? 'Уточнить у продавца'}&nbsp;Р
                </span>}
               
                <span className='card-weight'> {wight}</span>
                <p className='card_name'>{name}
                </p>
            </div>
        </a>
        <a href="#" className='card__cart btn btn_type_primary'> 
        В корзину
        </a>
        </div>
    );
};
export default Card;