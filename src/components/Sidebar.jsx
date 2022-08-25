import React, { useEffect, useState } from 'react';
import AccItem from './AccItem';
import filters from './filters.json';
export default function Sidebar(props) {
     const {
          filter,
          updateFilter,
          findAndDeleteFilter,
          //sidebar states
          sidebar,
          setSidebar,
          setDataLoaded,
     } = props;
     const changeFilterState = (e, filterData, filterPrefix) => {
          setDataLoaded(true);
          if (e.target.checked) {
               updateFilter(filterData, filterPrefix);
          } else {
               findAndDeleteFilter(filterData);
          }
     };
     const checkFilter = (filterData) => {
          let index = filter.indexOf(filterData);
          return index >= 0;
     };

     return (
          <div className={'sidebar ' + (sidebar ? 'active' : '')} id="sidebar">
               <div className="sidebar__inner">
                    <h1>Gallery</h1>
                    <h3>Filter</h3>
                    <div className="sidebar__body">
                         {Object.keys(filters).map((iKey, index) => {
                              if (filters[iKey].active) {
                                   return (
                                        <AccItem name={filters[iKey].name ?? iKey} key={`${index}`}>
                                             {filters[iKey].data.map((item, subindex) => (
                                                  <div
                                                       className="checkbox"
                                                       key={`${index}-${subindex}`}
                                                  >
                                                       <input
                                                            type="checkbox"
                                                            checked={checkFilter(
                                                                 filters[iKey].prefix
                                                                      ? filters[iKey].prefix + item
                                                                      : item
                                                            )}
                                                            onChange={(e) =>
                                                                 changeFilterState(
                                                                      e,
                                                                      filters[iKey].prefix
                                                                           ? filters[iKey].prefix +
                                                                                  item
                                                                           : item,
                                                                      filters[iKey].filterPrefix ??
                                                                           ''
                                                                 )
                                                            }
                                                       />
                                                       <label htmlFor="">{item}</label>
                                                  </div>
                                             ))}
                                        </AccItem>
                                   );
                              } else {
                                   return '';
                              }
                         })}
                         {/* <AccItem name={'Package'}>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('premium')}
                                        onChange={(e) => changeFilterState(e, 'premium')}
                                   />
                                   <label htmlFor="">Premium</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('standard')}
                                        onChange={(e) => changeFilterState(e, 'standard')}
                                   />
                                   <label htmlFor="">Standard</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('basic')}
                                        onChange={(e) => changeFilterState(e, 'basic')}
                                   />
                                   <label htmlFor="">Basic</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('animated')}
                                        onChange={(e) => changeFilterState(e, 'animated')}
                                   />
                                   <label htmlFor="">Yes</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('No:animated')}
                                        onChange={(e) => changeFilterState(e, 'No:animated')}
                                   />
                                   <label htmlFor="">No</label>
                              </div>
                         </AccItem>
                         <AccItem name={'Unique'}>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('TERMINUSPACA')}
                                        onChange={(e) => changeFilterState(e, 'TERMINUSPACA')}
                                   />
                                   <label htmlFor="">TERMINUSPACA</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('FISKYPACA')}
                                        onChange={(e) => changeFilterState(e, 'FISKYPACA')}
                                   />
                                   <label htmlFor="">FISKYPACA</label>
                              </div>
                              <div className="checkbox">
                                   <input
                                        type="checkbox"
                                        checked={checkFilter('GEOSGAEN0PACA')}
                                        onChange={(e) => changeFilterState(e, 'GEOSGAEN0PACA')}
                                   />
                                   <label htmlFor="">GEOSGAEN0PACA</label>
                              </div>
                         </AccItem>
                         <AccItem name={'Package 3'}>
                              <div className="checkbox">
                                   <input type="checkbox" />
                                   <label htmlFor="">Filter element</label>
                              </div>
                              <div className="checkbox">
                                   <input type="checkbox" />
                                   <label htmlFor="">Filter element</label>
                              </div>
                              <div className="checkbox">
                                   <input type="checkbox" />
                                   <label htmlFor="">Filter element</label>
                              </div>
                         </AccItem> */}
                    </div>
               </div>
          </div>
     );
}
