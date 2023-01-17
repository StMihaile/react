import './styles.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';


function Search({onSubmit: propsOnSubmit, onInput}) {
  const changeInput = (e) => {
    onInput(e.target.value)
  }
  return (
   <form className="search" onSubmit={propsOnSubmit}>
        <input 
        type="text" 
        className='search__input' 
        placeholder='Поиск' 
        onInput={changeInput}/>
        <button className='search__btn'>
            <SearchIcon/>
            {false && <CloseIcon/>}
        </button>
   </form>
  )
}

export default Search;