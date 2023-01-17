import './styles.css'
import Card from '../Card/Card';
import data from '../../assets/data.json'

const CardList = () => {
      return (
        <div className='cards'>
       
       {
        data.map((item, index) => (
        <Card {...item} key = {index}/>
        ))}
        
       </div>
    );
};
export default CardList;