// import { axios } from 'axios';

class helperService {
    
    formatDateTime(datetime) {

        var formattedDateTime = "0000-00-00 00:00"
        if (datetime !== undefined) {
            const date = datetime.substr(0, 10);
            const time = datetime.substr(11, 5);
        
            formattedDateTime = date + " " + time;
        }
        return formattedDateTime;
    }
}

export default helperService;