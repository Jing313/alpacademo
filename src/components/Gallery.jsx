import React, { useEffect, useState } from 'react';
import Content from './Content';
import Sidebar from './Sidebar';


export default function TwoDGallery({ menu, setMenu }) {
     const [filter, setFilter] = useState([]);
     const [realFilter, setRealFilter] = useState([]);
     const [dataLoaded, setDataLoaded] = useState(false);

     const updateFilter = (addFilter, filterPrefix) => {
          setFilter([...filter, addFilter]);
          setRealFilter([...realFilter, filterPrefix + addFilter]);
     };
     const findAndDeleteFilter = (data) => {
          let index = filter.indexOf(data);
          if (index >= 0) removeFilter(index);
     };
     const removeFilter = (index) => {
          const newFilter = [...filter];
          newFilter.splice(index, 1);

          setFilter(newFilter);

          const newRealFilter = [...realFilter];
          newRealFilter.splice(index, 1);

          setRealFilter(newRealFilter);
     };
     const removeAllFilter = () => {
          const newFilter = [];
          //newFilter.splice(index, 1);

          setFilter(newFilter);

          const newRealFilter = [];
          //newRealFilter.splice(index, 1);

          setRealFilter(newRealFilter);
     };
     useEffect(() => {
          window.scrollTo({
               top: 100,
               behavior: 'smooth',
          });
     }, [realFilter]);

     useEffect(() => {
          if (menu && sidebar) {
               setSidebar(false);
          }
     }, [menu]);

     /// sidebar states
     const [sidebar, setSidebar] = useState(false);
     useEffect(() => {
          if (sidebar) {
               document.body.addEventListener('click', sideClose);
               document.body.classList.add('active');
          }
     }, [sidebar]);

     const sideClose = React.useCallback((e) => {
          const target = e.target;
          if (target === document.querySelector('.sidebar')) {
               document.body.classList.remove('active');
               document.body.removeEventListener('click', sideClose);
               setSidebar(false);
          }
     }, []);

     return (
          <div className="wrapper">
               <Sidebar
                    filter={filter}
                    updateFilter={updateFilter}
                    findAndDeleteFilter={findAndDeleteFilter}
                    sidebar={sidebar}
                    setDataLoaded={setDataLoaded}
               />
               <Content
                    filter={filter}
                    realFilter={realFilter}
                    removeFilter={removeFilter}
                    sidebar={sidebar}
                    setSidebar={setSidebar}
                    dataLoaded={dataLoaded}
                    setDataLoaded={setDataLoaded}
                    removeAllFilter={removeAllFilter}
               />
          </div>
     );
}
