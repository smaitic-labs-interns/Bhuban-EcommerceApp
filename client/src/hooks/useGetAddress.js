import { useMemo, useState } from 'react';
import axiosInstance from 'Modules/api';
import { address as addressEp } from 'api/endpoint';

// const handleChangeAddress = (type, value, oldAddress) => {
//   if (value === '') return;
//   switch (type) {
//     case 'country':
//       const country = oldAddress.country.all.filter((country) => country.name === value);
//       setAddress((address) => ({
//         ...address,
//         country: { ...address.country, selected: country[0] },
//       }));
//       break;
//     case 'state':
//       const state = oldAddress.state.all.filter((state) => state.name === value);
//       setAddress((address) => ({
//         ...address,
//         state: { ...address.state, selected: state[0] },
//       }));
//       break;
//     case 'district':
//       const district = oldAddress.district.all.filter((district) => district.name === value);
//       setAddress((address) => ({
//         ...address,
//         district: { ...address.district, selected: district[0] },
//       }));
//     case 'city':
//       break;
//     default:
//       break;
//   }
//   return oldAddress;
// };

const useGetAddress = ({ oldResponse = {}, selected = '', value = '' }) => {
  const [address, setAddress] = useState({
    country: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
    state: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
    district: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
  });

  const [datas, setData] = useState({ data: {}, error: null, loading: false });
  // let ep = '';
  let query = {};
  //   var oldResponselength = Object.keys(oldResponse).length;
  //   if (oldResponselength && selected && value) {
  //     const oldAddress = handleChangeAddress(selected, value, oldResponse);
  //     setAddress(oldAddress);
  //     switch (selected) {
  //       case 'country':
  //         ep = addressEp.countryStates;
  //         query = { id: address.country.selected.id };
  //         break;
  //       case 'state':
  //         ep = addressEp.stateDistricts;
  //         query = { id: address.state.selected.id };
  //         break;
  //       case 'district':
  //         break;
  //       case 'city':
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  useMemo(() => {
    axiosInstance({
      endpoints: addressEp.countries,
      query: query,
    })
      .then((response) => {
        // let datas = [];
        // for (let d of response.data) {
        //   datas.push({ id: d.id, name: d.name });
        // }
        // switch (selected) {
        //   case 'country':
        //     setAddress((address) => ({
        //       ...address,
        //       state: { ...address.state, all: datas },
        //     }));
        //     break;
        //   case 'state':
        //     setAddress((address) => ({
        //       ...address,
        //       state: { ...address.district, all: datas },
        //     }));
        //     break;
        //   case 'district':
        //     break;
        //   case 'city':
        //     break;
        //   default:
        //     console.log('running default case');
        //     // setD(response.data);
        setAddress((address) => ({
          ...address,
          country: { ...address.country, all: response.data },
        }));

        //     console.log(d);
        //     break;
        // }
        // console.log(address);
        setData((pre) => ({
          ...pre,
          data: address,
          loading: false,
        }));
      })
      .catch((err) => {
        setData((pre) => ({
          ...pre,
          error: err,
          loading: true,
        }));
      });
  }, [address, query]);
  return datas;
};

export default useGetAddress;
