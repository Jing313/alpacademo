import React from 'react';
import NftItem from './NftItem';
import { motion } from 'framer-motion';

export default function Nft({ itemsList, setSelectedImg}) {
     return (
          <motion.div className="content__grid">
               {itemsList.map((NftItems) => {
                    return (
                         <NftItem
                              key={NftItems.id}
                              image={NftItems.image}
                              name={NftItems.name}
                              number={NftItems.number}
                              filter={NftItems.filter}
                              setSelectedImg={setSelectedImg}
                         />
                    );
               })}
          </motion.div>
     );
}
