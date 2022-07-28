const Address = ({country, province, city, ward, tole, house_no}) => {
    return { 
        country,
        province, 
        city, ward,
        tole, 
        house_no 
    };
}


const Updatable_address = ({country, province, city, ward, tole, house_no}) => {
    return {
        country,
        province, 
        city, ward,
        tole, 
        house_no 
    }
}


module.exports = {Address, Updatable_address}