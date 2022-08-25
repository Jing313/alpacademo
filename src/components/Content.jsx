import React, { useEffect, useState } from "react";
import Nft from "./Nft/Nft";
import NftModule from "./Nft/NftModule";
import styles from "../styles/modules/Gallery/Gallery.module.scss";
import TwoDViewer from './2D-Modal';
import { motion } from 'framer-motion';

export default function Content({
  filter,
  realFilter,
  removeFilter,
  sidebar,
  setSidebar,
  dataLoaded,
  setDataLoaded,
  removeAllFilter,
}) {
  const moduleController = React.useMemo(() => new NftModule());
  const [list, setList] = useState(moduleController.getList());
  const [searchfilter, setSearchFilter] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
 
  const handleSearch = () => {
    const getSearchText = document.getElementById("txtSearch");

    if (filter.length >= 1){
      removeAllFilter();
    }

    setList(moduleController.getList());
    let searchID = parseInt(getSearchText.value.toLowerCase());
    let searchPacas = [];
    setSearchFilter(getSearchText.value.toLowerCase());

    if (getSearchText.value === "") {
      setList(moduleController.getList());
    } else {
      searchPacas = moduleController.searchById(searchID);
      setList(searchPacas);
    }
  };

  useEffect(() => {
    if (realFilter.length > 0) {
      setList(moduleController.filter(realFilter));
    } else {
      setList(moduleController.getList());
      const getSearchText = document.getElementById("txtSearch");
      if (getSearchText.value.length >=1){
        handleSearch(getSearchText);
      }
    }
  }, [realFilter]);

  useEffect(() => {
    setDataLoaded(false);
  }, [list]);

  const scrollFunc = () => {
    const contentSection = document.getElementById("content");
    if (
      window.pageYOffset + window.innerHeight >=
      contentSection.offsetHeight - 200
      // && !dataLoaded
    ) {
      const getSearchText = document.getElementById("txtSearch");
      if (getSearchText.value === "" || getSearchText.value === null || getSearchText.value === undefined){
        setDataLoaded(true);
        const newList = moduleController.getNext(realFilter);
        setList((currentList) => [...currentList, ...newList]);
      }
    }
  };

  useEffect(() => {
    window.onscroll = scrollFunc;
  }, [realFilter]);

  return (
    <motion.div className="content" id="content">
      <div className="content__title">Gallery</div>

      <div className="content__header">
        <h2>Alpacadabraz ({moduleController.getLength()})</h2>
        <div className="content__header-row"></div>
        <div className="inner">
          <div className="title">
            <div className={styles.oneonetrait}>
              <div
                className="title"
                style={{
                  gridGap: "16px",
                }}
              >
                <input
                  id="txtSearch"
                  type="text"
                  className={styles.search}
                  placeholder="Filter by token id"
                  value={searchfilter}
                  onChange={() => handleSearch()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="filterBtn"
        onClick={() => {
          setSidebar(!sidebar);
        }}
      >
        Filter <img src="images/chevron-down.svg" alt="" />
      </div>
      <div className="content__filter">
        <h4>filters</h4>
        {filter.map((el, index) => (
          <span key={index}>
            {el}
            <img
              src="images/close.svg"
              alt=""
              onClick={() => removeFilter(index)}
            />
          </span>
        ))}
      </div>
      {dataLoaded ? "Loading" : ""}
      <Nft itemsList={list} setSelectedImg={setSelectedImg} />
      { selectedImg && <TwoDViewer pacasList={list} selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    </motion.div>
  );
}
