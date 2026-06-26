import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {

    const [search,setSearch]=useState("");
    const[isOpen,setIsOpen]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const handleSearchToggle=()=>{
setIsOpen(!isOpen)

}
const handleSearch=(e)=>{
e.preventDefault();
dispatch(setFilters({search:search}))
dispatch(fetchProductsByFilters({search:search}))
navigate(`/collections/all?search=${search}`)
setIsOpen(false)

}
  return (
    <div className={`d-flex align-items-center justify-content-center w-100 transition-all ${isOpen ? "position-absolute top-0 start-0 w-100 bg-white zindex-5 h-100":"w-auto"}`}>
        {isOpen ? (<form onSubmit={handleSearch} className='position-relative d-flex align-items-center justify-content-center h-100 w-100 mx-2'>
<div className='position-relative w-50 rounded-pill '>
  <input  type="text"
  placeholder='Search'
  value={search}
  className='py-3 px-2 pr-5 pl-1 w-100 h-100 rounded-pill border-0 shadow-lg' 
  onChange={(e)=>setSearch(e.target.value)} />

  {/* search icon  */}

  <button type='submit'className='bg-white position-absolute top-25 end-0  border-0 me-3 mt-2'>
    <HiMagnifyingGlass  size={19}/>
  </button>
</div>
{/* close button  */}

<button type='button' className='bg-light position-absolute top-25 end-0 border-0 shadow-lg'
onClick={handleSearchToggle}>
  <HiMiniXMark  size={22}/>
</button>
        </form>) : (
            
            <button className="mx-2  border-0 bg-white" onClick={handleSearchToggle} >
  
              <FaSearch size={17} /> 
            
            
            </button>)
            
          }

    </div>
  )
}

export default SearchBar

