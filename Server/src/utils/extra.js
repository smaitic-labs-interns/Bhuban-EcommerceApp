// Read CSV FILEs
const fs = require("fs");
const { parse } = require("csv-parse");
const { read_data, write_data } = require("./fileUtils");

const { Client } = require("pg");
require("dotenv").config();

const PGHOST = "localhost";
const PGUSER = "postgres";
const PGDATABASE = "eCommerceApp";
const PGPASSWORD = "toor";
const PGPORT = 5432;

const client = new Client({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});
client.connect((err) => {
  if (err) throw err;
});

// const con = require("../config/postGres");
const con = client;
// fs.createReadStream("./worldcities.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", function (row) {
//     console.log(row);
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   })
//   .on("end", function () {
//     console.log("finished");
//   });

// const add_data = async (actualData) => {
//   //add user
//   try {
//     let idx = 0;
//     for (let dta of actualData) {
//       const result = await con.query(
//         "INSERT INTO world_countries (country, capital, cc_iso2, cc_iso3, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6)",
//         [
//           dta.country,
//           dta.capital,
//           dta.cc_iso2,
//           dta.cc_iso3,
//           dta.latitude,
//           dta.longitude,
//         ]
//       );
//       idx++;
//       if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
//     }
//     console.log("All Done !")
//   } catch (err) {
//     throw err;
//   }
// };

// const data = [];
// const country = [];
// const capital = [];
// const wholeList = [];
// const doneCoun = [];

// const actualData = [];

// fs.createReadStream("./worldcities.csv")
//   .pipe(
//     parse({
//       delimiter: ",",
//       columns: true,
//       ltrim: true,
//     })
//   )
//   .on("data", function (row) {
//     // console.log(row);
//     data.push(row);
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   })
//   .on("end", function () {
//     data.forEach((item) => {
//       if (!country.includes(item.country)) {
//         country.push(item.country);
//       }
//       let list = {
//         country: item.country,
//         capital: item.city_ascii,
//         cc_iso2: item.iso2,
//         cc_iso3: item.iso3,
//         latitude: item.lat,
//         longitude: item.lng,
//       };
//       wholeList.push(list);
//     });

//     let con = country.sort();

//     for (c of con) {
//       for (lis of wholeList) {
//         if (!doneCoun.includes(c) && c == lis.country) {
//           actualData.push(lis);
//           doneCoun.push(c);
//         }
//       }
//     }
//     add_data(actualData);

//     // write_data("world_countries.json", actualData);
//   });

// // ***** FOR Province  ******

const provinces = [
  "Province No 1",
  "Madhesh Pradesh",
  "Bagmati Pradesh",
  "Gandaki Pradesh",
  "Lumbini Pradesh",
  "Karnali Pradesh",
  "Sudur Pashchim Pradesh",
];

const provinces_ne = [
  "प्रदेश नम्बर १",
  "मधेस प्रदेश",
  "बागमती प्रदेश",
  "गण्डकी प्रदेश",
  "लुम्बिनी प्रदेश",
  "कर्णाली प्रदेश",
  "सुदूरपश्चिम प्रदेश",
];

// const finalp = [];
// const wfile = async () => {
//   const p1 = await read_data("./provience_1.json");
//   const p2 = await read_data("./province_2.json");
//   const p3 = await read_data("./province_3.json");
//   const p4 = await read_data("./province_4.json");
//   const p5 = await read_data("./province_5.json");
//   const p6 = await read_data("./province_6.json");
//   const p7 = await read_data("./province_7.json");
//   const pmain = await read_data("./province_8.json");
//   const p = [p1, p2, p3, p4, p5, p6, p7];
//   var i = 1;
//   var ind = 0;
//   for (let pde of pmain) {
//     finalp.push({
//       id: i,
//       province_en: provinces[ind],
//       province_native_lan: provinces_ne[ind],
//       capital_en: pde.capital_en,
//       capital_native_lan: pde.capital_native_lan,
//       area: pde.area,
//       no_of_districts: pde.no_of_districts,
//       districts: p[ind],
//     });
//     ind++;
//     i++;
//   }
//   console.log(finalp);
//   write_data("final_province.json", finalp);
//   console.log("done");
// };

// wfile();

// const countrylevel = [];
// const crfile = async () => {
//   const det = {
//     country: "Nepal",
//     capital: "Kathmandu",
//     cc_iso2: "NP",
//     cc_iso3: "NPL",
//   };
//   const p1 = await read_data("./final_province.json");
//   const p2 = await read_data("./actualData.json");

//   let id = 1;
//   for (let pdte of p2) {
//     countrylevel.push({
//       id: id,
//       ...pdte,
//       state: pdte.country === "Nepal" ? p1 : [],
//     });
//     id++;
//   }

//   console.log(countrylevel);
//   write_data("final_world_data.json", countrylevel);
//   console.log("done");
// };

// crfile();

// const proviences

// index = 0;
// for(let pr of  provinces){
//     console.log(pr)
// }

// const add_province = async (actualData) => {
//   //add user
//   try {
//     let idx = 0;
//     for (let dta of actualData) {
//       const result = await con.query(
//         "INSERT INTO world_states (stateName, countryId) VALUES ($1, $2)",
//         [dta, 145]
//       );
//       idx++;
//       if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
//     }
//     console.log("All Done !");
//   } catch (err) {
//     throw err;
//   }
// };

// add_province(provinces);

// [proviences:{[district:[{
//     id: 1,
//     district_en: 'Bhojpur',
//     district_native_lan: 'भोजपुर',
//     headquater_en: 'Bhojpur',
//     headquater_native_lan: 'भोजपुर'
//   },
//   ...]
//   name_en:province_1,
//   name_ne:emitKeypressEvents,]
// }]

// ***** FOR Districts  ******

const province_1 = [
  {
    province_id: 1,
    name: "Bhojpur",
    headquater: "Bhojpur",
    area: 1507,
  },
  {
    province_id: 1,
    name: "Dhankuta",
    headquater: "Dhankuta",
    area: 892,
  },
  {
    province_id: 1,
    name: "Ilam",
    headquater: "Ilam",
    area: 1703,
  },
  {
    province_id: 1,
    name: "Jhapa",
    headquater: "Bhadrapur",
    area: 1606,
  },
  {
    province_id: 1,
    name: "Khotang",
    headquater: "Diktel",
    area: 1591,
  },
  {
    province_id: 1,
    name: "Morang",
    headquater: "Biratnagar",
    area: 1855,
  },
  {
    province_id: 1,
    name: "Okhaldhunga",
    headquater: "Siddhicharan",
    area: 1074,
  },
  {
    province_id: 1,
    name: "Panchthar",
    headquater: "Phidim",
    area: 1241,
  },
  {
    province_id: 1,
    name: "Sankhuwasabha",
    headquater: "Khandbari",
    area: 3480,
  },
  {
    province_id: 1,
    name: "Solukhumbu",
    headquater: "Salleri",
    area: 3312,
  },
  {
    province_id: 1,
    name: "Sunsari",
    headquater: "Inaruwa",
    area: 1257,
  },
  {
    province_id: 1,
    name: "Taplejung",
    headquater: "Taplejung",
    area: 3646,
  },
  {
    province_id: 1,
    name: "Terhathum",
    headquater: "Myanglung",
    area: 679,
  },
  {
    province_id: 1,
    name: "Udayapur",
    headquater: "Gaighat",
    area: 2063,
  },
];

const p1 = [];

const fileName = "./p1_dist.json";

const dName = [];

const nep1d = [
  "भोजपुर",
  "धनकुटा",
  "इलाम",
  "झापा",
  "खोटाङ",
  "मोरङ",
  "ओखलढुंगा",
  "पाँचथर",
  "संखुवासभा",
  "सोलुखुम्बु",
  "सुनसरी",
  "ताप्लेजुङ",
  "तेह्रथुम",
  "उदयपुर",
];

const nep1h = [
  "भोजपुर",
  "धनकुटा",
  "इलाम",
  "भद्रपुर",
  "डिक्टेल",
  "विराटनगर",
  "सिद्धिचरण",
  "फिदिम",
  "खाँदबारी",
  "सल्लेरी",
  "इनरुवा",
  "ताप्लेजुङ",
  "म्याङलुङ",
  "गाईघाट",
];

const p1actual = [];

const p2_dis = [
  {
    province_name: "Province No. 1",
    capital: "Biratnagar",
    no_of_districts: 14,
    area: 25905,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Nepal_Province_No_1_adm_location_map.svg/290px-Nepal_Province_No_1_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 2",
    capital: "Janakpur",
    no_of_districts: 8,
    area: 9661,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nepal_Province_No._2_adm_location_map.svg/290px-Nepal_Province_No._2_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 3",
    capital: "Kathmandu",
    no_of_districts: 13,
    area: 20300,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Nepal_Bagmati_adm_location_map.svg/290px-Nepal_Bagmati_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 4",
    capital: "Pokhara",
    no_of_districts: 11,
    area: 21504,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Nepal_Gandaki_adm_location_map.svg/290px-Nepal_Gandaki_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 5",
    capital: "Butwal",
    no_of_districts: 12,
    area: 22288,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Nepal_Lumbini_adm_location_map.svg/290px-Nepal_Lumbini_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 6",
    capital: "Godawari",
    no_of_districts: 10,
    area: 27984,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nepal_Karnali_adm_location_map.svg/290px-Nepal_Karnali_adm_location_map.svg.png",
  },
  {
    province_name: "Province No. 7",
    capital: "Hetauda",
    no_of_districts: 9,
    area: 19915,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Nepal_Sudurpashchim_Pradesh_adm_location_map.svg/290px-Nepal_Sudurpashchim_Pradesh_adm_location_map.svg.png",
  },
];
const p2_d_nep = [
  "विराटनगर",
  "जनकपुर",
  "हेटौंडा",
  "पोखरा",
  "बुटवल",
  "गोदावरी",
  "काठमाडौं",
];

const p2_h_nep = [
  "धनगढी",
  "मंगलसेन",
  "दिपायल सिलगढी",
  "जयपृथ्वी",
  "मार्तडी",
  "भीमदत्त",
  "अमरगढी",
  "दशरथचन्द",
  "दार्चुला",
];

// for (let p2 of p2_dis) {
//   console.log(p2.capital);
// }

// console.log("=================Break ++++++");

// for (let p2 of p2_dis) {
//   console.log(p2.headquater);
// }
// console.log("----END-----");

// ----------------FOR WRITING FILE-------------

// const province_2 = [];

// let index = 0;
// let id = 1;

// for (let p2 of p2_dis) {
//   province_2.push({
//     id: id,
//     capital_en: p2.capital,
//     capital_native_lan: p2_d_nep[index],
//     area: p2.area,
//     no_of_district: p2.no_of_districts,
//   });
//   id++;
//   index++;
// }

// write_data("province_8.json", province_2);
// console.log(province_2);
// console.log("DONE");

// read_data(fileName).then((data) => {
//   const district = data.data.districts;
//   let index = 0;
//   let id = 1;
//   for (po1c of province_1) {
//     p1actual.push({
//       id: id,
//       district_en: po1c.name,
//       district_native_lan: nep1d[index],
//       headquater_en: po1c.headquater,
//       headquater_native_lan: nep1h[index],
//     });
//     id++;
//     index++;
//   }
//   write_data("provience_1.json", p1actual);
//   console.log("DOne");
// });

// const add_province = async (actualData) => {
//   //add user
//   try {
//     let idx = 0;
//     for (let dta of actualData) {
//       const result = await con.query(
//         "INSERT INTO world_districts (district, stateId) VALUES ($1, $2)",
//         [dta, 145]
//       );
//       idx++;
//       if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
//     }
//     console.log("All Done !");
//   } catch (err) {
//     throw err;
//   }
// };

// add_province(p1actual);

// Adding districts to databases:
// const countrylevel = [];
// const crfile = async () => {
//   const p1 = await read_data("./final_province.json");
//   // const p2 = await read_data("./actualData.json");
//   let idx = 0;
//   for (let pdte of p1) {
//     for (let dis of pdte.districts) {
//       const result = await con.query(
//         "INSERT INTO world_districts (district, stateId) VALUES ($1, $2)",
//         [dis.district_en, pdte.id]
//       );
//       idx++;
//       if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
//     }
//   }
//   console.log("All Done !");
// };

// crfile();
