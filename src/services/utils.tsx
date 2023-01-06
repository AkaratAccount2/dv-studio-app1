
export function datetimeConvertToDB(dateTimeString){
    //const dateTimeString = '2023-01-05T04:44:04.333Z';

    const date = new Date(dateTimeString); // that convert to date with locale timezone
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    //console.log(formattedDateTimeString); // Output: "2023-01-05 04:44:04"
    return formattedDateTimeString
}


const columns = [
    {
        title: 'Registration Date',
        dataIndex: 'register_date',
        key: 'register_date',
        render: (_) => datetimeConvertToDB(_)
    },
    {
        title: 'Code Number',
        dataIndex: 'usercode',
        key: 'usercode',
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'Nick Name',
        dataIndex: 'nick_name',
        key: 'nick_name',
    },
    {
        title: 'Education Name',
        dataIndex: 'education_name',
        key: 'education_name',
    },
    {
        title: 'Education Name',
        dataIndex: 'education_grade',
        key: 'education_grade',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Facebook',
        dataIndex: 'facebook',
        key: 'facebook',
    },
    {
        title: 'Birth Date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        render: (_) => datetimeConvertToDB(_)
    },
    {
        title: 'Student Type',
        dataIndex: 'person_type',
        key: 'person_type',
    },
    {
        title: 'Telphone',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: 'Parent',
        dataIndex: 'parent_name',
        key: 'parent_name',
    },
];