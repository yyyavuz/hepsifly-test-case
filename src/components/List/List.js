import { useContext, useEffect, useState } from 'react';
import "./style.css";
import PhoneListContext from "../../contexts/PhoneListContext";

function List() {
  const data = useContext(PhoneListContext);
  const [phoneListData, setPhoneListData] = useState(data.phoneListData);  
  const [phoneListDataDefault, setPhoneListDataDefault] = useState(data.phoneListData);  
  const [filterText, setFilterText] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoverStatus, setHoverStatus] = useState(-1);
  const [addedProduct, setAddedProduct] = useState([]);
  const [colorSort, setColorSort] = useState([]);
  const [selectedColorSort, setSelectedColorSort] = useState("");
  const [productSort, setProductSort] = useState([]);
  const [selectedProductSort, setSelectedCProductSort] = useState("");
  const [haschange, setHaschange] = useState(true);
  const [cardStatus, setCardStatus] = useState("out");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIndex, setdeleteIndex] = useState();

  useEffect(() => {
    setHaschange(false);
    if (haschange) {
      setPhoneListDataDefault(data.phoneListData);
      setColorSort(ColorConvert(phoneListData))
      setProductSort(ProductConvert(phoneListData))
    }
  }, )

  const filtered = phoneListDataDefault.filter((item) => {
    if(filterText.length > 1) {
      return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
      );
    } 
  })
  
  const setSort = (e) => {
    setFilterText("")
    setSelectedColorSort("");
    setSelectedCProductSort("");
    setLoading(true);
    if(e === "lowestPrice"){
      let lowestPrice = phoneListData.sort(function(a, b){return a.price - b.price});
      setPhoneListData(phoneListDataDefault);
      setSelectedSort("lowestPrice");
      setTimeout(() => {
        setLoading(false)
        setPhoneListData(lowestPrice);
      }, 500);
    } else if(e === "highestPrice"){
      let highPrice = phoneListData.sort(function(a, b){return b.price - a.price});
      setPhoneListData(phoneListDataDefault);
      setSelectedSort("highestPrice");
      setTimeout(() => {
        setLoading(false)
        setPhoneListData(highPrice);
      }, 500);
    } else if(e === "newests"){
      let sortAtoZ = phoneListData.sort((a,b) => (a.title > b.title) ? 1 : ((b.title> a.title ) ? -1 : 0))
      setPhoneListData(phoneListDataDefault);
      setSelectedSort("newests");
      setTimeout(() => {
        setLoading(false)
        setPhoneListData(sortAtoZ);
      }, 500);
    } else if(e === "oldest"){
      let sortZtoA = phoneListData.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title ) ? -1 : 0))
      setPhoneListData(phoneListDataDefault);
      setSelectedSort("oldest");
      setTimeout(() => {
        setLoading(false)
        setPhoneListData(sortZtoA);
      }, 500);
    } else if(e === ""){
      phoneListData.sort(function(a, b){return a.productId - b.productId});
      setPhoneListData(phoneListDataDefault);
      setSelectedSort("");
      setTimeout(() => {
        setLoading(false)
        setPhoneListData(phoneListDataDefault)
      }, 500);
    }
  }

  const ColorSortStart = (item) => {
    setSelectedCProductSort("");
    setSelectedSort("");
    setFilterText(item.color)
    setSelectedColorSort(item.color)
  }

  const ProductSortStart = (item) => {
    setSelectedColorSort("");
    setSelectedSort("");
    setFilterText(item.brand)
    setSelectedCProductSort(item.brand)
  }

  const GridHover = (item, status) => {
    if (status === "over") {
      setHoverStatus(item.productId)
    } else if (status === "out") {
      setHoverStatus(-1)
    }
  }

  const ColorConvert = (phoneListData) => {
    const res = {};
    phoneListData.forEach((obj) => {
       const key = `${obj.color}`;
       if (!res[key]) {
          res[key] = { ...obj, count: 0 };
       };
       res[key].count += 1;
    });
    return Object.values(res);
  };

  const ProductConvert = (phoneListData) => {
    const res = {};
    phoneListData.forEach((obj) => {
       const key = `${obj.brand}`;
       if (!res[key]) {
          res[key] = { ...obj, count: 0 };
       };
       res[key].count += 1;
    });
    return Object.values(res);
  };

  const AddProduct = (item, status) => {
    setAddedProduct([...addedProduct, item])

    phoneListData.splice(item.productId, 1,{
      productId: item.productId,
      title: item.title,
      brand: item.brand,
      url: item.url,
      color: item.color,
      price: item.price,
      discount: item.discount,
      percent: item.percent,
      isAddedCard: 1
    });
  }

  const CardButtonHover = (status) => {
    setCardStatus(status)
    if(status === "over") {
      return(
        <>
          <div>
            welcome
          </div>
        </>
      );
    } else if (status === "out") {
    }
  }

  const DeleteItemCard = () => {
    setIsOpen(false);
    addedProduct.sort(function(a, b){return a.productId - b.productId});
    addedProduct.splice(deleteIndex, 1);
  }

  const OpenDeleteModal = (item, index) => {
    setIsOpen(true);
    CardButtonHover("out");
    setdeleteIndex(index);
  }

  const Popup = props => {
    return (
      <div className="popup-box">
        <div className="box">
          {props.content}
        </div>
      </div>
    );
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {isOpen && <Popup
        content={<>
          <b className='popup-top-text'>Ürünü silmek istediğinize emin misiniz?</b>
          <div className='line'/>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div style={{textAlign: "end"}}>
            <button className='yes-button' onClick={() => DeleteItemCard()}>Evet</button>
            <button className='no-button' onClick={togglePopup}>Hayır</button>
          </div>
        </>}
        handleClose={togglePopup}
      />}
      <div className='header'>
        <div className='logo'>
          <div className='logo-text'>Hepsiburada</div>
        </div>
        <div className='search'>
            <input 
              type="text" 
              name="search" 
              value={filterText}
              placeholder="25 milyon'dan fazla ürün içerisinden ara"
              onChange={(e) => {setFilterText(e.target.value)}}
            />
        </div>
        <div className='cart'>
          <button className="buttonCard" 
            onClick={() => CardButtonHover("over")}
          >
            {addedProduct.length === 0 ? (<></>) : (<><div className='dot'> <p className='dot-text'>{addedProduct.length}</p> </div></>)}
            Sepetim
          </button>
          {addedProduct.length === 0 ? (<></>) : 
            (
              <>
              {cardStatus === "over" ? (
                <div className="card-active" > 
                  <div className='card-list-item'>
                    {addedProduct.map((item, index) => {
                      return(
                        <>
                          <div className='card-item'>
                            <img src={item.url} alt="" height="60px" width="60px" className='img-unactive' />
                            <div className='card-text-button-part'>
                              <div className='card-title-text'>{item.title}</div>
                              <button className='delete-button' onClick={() => OpenDeleteModal(item, index)}>Kaldır</button>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              ) : (<></>)}
              </>    
            )
          }
        </div>
      </div>
      <div className='line'/>

      <div className='top'>
        <div className='top-text'>
          <div className='top-title'>iPhone İOS cep telefonu</div>
          <div style={{display: "flex"}}>
            <div className='search-text'>Aranan Kelime: </div>
            <div className='search-text-result'>{filterText}</div>
          </div>
        </div>
        <div className='sort-part'>
          <select name="sort" id="sort" value={selectedSort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sıralama</option>
            <option value="lowestPrice">En Düşük Fiyat</option>
            <option value="highestPrice">En Yüksek Fiyat</option>
            <option value="newests">En Yeniler (A{'>'}Z)</option>
            <option value="oldest">En Yeniler (Z{'>'}A)</option>
          </select>
        </div>
      </div>
      <div className='body-part'>
        <div className='sorts-part'>
          <div className='color-sort-label'>
            <div className='left-sort-title-part'>Renk</div>
            {colorSort.map((item) => {
              return (
                <label className={selectedColorSort === item.color ? 'left-sort-label-active' : 'left-sort-label'} key={item.productId} 
                onClick={() => ColorSortStart(item)}
                >
                  {item.color} ({item.count})
                </label>                  
              );
            })}
          </div>
          <div className='sort-label'>
            <div className='left-sort-title-part'>Sıralama</div>
            <label className={selectedSort === "lowestPrice" ? 'left-sort-label-active' : 'left-sort-label'} onClick={() => setSort("lowestPrice")}>En Düşük Fiyat</label>
            <label className={selectedSort === "highestPrice" ? 'left-sort-label-active' : 'left-sort-label'} onClick={() => setSort("highestPrice")}>En Yüksek Fiyat</label>
            <label className={selectedSort === "newests" ? 'left-sort-label-active' : 'left-sort-label'} onClick={() => setSort("newests")}>En Yeniler (A{'>'}Z)</label>
            <label className={selectedSort === "oldest" ? 'left-sort-label-active' : 'left-sort-label'} onClick={() => setSort("oldest")}>En Yeniler (Z{'>'}A)</label>
          </div>
          <div className='sort-brand-label'>
          <div className='left-sort-title-part'>Marka</div>
          {productSort.map((item) => {
              return (
                <label className={selectedProductSort === item.brand ? 'left-sort-label-active' : 'left-sort-label'} key={item.productId} 
                onClick={() => ProductSortStart(item)}
                >
                  {item.brand} ({item.count})
                </label>                  
              );
            })}
          </div>
        </div>
        { !loading ? (
          <div className='list-part' onMouseOut={() => CardButtonHover("out")}>
          <div class="grid-container">
            {filtered.length === 0 ? (
              addedProduct.length === 0 ? (
              <>
                {phoneListData.map((item) => {
                  return (
                    <>
                      {item.productId === hoverStatus ? (
                        <div className="grid-item-focus" key={item.productId} 
                          onMouseOver={() => GridHover(item, "over")}
                          onMouseOut={() => GridHover(item, "out")}
                        >
                          <img src={item.url} alt="" height="250px" />
                          <div className='product-title-text'>{item.title}</div>
                          {item.isAddedCard === 1 ? (
                            <button className='add-button'>Bu ürünü sepete ekleyemezsiniz.</button>
                          ) : 
                          (
                            <button className='add-button' onClick={() => AddProduct(item, "click")}>Sepetere Ekle</button>
                          )}
                        </div>
                      ) : (
                        <div className="grid-item" key={item.productId} 
                          onMouseOver={() => GridHover(item, "over")}
                          onMouseOut={() => GridHover(item, "out")}
                        >
                          <img src={item.url} alt="" height="250px" className='img-unactive' />
                          <div className='product-title-text'>{item.title}</div>
                          <div className='brand-text'>Marka: {item.brand}</div>
                          <div className='brand-text'>Renk: {item.color}</div>
                          <div className='price-text'>{item.price} TL</div>
                          <div className='discount-text'>{item.discount}
                            <div className='percent-text'>{item.percent}</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
              ) : (
              <>
                {phoneListData.map((item) => {
                  return (
                    <>
                      {item.productId === hoverStatus ? (
                        <div className="grid-item-focus" key={item.productId} 
                          onMouseOver={() => GridHover(item, "over")}
                          onMouseOut={() => GridHover(item, "out")}
                        >
                          <img src={item.url} alt="" height="250px" />
                          <div className='product-title-text'>{item.title}</div>
                          {item.isAddedCard === 1 ? (
                            <button className='add-button-disable'>Bu ürünü sepete ekleyemezsiniz.</button>
                          ) : 
                          (
                            <button className='add-button' onClick={() => AddProduct(item, "click")}>Sepetere Ekle</button>
                          )}                        </div>
                      ) : (
                        <div className="grid-item" key={item.productId} 
                          onMouseOver={() => GridHover(item, "over")}
                          onMouseOut={() => GridHover(item, "out")}
                        >
                          <img src={item.url} alt="" height="250px" className='img-unactive' />
                          <div className='product-title-text'>{item.title}</div>
                          <div className='brand-text'>Marka: {item.brand}</div>
                          <div className='brand-text'>Renk: {item.color}</div>
                          <div className='price-text'>{item.price} TL</div>
                          <div className='discount-text'>{item.discount}
                            <div className='percent-text'>{item.percent}</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
              )
            ) : (
              <>
                {filtered.map((item) => {
                  return (
                    <>
                    {item.productId === hoverStatus ? (
                      <div className="grid-item-focus" key={item.productId} 
                        onMouseOver={() => GridHover(item, "over")}
                        onMouseOut={() => GridHover(item, "out")}
                      >
                        <img src={item.url} alt="" height="250px" />
                        <div className='product-title-text'>{item.title}</div>
                        <button className='add-button' onClick={() => AddProduct(item, "click")}>Sepete Ekle</button>
                      </div>
                    ) : (
                      <div className="grid-item" key={item.productId} 
                        onMouseOver={() => GridHover(item, "over")}
                        onMouseOut={() => GridHover(item, "out")}
                      >
                        <img src={item.url} alt="" height="250px" className='img-unactive' />
                        <div className='product-title-text'>{item.title}</div>
                        <div className='brand-text'>Marka: {item.brand}</div>
                        <div className='brand-text'>Renk: {item.color}</div>
                        <div className='price-text'>{item.price} TL</div>
                        <div className='discount-text'>{item.discount}
                          <div className='percent-text'>{item.percent}</div>
                        </div>
                      </div>
                    )}
                  </>
                  );
                })}
              </>
            )}
          </div>
          </div>
       ) : (
       <>
       <div className='list-part'>
       <div className="loader"></div>
       </div>
       </>
       )}
      </div>
    </>
  );
}

export default List;
