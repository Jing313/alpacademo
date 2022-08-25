import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/modules/Gallery/Gallery.module.scss";
import filters from "./filters.json";

const TwoDViewer = ({ pacasList, selectedImg, setSelectedImg }) => {
  const handleModal = (e) => {
    const getContent = document.getElementById("backdrop");
    if (getContent.id === e.target.id) {
      setSelectedImg(null);
    }
  };

  const handleClose = (e) => {
    const getContent = document.getElementById("backdropClose");
    if (getContent.id === e.target.id) {
      setSelectedImg(null);
    }
  };

  const getCurPacaID = () => {
    let pacaId = parseInt(
      selectedImg.substring(
        selectedImg.indexOf("nft/") + 4,
        selectedImg.indexOf(".")
      )
    );
    return pacaId;
  };

  const getArrayIndex = () => {
    let getIndex;
    const compareId= getCurPacaID();
    for (let i = 0; i < pacasList.length; i++)
    {
      if (pacasList[i].id === compareId){
        getIndex = i;
        break;
      }
    }
    return getIndex;
  };

  const getPacaTitle = (pacaId) => {
    const index = getArrayIndex();
    const curPacaID = ""+getCurPacaID();
    let pacaTitle = "";

    if (pacaId < 1000) {
      if (pacasList.length < index) {
        index = pacasList.length - 1;
      }

      if (curPacaID.length === 1) {
        pacaTitle =
          pacasList[index].name.substring(0, pacasList[index].name.indexOf("#") + 1) +
          " 000" +
          pacaId;
      } else if (curPacaID.length === 2) {
        pacaTitle =
          pacasList[index].name.substring(0, pacasList[index].name.indexOf("#") + 1) +
          " 00" +
          pacaId;
      } else if (curPacaID.length === 3) {
        pacaTitle =
          pacasList[index].name.substring(0, pacasList[index].name.indexOf("#") + 1) +
          " 0" +
          pacaId;
      }
    } else{
      //pacaTitle = pacasList[pacasList.findIndex((element) => {return element.id === pacaId})].name; 
      pacaTitle = pacasList[index].name; 
    }
    return pacaTitle;
  };
 
  const getAttribute = (filterData, lookFor) => {
    let index = 1;
    //let appendHtmlTag = "";

    // check for animated traits=0
    const animatedTrait0 = filterData[index];
    if (animatedTrait0.includes(filters.animatedTraits.name.toLowerCase())) {
      let counter = 0;
      counter = parseInt(
        animatedTrait0.substring(filters.animatedTraits.name.length)
      );
      if (counter === 0 && lookFor !== 0) {
        lookFor++;
      }
    }

    if (lookFor < filterData.length) {
      const att = filterData[lookFor];
      // Special
      if (filters.special.data.includes(att)) {
        if (att.length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.special.name.toUpperCase()}</span>
              <p>{att.toUpperCase()}</p>
              <br />
            </div>
          );
        } else {
            return (
              <div className={styles.attItem}>
                <span>{filters.special.name.toUpperCase()}</span>
                <p>{att.toUpperCase()}</p>
              </div>
            );
        }
      }
      // Unique
      if (att.includes(filters.unique.name.toLowerCase())) {
        return (
          <div className={styles.attItem}>
            <span>{filters.unique.name.toUpperCase()}</span>
            <p>{filters.unique.data[0].toUpperCase()} (1/1)</p>
          </div>
        );
      }
      // Body
      if (att.includes(filters.body.filterPrefix.toLowerCase())) {
        if (!att.includes(filters.bodyColor.filterPrefix)) {
          const checkBackground = filterData.find(obj => obj.includes("background"));
          if (checkBackground.substring(filters.background.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
                <span>{filters.body.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.body.filterPrefix.length).toUpperCase()}
                </p><br />
              </div>
            );
          }
          else 
          if (att.substring(filters.body.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
                <span>{filters.body.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.body.filterPrefix.length).toUpperCase() }
                </p><br />
              </div>
            );
          } else {
            return (
              <div className={styles.attItem}>
                <span>{filters.body.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.body.filterPrefix.length).toUpperCase()}
                </p>
              </div>
            );
          }
        }
      }
      // Animated
      if (att.includes(filters.animated.name.toLowerCase())) {
        if (att === filters.animated.name.toLowerCase()) {
          return (
            <div className={styles.attItem}>
              <span>{filters.animated.name.toUpperCase()}</span>
              <p>{filters.animated.data[0].toUpperCase()}</p>
            </div>
          );
        }
      }
      // Background
      if (att.includes(filters.background.filterPrefix.toLowerCase())) {
        const checkBodyColor = filterData.find(obj => obj.includes("body color"));
          if (checkBodyColor.substring(filters.bodyColor.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
            <span>{filters.background.filterPrefix.toUpperCase()}</span>
            <p>
              {att.substring(filters.background.filterPrefix.length).toUpperCase()}
            </p><br />
          </div>
            );
          }
          else 
      if (att.substring(filters.background.filterPrefix.length).length >= 15){
        return (
          <div className={styles.attItem}>
            <span>{filters.background.filterPrefix.toUpperCase()}</span>
            <p>
              {att.substring(filters.background.filterPrefix.length).toUpperCase()}
            </p><br />
          </div>
        );
      } else {
        return (
          <div className={styles.attItem}>
            <span>{filters.background.filterPrefix.toUpperCase()}</span>
            <p>
              {att.substring(filters.background.filterPrefix.length).toUpperCase()}
            </p>
          </div>
        );
      }
        
      }
      // Body Color
      if (att.includes(filters.body.filterPrefix.toLowerCase())) {
        if (att.includes(filters.bodyColor.filterPrefix)) {
          const checkBackground = filterData.find(obj => obj.includes("background"));
          if (checkBackground.substring(filters.background.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
                <span >{filters.bodyColor.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.bodyColor.filterPrefix.length).toUpperCase()}
                </p>
              </div>
            );
          }
          else if (att.substring(filters.bodyColor.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
                <span>{filters.bodyColor.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.bodyColor.filterPrefix.length).toUpperCase()}
                </p><br />
              </div>
            );
          } else {
            return (
              <div className={styles.attItem}>
                <span>{filters.bodyColor.filterPrefix.toUpperCase()}</span>
                <p>
                  {att.substring(filters.bodyColor.filterPrefix.length).toUpperCase()}
                </p>
              </div>
            );
          }
        }
      }
      // Clothes
      if (att.includes(filters.clothes.filterPrefix.toLowerCase())) {
        const checkHair = filterData.find(obj => obj.includes("hair"));
        if(checkHair !== undefined){
          if (checkHair.substring(filters.hair.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
              <span>{filters.clothes.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.clothes.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
            );
          }
        }
        if (att.substring(filters.clothes.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.clothes.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.clothes.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else {
          return (
            <div className={styles.attItem}>
              <span>{filters.clothes.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.clothes.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Ass Effect
      if (att.includes(filters.ass.filterPrefix.toLowerCase())) {
        const checkHair = filterData.find(obj => obj.includes("hair"));
        if(checkHair !== undefined){
          if (checkHair.substring(filters.hair.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
              <span>{filters.ass.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.ass.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
            );
          }
        }
        if (att.substring(filters.ass.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.ass.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.ass.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else {
          return (
            <div className={styles.attItem}>
              <span>{filters.ass.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.ass.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Hair
      if (att.includes(filters.hair.filterPrefix.toLowerCase())) {
        const checkSaddle = filterData.find(obj => obj.includes("saddle"));
        if(checkSaddle !== undefined){
          if (checkSaddle.substring(filters.saddle.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
              <span>{filters.hair.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.hair.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
            );
          }
        }
        if (att.substring(filters.hair.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.hair.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.hair.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else {
          return (
            <div className={styles.attItem}>
              <span>{filters.hair.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.hair.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Saddle
      if (att.includes(filters.saddle.filterPrefix.toLowerCase())) {
        const checkHair = filterData.find(obj => obj.includes("hair"));
          if (checkHair.substring(filters.hair.filterPrefix.length).length >= 15){
            return (
              <div className={styles.attItem}>
              <span>{filters.saddle.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.saddle.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
            );
          }
        if (att.substring(filters.saddle.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.saddle.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.saddle.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else{
          return (
            <div className={styles.attItem}>
              <span>{filters.saddle.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.saddle.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Chain
      if (att.includes(filters.chain.filterPrefix.toLowerCase())) {
        if (att.substring(filters.chain.filterPrefix.length).length >= 15) {
          return (
            <div className={styles.attItem}>
              <span>{filters.chain.filterPrefix.toUpperCase()}</span>
              <p >
                {att.substring(filters.chain.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else {
          return (
            <div className={styles.attItem}>
              <span>{filters.chain.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.chain.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Mouth
      if (att.includes(filters.mouth.filterPrefix.toLowerCase())) {
        if (att.substring(filters.mouth.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.mouth.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.mouth.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else{
          return (
            <div className={styles.attItem}>
              <span>{filters.mouth.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.mouth.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Eyes
      if (att.includes(filters.eyes.filterPrefix.toLowerCase())) {
        if (att.substring(filters.eyes.filterPrefix.length).length >= 15){
          return (
            <div className={styles.attItem}>
              <span>{filters.eyes.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.eyes.filterPrefix.length).toUpperCase()}
              </p><br />
            </div>
          );
        } else{
          return (
            <div className={styles.attItem}>
              <span>{filters.eyes.filterPrefix.toUpperCase()}</span>
              <p>
                {att.substring(filters.eyes.filterPrefix.length).toUpperCase()}
              </p>
            </div>
          );
        }
      }
      // Animated Traits
      if (att.includes(filters.animatedTraits.name.toLowerCase())) {
        const traintCount = parseInt(
          att.substring(filters.animatedTraits.name.length)
        );
        if (traintCount >= 1) {
          return (
            <div className={styles.attItem}>
              <span>{filters.animatedTraits.name.toUpperCase()}</span>
              <p>{traintCount}</p>
            </div>
          );
        }
      }
    }

    //   for (index = 0; index < filterData.length; index++) {
    //     const att = filterData[index];
    //     if (att.includes(filters.body.filterPrefix))
    //     {
    //       // appendHtmlTag += "<div className={index<8 ? styles.descLeft : styles.descRight}>" +
    //       // "<h5>{filters.body.filterPrefix.toUpperCase()}</h5><h6>{att.substring(filters.body.filterPrefix.length).toUpperCase()}</h6></div>";
    //       return (
    //         <div className={index<8 ? styles.descLeft : styles.descRight}>
    //           <h5>{filters.body.filterPrefix.toUpperCase()}</h5>
    //           <h6>{att.substring(filters.body.filterPrefix.length).toUpperCase()}</h6>
    //         </div>
    //       )
    //     }
    //     if (att.includes(filters.animatedTraits.name.toLowerCase()))
    //     {
    //       const traintCount = parseInt(att.substring(filters.animatedTraits.name.length));
    //       if (traintCount >= 1)
    //       {
    //         // appendHtmlTag += "<div className={index< 8 ? styles.descLeft : styles.descRight}>" +
    //         //   "<h5>{filters.animatedTraits.name.toUpperCase()}</h5><h6>{traintCount}</h6></div>";
    //         return (
    //           <div className={index< 8 ? styles.descLeft : styles.descRight}>
    //             <h5>{filters.animatedTraits.name.toUpperCase()}</h5>
    //             <h6>{traintCount}</h6>
    //           </div>
    //         )
    //       }

    //     }

    //     return (appendHtmlTag)
    // }
  };

  const [slideIndex, setSlideIndex] = useState(1);
  const moveDot = index => {
    setSlideIndex(index)
}

const countlength = pacasList[getArrayIndex()].filter.length;

  return (
    // <motion.div id="backdrop" className={styles.backdrop} onClick={handleClick}
    <motion.div
      id="backdrop"
      className={styles.backdrop}
      onClick={(event) => handleModal(event)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <motion.div id="backdropContent" className={styles.backdrop__content} onClick={handleClick} */}
      <motion.div
        id="backdropContent"
        className={styles.backdrop_content}
        onClick={(event) => handleModal(event)}
        initial={{ y: "-10vh" }}
        animate={{ y: 0 }}
      >
        <div id="backdropImg" className={styles.backdropImg}>
          <img src={selectedImg} />
        </div>
        
        <div className={styles.title_span}>
          <span>{getPacaTitle(getCurPacaID())}</span>
        </div>

        <div className={styles.bdClose}>
          <img
            id="backdropClose"
            width="48px"
            src="/images/close.svg"
            alt="close"
            onClick={(event) => handleClose(event)}
          />
        </div>
        <div className={styles.ContentContainer}>
        
          <div className={styles.attContent}>
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 0)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 1)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 2)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 3)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 4)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 5)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 6)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 7)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 8)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 9)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 10)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 11)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 12)}
                {getAttribute(pacasList.find((element) => {return element.id === getCurPacaID()}).filter, 13)}
              
            </div>
          
                    
        </div>

        <div className={styles.ImgContentFooter}>
          <a
            className="btn primary"
            href={`/images/nft/${getCurPacaID()}.png`}
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>
          <div className={styles.socials}>
            <a
              href={`https://opensea.io/assets/0x3db5463a9e2d04334192c6f2dd4b72def4751a61/${getCurPacaID()}`}
              target="_blank"
              rel="noreferrer"
            >
              <img alt="OpenSea" src="/assets/icons/opensea24.svg" />
            </a>
          </div>
          <div className={styles.socials1}>
            <a
              href={`https://looksrare.org/collections/0x3DB5463A9e2d04334192C6f2DD4B72DeF4751A61/${getCurPacaID()}`}
              target="_blank"
              rel="noreferrer"
            >
              <img alt="LooksRare" src="/assets/icons/looksrare24.svg" />
            </a>
          </div>
        </div>
        
      </motion.div>
    </motion.div>
  );
};

export default TwoDViewer;
