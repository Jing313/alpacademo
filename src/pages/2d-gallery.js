import React, { useState } from 'react';

import TwoDGallery from '../components/Gallery';

export default function TWOD() {
    const [menu, setMenu] = useState(false);

    return (
         <>
              <TwoDGallery menu={menu} setMenu={setMenu} />
         </>
    );
}
