import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function NftItem(props) {
     function loadInitial(){
          return true;
     };
     const [loaded, setLoaded] = useState(() => loadInitial());
     const image = useRef(null);
     useEffect(() => {
          image.current.onload = () => setLoaded(true);
     }, [image]);
     const hidden = {
          display: 'none',
     };

     return (
          <motion.div className="content__grid-item"
               layout
               whileHover={{opacity: 1}}
          >
               <div className={`content__grid-item-image ${!loaded ? 'loading' : 'ready'}`}
                    onClick={() => props.setSelectedImg(props.image)}
               >
                    <img src={'images/loading.jpg'} style={!loaded ? {} : hidden} />
                    <img ref={image} src={props.image} style={loaded ? {} : hidden} />
               </div>
               <h4>
                    {props.name.substring(0,props.name.indexOf(' '))} 
                    <span>{props.name.substring(props.name.indexOf(' ') + 1)}</span>
               </h4>
          </motion.div>
     );
     
}
