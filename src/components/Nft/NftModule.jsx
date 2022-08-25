import moduleData from './data.json';

export default class NftModule {
     constructor() {
          this.limit = 20;
          this.lastPoint = 0;
          this.lastFilter = null;
          this.moduleData = moduleData.MetaData;
          this.list = null;
     }
     getList = () => {
          if (this.list === null) {
               this.list = this.getLimit(this.moduleData);
          }

          return this.list;
     };
     setList = newList => {
          this.list = newList;
          return this.list;
     };

     getLimit = (array, from = 0, limit = this.limit) => {
          this.lastPoint = from + limit - 1;
          return array.slice(from, limit);
     }; 
     filter = (filter, from = 0, limit = this.limit) => {
          let newList = [];
          let index = 0;

          for (index = 0; index < this.moduleData.length; index++) {
               const element = this.moduleData[index];
               if (this.checkForFilter(element, filter)) newList.push(element);

               if (newList.length >= limit) break;
          }
          this.lastPoint = index;
          return this.setList(newList);
     };

     getNext = (filter) => {
          let index = this.lastPoint;
          let list = [];
          if (filter && filter.length > 0) {
               for (index = this.lastPoint + 1; index < this.moduleData.length; index++) {
                    const element = this.moduleData[index];
                    if (this.checkForFilter(element, filter)) list.push(element);

                    if (list.length >= this.limit) break;
               }
          } else {
               for (index = this.lastPoint + 1; index < this.moduleData.length; index++) {
                    const element = this.moduleData[index];
                    list.push(element);
                    if (list.length >= this.limit) break;
               }
          }

          this.lastPoint = index;
          return list;
     };

     checkForFilter = (element, filter) => {
          let isValid = false;
          let testLength;
          for (let index = 0; index < filter.length; index++) {
               const filterItem = filter[index];
               if (element.filter !== undefined && element.filter !== null) {
                    if (filterItem === 'anim:yes' && element.filter.indexOf('animated') >= 0) {
                         isValid = true;
                         break;
                    } else if (filterItem === 'anim:no' && element.filter.indexOf('animated') < 0) {
                         isValid = true;
                         break;
                    } else if (filterItem === 'uniq:yes' && element.filter.indexOf('unique') >= 0) {
                         isValid = true;
                         break;
                    } else if (filterItem === 'uniq:no' && element.filter.indexOf('unique') < 0) {
                         isValid = true;
                         break;
                    } else if (element.filter.indexOf(filterItem) >= 0) {
                         isValid = true;
                         break;
                    }
               }
               // if (testLength >= 100) {
               //      testLength++;
               //      break;
               // }
          }
          return isValid;
     };

     removeStartText = (startText, text) => {
          return text.slice(startText.length);
     };
     getLength = () => {
          return this.moduleData.length;
     };
     
     searchById = (ID, from = 0, limit = this.limit) => {
          let index = 0;
          let newList = [];
          for (index = 0; index < this.moduleData.length; index++) {
               const element = this.moduleData[index];
               if (element.id === ID) newList.push(element);

               if (newList.length >= limit) break;
          }
          this.lastPoint = ID-1;
          return this.setList(newList);
     };
}

// let tempFilters = {
//   bodyColor: [],
//   body: [],
//   fields: [],
//   clothes: [],
//   hair: [],
//   eyes: [],
//   chain: [],
//   mouth: [],
//   saddle: [],
//   ass: [],
//   animatedTraits: [],
//   background: [],
// };
// let tempFiltersBin = [];
//           this.moduleData.forEach((element) => {
//                if (element.filter) {
//                     element.filter.forEach((item) => {
//                          if (tempFiltersBin.indexOf(item) === -1) {
//                               if (item.startsWith('body color')) {
//                                    tempFilters.bodyColor.push(
//                                         this.removeStartText('body color', item)
//                                    );
//                               } else if (item.startsWith('body')) {
//                                    tempFilters.body.push(this.removeStartText('body', item));
//                               } else if (item.startsWith('fields')) {
//                                    tempFilters.fields.push(this.removeStartText('fields', item));
//                               } else if (item.startsWith('background')) {
//                                    tempFilters.background.push(
//                                         this.removeStartText('background', item)
//                                    );
//                               } else if (item.startsWith('clothes')) {
//                                    tempFilters.clothes.push(this.removeStartText('clothes', item));
//                               } else if (item.startsWith('hair')) {
//                                    tempFilters.hair.push(this.removeStartText('hair', item));
//                               } else if (item.startsWith('eyes')) {
//                                    tempFilters.eyes.push(this.removeStartText('eyes', item));
//                               } else if (item.startsWith('chain')) {
//                                    tempFilters.chain.push(this.removeStartText('chain', item));
//                               } else if (item.startsWith('mouth')) {
//                                    tempFilters.mouth.push(this.removeStartText('mouth', item));
//                               } else if (item.startsWith('saddle')) {
//                                    tempFilters.saddle.push(this.removeStartText('saddle', item));
//                               } else if (item.startsWith('ass')) {
//                                    tempFilters.ass.push(this.removeStartText('ass', item));
//                               } else if (item.startsWith('animated traits')) {
//                                    tempFilters.animatedTraits.push(
//                                         this.removeStartText('animated traits', item)
//                                    );
//                               } else tempFilters.fields.push(item);

//                               tempFiltersBin.push(item);
//                          }
//                     });
//                }
//           });

//           console.info('tempFilters', tempFilters);
