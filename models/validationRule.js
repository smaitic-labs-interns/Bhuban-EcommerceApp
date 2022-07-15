// validation rules
const data_validation = {
    firstName : {
        type: 'string',
        minLength: 5,
        maxLength: 30,
        required: true,
        regex: /[a-zA-Z]/g,
    },
    middleName : {
        type: 'string',
        maxLength: 30,
        required: false,
        regex: /[a-zA-Z]/g,
    },lastName : {
        type: 'string',
        maxLength: 30,
        required: true,
        regex: /[a-zA-Z]/g,
    },
    address : {
        type : 'string',
        maxLength : '100',
        required : true
    },
    email:{
        minLength: 10,
        maxLength: 50,
        required: true,
        regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    },
    password:{
        minLength: 6,
        maxLength: 20,
        required: true
    }
}